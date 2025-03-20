import mongoose from 'mongoose';
import User from './userModel.js';
const MedRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'Please provide the user'],
    ref: 'User'
  },
  medicalHistory: {
    allergies: {type: String, default: 'None'},
    chronicDiseases: {type: String, default: 'None'},
    familyMedicalHistory: {type: String, default: 'None'},
    pastSurgeries: {type: String, default: 'None'},
    currentMedications: {type: String, default: 'None'}
  }, 
  diagnose: {
    type: String,
    default: 'None'
  },
  treatment: {
    type: String,
    default: 'None'
  },
  prescription: {
    type: [String],
    default: []
  },
  last_visit: {
    type: Date,
    default: undefined
  }
},{timestamps:true});

const MedicalRecord = mongoose.model('MedicalRecord', MedRecordSchema);
export default MedicalRecord;