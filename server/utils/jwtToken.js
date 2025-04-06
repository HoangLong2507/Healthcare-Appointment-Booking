import jwt from 'jsonwebtoken';
import redisClient from './redis.js';

const signToken = async (user,statusCode,res) => {
  const token= jwt.sign({id:user.ID},process.env.JWT_SECRET,{
    expiresIn: Number(process.env.JWT_EXPIRES)*3600*1000
  });
  user.password=undefined;
  try {
    await redisClient.setEx(user.ID, token);
    
    res.status(statusCode).json({
      status:"success",
      user,
      token
    });
  } catch (err) {
    console.log(err);
  }
}

export default signToken;