import mongoose from 'mongoose';
import Doctor from './doctorModel.js';
import User from './userModel.js';
const AppointmentSchmema = new mongoose.Schema({
  date: {
    type: String,
    required: [true, 'Please provide the date']
  },
  time: {
    type: String,
    required: [true, 'Please provide the time']
  },
  Doctor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Doctor',
    required: [true, 'Please provide the doctor']
  },
  User: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the user']
  },
  qrcode: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'canceled'],
    default: 'pending'
  },
  canceled_reason: {
    type: String,
    default: null
  },
  notification: {
    type: Boolean,
    default: false
  },
  canceledAt: {
    type: Date,
    index: { expireAfterSeconds: 2592000 },
    default: null
  }
},{
  timestamps:true
});

const Appointment = mongoose.model('Appointment', AppointmentSchmema);
export default Appointment;