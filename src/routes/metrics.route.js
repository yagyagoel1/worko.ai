import express from "express"
import getMetrics from "../controllers/metrics.controller.js";



const router = express.Router();

router.route("/").get(getMetrics);


export default router