import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import doctorRoutes from "./doctorRoutes.js";

const router = express.Router();

router.use('/authentication', authRoutes);
router.use('/user', userRoutes);
router.use('/doctor', doctorRoutes);

export default router;