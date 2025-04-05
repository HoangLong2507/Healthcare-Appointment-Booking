import express from 'express';
import { DoctorController } from '../controller/doctorController.js';
import {AuthController} from "../controller/authController.js";

const router = express.Router();
router.get('/:department',AuthController.prototype.isLoggedIn,DoctorController.prototype.getAllDoctor_in_Department);
router.get('/appointment/:id',AuthController.prototype.isLoggedIn,DoctorController.prototype.getDoctorAppointments);
router.patch('/:id',AuthController.prototype.isLoggedIn,DoctorController.prototype.updateAppointmentStatus);
router.patch('/cancelappointment/:id',AuthController.prototype.isLoggedIn,DoctorController.prototype.cancelAppointment);

export default router;
