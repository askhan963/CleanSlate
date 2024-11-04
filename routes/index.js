import express from "express";
import userRoutes from './userRoutes.js'
import imageRoutes from "./imageRoutes.js";
const router = express.Router();

router.use("/user", userRoutes)
router.use("/image", imageRoutes)

export default router;