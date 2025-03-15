import mongoose from 'mongoose';

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
  status: {
    type: String, 
    enum: ['active', 'inactive'],
    default: 'active'

  }

},{
  timestamps:true
});


const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;