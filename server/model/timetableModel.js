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
      date: {type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: [true, 'Please provide the date']},
      startTime: {type: String, required: [true, 'Please provide the start time']},
      endTime: {type: String, required: [true, 'Please provide the end time']}
    }],
    required: [true, 'Please provide the date']
  }
},{timestamps:true});

const Timetable = mongoose.model('Timetable', timetableSchema);
export default Timetable;