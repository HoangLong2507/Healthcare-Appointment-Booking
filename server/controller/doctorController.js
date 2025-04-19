import Appointment from '../model/appointmentModel.js';
import AppError from '../utils/appError.js';
import Doctor from '../model/doctorModel.js';
import Timetable from '../model/timetableModel.js';
import e from 'express';

export class DoctorController {
  async getAllDoctor_in_Department (req,res,next) {
    const {department} = req.params;
    try {
      const doctors = await Doctor.find({department});
      if (doctors.length == 0) {
        return next(new AppError("Cannot find doctor in this department",404));
      }
      res.status(200).json({
        status: 'success',
        data: doctors
      });
    } catch (err) {
      next(new AppError(err.message, 404));
    }
  }

  async getDoctorTimetable (req,res,next) {
    const {id} = req.params;
    try {
      const timetable = await Timetable.findOne({Doctor: id});
      if (!timetable) {
        return next(new AppError('No timetable found for this doctor', 404));
      }
      res.status(200).json({
        status: 'success',
        data: timetable
      });
    } catch (err) {
      next(new AppError(err.message, 404));
    }
  }

  async getDoctorAppointments(req, res, next) {
    const { id } = req.params;
    const { status, date } = req.query;
  
    try {
      let filter = { doctor: id };
  
      if (status) {
        filter.status = status;
      } else if (date) {
        filter.date = date;
      } 
      
      const appointments = await Appointment.find(filter);
  
      res.status(200).json({
        status: 'success',
        data: appointments,
      });
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  }

  async findDoctor (req,res,next) {
    const {queryString} = req.query;
    const userid = req.user._id;
    if (!queryString || typeof queryString !== 'string') {
      return next(new AppError('Query string is required and must be a string', 400));
    }
    const redisClient = req.app.locals.redisClient;
    const searchKey = `doctor:search:${userid}:${queryString.toLowerCase()}`;
    try {
      const cachedData = await redisClient.get(searchKey);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        
        const regex = new RegExp(queryString,'i');
        const filteredDoctors = parsedData.filter(doctor =>
          regex.test(doctor.Lname)|| regex.test(doctor.Fname) || regex.test(doctor.department)
        );
        if (filteredDoctors.length > 0) {
          return res.status(200).json({
            status:'success',
            data: filteredDoctors
          });
        }
      }
      const doctors = await Doctor.find({
        $or:[
          {Lname: {$regex: queryString,  $options: 'i'}},
          {Fname: {$regex: queryString, $options: 'i'}},
          {department: {$regex: queryString, $options: 'i'}}
        ]
      });
      if (cachedData) {
        const cachedoctors = JSON.parse(cachedData);
        cachedoctors.push(doctors);
        const currentTTL = await redisClient.ttl(key);
        await redisClient.set(searchKey,JSON.stringify(cachedoctors));
        if (currentTTL > 0) {
          await this.client.expire(key, currentTTL);
        }
      } else {
        await redisClient.setEx(searchKey,JSON.stringify(doctors));
      }
      res.status(200).json({
        status:"success",
        data: doctors
      });
    } catch (err) {
      console.error('Error in findDoctor:', err.message);
      return next(new AppError(err.message, 500));
    }
    
  }
  async updateAppointmentStatus  (req, res, next)  {
    const { id } = req.params;
    const { status, canceled_reason } = req.body;
    try {
      const appointment = await Appointment.findByIdAndUpdate(id, { status,canceled_reason
      }, { new: true });    
      if (!appointment) {
        return next(new AppError('No appointment found with that ID', 404));
      }
      res.status(201).json({
        status: 'success',
        data: {
          appointment,
        }
      });
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  }

}

