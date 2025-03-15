import jwt from 'jsonwebtoken';
import {Redis} from './redis.js';
const redisInstance = new Redis();
const signToken = async (user,statusCode,res) => {
  const token= jwt.sign({id:user.ID},process.env.JWT_SECRET,{
    expiresIn: Number(process.env.JWT_EXPIRES)*3600*1000
  });
  user.password=undefined;
  try {
    await redisInstance.connect();
    await redisInstance.set(user.ID, token);
    await redisInstance.quit();
    console.log("Token saved to Redis");
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