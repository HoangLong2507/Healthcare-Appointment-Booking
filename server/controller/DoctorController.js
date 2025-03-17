import Appointment from '../model/appointmentModel.js';
import AppError from '../utils/appError.js';
import Doctor from '../model/doctorModel.js';

export class DoctorController {
  async getAllDoctor_in_Department (req,res,next) {
    const {department} = req.body;
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

  async getDoctorAppointments  (req, res, next)  {
    const {id} = req.params;
    const status = req.body.status || 'pending';
    try {
      const appointments = await Appointment.find({ doctor: id, status });
      res.status(200).json({
        status: 'success',
        data: appointments
      });
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  }

  async updateAppointmentStatus  (req, res, next)  {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const appointment = await Appointment.findByIdAndUpdate(id, { status
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

  async cancelAppointment(req,res,next) {
    const {id} = req.params;
    try {
      const appointment = await Appointment.findByIdAndUpdate(id, {status: 'canceled', canceled_reason: "Doctor cancel", canceledAt: Date.now()}, {new: true});
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
}

