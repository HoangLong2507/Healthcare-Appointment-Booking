import mongoose from 'mongoose';
import User from './userModel.js';

const doctorSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: [true, 'Please provide your ID'],
    unique:true
  },
  Lname: {
    type: String
  }, 
  Fname: {
    type: String,
    required: [true, 'Please provide your first name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true
  },
  dateofbirth: {
    type: Date,
  },
  phone_number: {
    type: String,
  },
  department: {
    type: String,
    required: [true, 'Please provide your department']
  },
  role: {
    type: String,
    enum: ['user','doctor', 'admin'],
    default: 'doctor'
  },
  status: {
    type: String, 
    enum: ['active', 'inactive'],
    default: 'active'
  },
  assessment: {
    type: [{
      rating: { 
        type: Number,
        min: 1,
        max: 5
      },
      comment: {type: String, trim: true},
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default: null
      }
    }]
  }
},{
  timestamps:true
});


const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;