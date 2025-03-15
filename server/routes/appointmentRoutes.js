import express from "express";
import {AppointmentController} from "../controller/AppointmentController.js";

const router = express.Router();

router.post('/', AppointmentController.prototype.createAppointment);
router.get('/:id', AppointmentController.prototype.getAppointmentCache);
router.get('/', AppointmentController.prototype.getAllAppointments);
router.delete('/:id', AppointmentController.prototype.deleteAppointment);

export default router;