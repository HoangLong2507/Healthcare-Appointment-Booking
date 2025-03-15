import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
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
  password: {
    type:String,
    required: [true,"Password is required"],
    minlength: [8, "Password have at least 8 characters"],
    maxlength: [16],
    select:false
  },
  dateofbirth: {
    type: Date,
  },
  phone_number: {
    type: String,
  },
  insuarance: {
    number: {type: String},
    hospital: {type: String},
    hospital_address: {type: String}
  },
  role: {
    type: String,
    enum: ['user','doctor',],
    default: 'user'
  },
  last_login: {
    type: Date,
    default: undefined
  },
  bank_card: {
    type:String,
  },
  bank_name: {
    type:String
  }
},{
  timestamps:true
});

userSchema.pre('save', async function(next) {
  if (this.password.length > 16 || this.password.length < 8) return next() 
  
  this.password = await bcrypt.hash(this.password, 12);

  next();
  
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

export default User;