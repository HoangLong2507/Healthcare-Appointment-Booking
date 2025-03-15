import express from "express";
import userRoutes from "./userRoutes.js";
import appointmentRoutes from "./appointmentRoutes.js";

const router = express.Router();

router.use('/authentication', userRoutes);
router.use('/appointment', appointmentRoutes);

export default router;