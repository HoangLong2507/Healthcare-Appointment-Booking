import express from "express";
import userRoutes from "./userRoutes.js";

const router = express.Router();

router.use('/authentication', userRoutes);

export default router;