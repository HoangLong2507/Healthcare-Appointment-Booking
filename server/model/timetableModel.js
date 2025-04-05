import mongoose from 'mongoose';
import Doctor from './doctorModel.js';
const timetableSchema = new mongoose.Schema({
  Doctor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Doctor',
    required: [true, 'Please provide the doctor']
  },
  timetable: {
    type: [{
      day: {type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: [true, 'Please provide the date']},
      time: {
        type: [{
          type: Number,
          // 0 - None, 1 - Morning shift, 2 - Afternoon shift
          enum: [0,1,2],
        }],
        required: [true, 'Please provide the time']
    }
    }],
    required: [true, 'Please provide the date']
  }
},{timestamps:true});

const Timetable = mongoose.model('Timetable', timetableSchema);
export default Timetable;