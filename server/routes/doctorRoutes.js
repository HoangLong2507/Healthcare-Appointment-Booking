import express from 'express';
import { DoctorController } from '../controller/DoctorController.js';
import {AuthController} from "../controller/AuthController.js";

const router = express.Router();
router.get('/',AuthController.prototype.isLoggedIn,DoctorController.prototype.getAllDoctor_in_Department);
router.get('/appointment/:id',AuthController.prototype.isLoggedIn,DoctorController.prototype.getDoctorAppointments);
router.patch('/:id',AuthController.prototype.isLoggedIn,DoctorController.prototype.updateAppointmentStatus);
router.patch('/cancelappointment/:id',AuthController.prototype.isLoggedIn,DoctorController.prototype.cancelAppointment);

export default router;
