import AppError from "../utils/appError.js";

const doctorAuthorize = (req,res,next) => {
  const cur_user_role = req.user.role;
  const cur_request_url =req.originalUrl;

  if (cur_user_role === 'admin') {
    return next();
  }
  console.log(cur_user_role);
  if (cur_request_url.includes('doctor')) {
    if (cur_user_role !== 'doctor') {
      return next(new AppError('You are not allowed to process', 403));
    }
  } 
  else {
    return next(new AppError('You are not allowed to process', 403));
  }
  next();
}

export default doctorAuthorize;