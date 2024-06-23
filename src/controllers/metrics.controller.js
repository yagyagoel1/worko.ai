import asyncHandler from "../utils/asyncHandler.js";
import { prometheus } from "../utils/prometheus.js";



const getMetrics = asyncHandler(async (req, res) => {
    res.set('Content-Type', prometheus.register.contentType);
    res.status(200).send(await prometheus.register.metrics());
})

export default getMetrics