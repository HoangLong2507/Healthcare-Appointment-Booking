import Appointment from "../model/appointmentModel.js";
import AppError from '../utils/appError.js';
import User from '../model/userModel.js';
import Doctor from "../model/doctorModel.js";
import sendEmail from "../utils/email.js";
import MedicalRecord from "../model/medical-recordModel.js";
import Rating from "../model/ratingModel.js";
export class UserController {
  async createAppointment(req,res,next) {
    const userid = req.user._id;
    const {date,time,doctor,user} = req.body;
    try {
      if (!date || !time || !doctor || !user) {
        return next(new AppError('Please provide all the required fields', 400));
      }
      const targettime = time.split(':')[0];
      const duplicate_appointments = await Appointment.find({
        date,
        time: { $regex: new RegExp(`^${targettime}:`) },
        doctor
      });
      if (duplicate_appointments.length >=3) {
        return next(new AppError(`Please set new appointment.${targettime}:00 - ${targettime}:59 time slot is full.`,400));
      }
      const appointment = await Appointment.create({date,time,doctor,user});
            
      // send confirmation email
      const cur_user = await User.findById(userid);
      await sendEmail.send_confirmation_email(cur_user.email,time,date);

      res.status(201).json({
        status: 'success',
        data: appointment
      });
    } catch (err) {
      return next(new AppError('Something went wrong during appointment creation', 500));
    }
  }
  
  async getUpcomingAppointment(req,res,next) {
    const userid = req.user._id;
    const {status} = req.body;
    try {
      const appointments = await Appointment.find({user: userid, status});
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
      const appointments = await Appointment.find({user: userid});
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
    const userid = req.user._id;
    try {
      await Appointment.deleteMany({user: userid});
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

  async updateMedicalRecod (req,res,next) {
    //todo
  }

  async createRating (req,res,next) {
    const userid = req.user._id; 
    try{
      const {rating, comment} = req.body;
      if (!rating) {
        return next(new AppError('Please provide your rating', 400));
      }
      const new_rating = await Rating.create({rating, comment, user: userid});
      res.status(200).json({
        status: "success",
        message: "Evaluate successfully",
        rating: new_rating
      });
    } catch (err) {
      console.log("Something went wrong:",err);
    }
  }
}