import mongoose from "mongoose";
import User from "./userModel.js";
import Doctor from "./doctorModel.js";
const ratingSchema = new mongoose.Schema( {
  rating: { 
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please provide your rating']
  },
  comment: {type: String, trim: true},
  user:{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    default: null,
    required: [true, 'Please provide the user']
  },
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Doctor',
    required: [true, 'Please provide the doctor']
  }
},{timestamps:true});
const Rating = mongoose.model('Rating', ratingSchema);  
export default Rating;