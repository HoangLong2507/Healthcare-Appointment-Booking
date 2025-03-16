import Appointment from "../model/appointmentModel.js";
import {Redis} from '../utils/redis.js';
import AppError from '../utils/appError.js';
import User from '../model/userModel.js';
const redisInstance = new Redis();

export class UserController {
  async createAppointment(req,res,next) {
    const {date,time,Doctor,User} = req.body;
    try {
      if (!date || !time || !Doctor || !User) {
        return next(new AppError('Please provide all the required fields', 400));
      }
      const appointment = await Appointment.create({date,time,Doctor,User});
      await redisInstance.connect();
      const appointment_key = `appointment:${User}`;
      const appointment_value = JSON.stringify(appointment);
      await redisInstance.set(appointment_key, appointment_value);
      await redisInstance.quit();
      res.status(201).json({
        status: 'success',
        data: appointment
      });
    } catch (err) {
      return next(new AppError('Something went wrong during appointment creation', 500));
    }
  }

  async getAppointmentCache(req,res,next) {
    try {
      const id = req.user._id;
      if (!id) {
        return next(new AppError('User ID is required', 400));
      }
      await redisInstance.connect();
      const appointment_key = `appointment:${id}`;
      const appointment = await redisInstance.get(appointment_key);
      await redisInstance.quit();
      if (!appointment) {
        return next(new AppError('No appointment found', 404));
      }
      res.status(200).json({
        status: 'success',
        data: JSON.parse(appointment)
      });
    } catch (err) {
      return next(new AppError(err.message, 500));
    }
  }

  async getUpcomingAppointment(req,res,next) {
    const userid = req.user._id;
    const {status} = req.body;
    try {
      const appointments = await Appointment.find({User: userid, status});
      if (!appointments) {
        return next(new AppError('No appointment found', 404));
      }
      res.status(200).json({
        status: 'success',
        data: appointments
      });
    } catch (err) {
      return next(new AppError('Error when fetching data', 500));
    }
  }

  async cancelAppointment(req,res,next) {
    const {id} = req.params;
    try {
      const appointment = await Appointment.findByIdAndUpdate(id, {status: 'canceled', canceled_reason: "User cancel", canceledAt: Date.now()}, {new: true});
      if (!appointment) {
        return next(new AppError('No appointment found with that ID', 404));
      }
      res.status(201).json({
        status: 'success',
        message: 'Appointment canceled successfully'
      });
    } catch (err) { 
      return next(new AppError('Something went wrong during appointment cancelation', 500));
    } 
  }

  

  async getHistoryAppointment(req,res,next) {
    const userid = req.user._id;
    try {
      const appointments = await Appointment.find({User: userid});
      if (!appointments) {
        return next(new AppError('No appointment found', 404));
      }
      res.status(200).json({
        status: 'success',
        data: appointments
      });
    } catch (err) {
      return next(new AppError('Error when fetching data', 500));
    }
  }

  async deleteOneAppointment(req,res,next) {
    const {id} = req.params;
    try {
      await Appointment.findByIdAndDelete(id);
      res.status(201).json({
        status: 'success',
        message: 'Appointment deleted successfully'
      });
    } catch (err) {
      return next(new AppError("Can not find this appointment", 500));
    }
  }

  async deleteAllAppointment(req,res,next) {
    const {id} = req.params;
    try {
      await Appointment.deleteMany({User: id});
      res.status(201).json({
        status: 'success',
        message: 'Appointment deleted successfully'
      });
    } catch (err) {
      return next(new AppError("Something went wrong during deletion", 500));
    }
  }

  async updateInformation(req, res, next) {
    const userid = req.user._id;
  
    try {
      const updateData = Object.keys(req.body).reduce((acc, key) => {
        if (req.body[key] !== undefined) {
          acc[key] = req.body[key];
        }
        return acc;
      }, {});
  
      const user = await User.findByIdAndUpdate(userid, updateData, { new: true });
  
      if (!user) {
        return next(new AppError('No user found with that ID', 404));
      }
  
      res.status(201).json({
        status: 'success',
        data: user
      });
    } catch (err) {
      return next(new AppError(err.message, 500));
    }
  }
}