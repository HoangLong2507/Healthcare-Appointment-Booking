import express from "express";
import {UserController} from "../controller/UserController.js";
import {AuthController} from "../controller/AuthController.js";

const router = express.Router();

router.post('/', 
  AuthController.prototype.isLoggedIn, UserController.prototype.createAppointment);
router.get('/getappointmentcache',
  AuthController.prototype.isLoggedIn, UserController.prototype.getAppointmentCache);
router.get('/getappointment',
  AuthController.prototype.isLoggedIn, UserController.prototype.getUpcomingAppointment);
router.patch('/cancelappointment/:id',
  AuthController.prototype.isLoggedIn,UserController.prototype.cancelAppointment);
router.get('/appointmenthistory',
  AuthController.prototype.isLoggedIn,UserController.prototype.getHistoryAppointment);
router.delete('/:id',
  AuthController.prototype.isLoggedIn, UserController.prototype.deleteOneAppointment);
router.delete('/',
  AuthController.prototype.isLoggedIn,UserController.prototype.deleteAllAppointment);
router.patch('/updateinformation',
AuthController.prototype.isLoggedIn,UserController.prototype.updateInformation);

export default router;