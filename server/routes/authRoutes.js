import express from "express";
import {AuthController} from "../controller/authController.js";

const router = express.Router();

router.post('/login', AuthController.prototype.login);
router.post('/signup', AuthController.prototype.signup);
router.post('/logout',AuthController.prototype.loggout);
export default router; 