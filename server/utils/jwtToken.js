import jwt from 'jsonwebtoken';
const signToken = async (user,statusCode,res) => {
  const token= jwt.sign({id:user.ID, role: user.role},process.env.JWT_SECRET,{
    expiresIn: Number(process.env.JWT_EXPIRES)*3600
  });
  user.password=undefined;
  try {  
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