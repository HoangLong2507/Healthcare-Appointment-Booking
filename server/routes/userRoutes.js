import express from "express";
import {AuthController} from "../controller/AuthController.js";

const router = express.Router();

router.post('/login', AuthController.prototype.login);
router.post('/signup', AuthController.prototype.signup);
export default router; 