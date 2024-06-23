import express from "express";
import userRouter from "./user.route.js";
import metricsRouter from "./metrics.route.js";

const router = express.Router();
router.use("/user", userRouter);
router.use("/metrics", metricsRouter)
export default router;