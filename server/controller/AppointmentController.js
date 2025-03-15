import Appointment from "../model/appointmentModel.js";
import {Redis} from '../utils/redis.js';
import AppError from '../utils/appError.js';
const redisInstance = new Redis();

export class AppointmentController {
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
      const {id} = req.params;
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

  async getAllAppointments(req,res,next) {
    try {
      const appointments = await Appointment.find();
      res.status(200).json({
        status: 'success',
        data: appointments
      });
    } catch (err) {
      return next(new AppError("Error when fetching data", 500));
    }
  }

  async deleteAppointment(req,res,next) {
    const {id} = req.params;
    try {
      const appointment = await Appointment.findByIdAndDelete(id);
      if (!appointment) {
        return next(new AppError('No appointment found with that ID', 404));
      }
      res.status(201).json({
        status: 'success',
        message: 'Appointment deleted successfully'
      });
    } catch (err) {
      return next(new AppError('Something went wrong during appointment deletion', 500));
    }
  }

}