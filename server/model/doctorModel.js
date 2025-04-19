import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
    default: 'doctor'
  },
  password: {
    type:String,
    required: [true,"Password is required"],
    minlength: [8, "Password have at least 8 characters"],
    maxlength: [16],
    select:false
  },
  status: {
    type: String, 
    enum: ['active', 'inactive'],
    default: 'active'
  }
},{
  timestamps:true
});

doctorSchema.pre('save', async function(next) {
  if (this.password.length > 16 || this.password.length < 8) return next() 
  
  this.password = await bcrypt.hash(this.password, 12);

  next();
  
});

doctorSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;