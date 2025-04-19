import express from 'express';
import { DoctorController } from '../controller/doctorController.js';
import {AuthController} from "../controller/authController.js";
import doctorauthorize from '../middleware/authorization.js';

const router = express.Router();
router.get('/:department',AuthController.prototype.isLoggedIn,DoctorController.prototype.getAllDoctor_in_Department);
router.get('/appointment/:id',AuthController.prototype.isLoggedIn,doctorauthorize,DoctorController.prototype.getDoctorAppointments);
router.get('/timetable/:id',AuthController.prototype.isLoggedIn,DoctorController.prototype.getDoctorTimetable);
router.get('/searchdoctor/doctor',AuthController.prototype.isLoggedIn,DoctorController.prototype.findDoctor);
router.patch('/:id',AuthController.prototype.isLoggedIn,doctorauthorize, DoctorController.prototype.updateAppointmentStatus);


export default router;
