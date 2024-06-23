import { findUserById } from "../Database/user.database.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyUser = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json(new ApiError(401, "unauthorized"));
        }
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        if (!user) {
            return res.status(401).json(new ApiError(401, "unauthorized"));
        }
        const userExists = await findUserById(user._id);
        if (!userExists || userExists.token !== token) {
            return res.status(401).json(new ApiError(401, "unauthorized"));
        }
        req.user = { id: user._id, email: user.email };
        next();
    } catch (error) {
        res.status(500).json(new ApiError(400, "token is invalid"));
    }
});
export default verifyUser;