import signToken  from "../utils/jwtToken.js";
import AppError from "../utils/appError.js";
import jwt from 'jsonwebtoken';
import User from "../model/userModel.js";
import Doctor from "../model/doctorModel.js";

export class AuthController {
  async login(req,res,next) {
    const {email,password,role }= req.body;
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }
    try {
      const userPromise = User.findOne({ email,role }).select('+password');
      const doctorPromise = Doctor.findOne({ email,role }).select('+password');

      const [cur_user, cur_doctor] = await Promise.all([userPromise, doctorPromise]);
      const user = cur_user || cur_doctor;
      if (!user || !await user.correctPassword(password, user.password)) {
        return next(new AppError('Incorrect email or password', 400));
      }
      signToken(user, 200, res);
    } catch (err) {
      console.log(err.message)
      return next(new AppError('Something went wrong during login', 500));  
  }
  }
  async signup(req,res,next) {
    const {ID,email,password,Lname,Fname,dateofbirth,phone_number} = req.body;
    try {
      const existingUser = await User.findOne({ 
        $or: [{ ID }, { email }] 
      });
      if (existingUser) {
        return next(new AppError('User already exist', 400));
      }
      await User.create({ ID, email, password, Lname, Fname, dateofbirth, phone_number });
      res.status(200).json({ 
        status: "success", 
        message: "User created successfully" 
      });
    } catch (err) {
      return next(new AppError('Something went wrong during signup', 500)); 
    }
  }
  async loggout(req,res,next) {
    const {userID} = req.body;
    try {
      if (!userID) {
        return next(new AppError('User ID is required', 400));
      }
      const redisClient = req.app.locals.redisClient;
      await redisClient.del(userID); 
      console.log("Token deleted from Redis");
  
      return res.status(200).json({ status: "success" });
    } catch (err) {
      return next(new AppError('Failed to logout', 500));  
    }
  }

  async isLoggedIn(req,res,next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return next(new AppError('You have not log in. Please log in', 400));
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user = undefined;
      console.log(decoded);
      const userfind =  User.findOne({ID:decoded.id,role:decoded.role});
      const doctorfind = Doctor.findOne({ID:decoded.id,role:decoded.role});
      const [USER,DOCTOR] = await Promise.all([userfind,doctorfind]);
      user = USER || DOCTOR;
      if (!user) {
        return next(new AppError('User not found', 404));
      }
      req.user = user;
      next();
    } 
    catch (err) {
      console.log(err.message)
      if (err.name === 'TokenExpiredError') {
        return next(new AppError('Token has expired. Please log in again!', 401));
      }
      return next(new AppError('Invalid token', 401));
    }
  } 
  
}
