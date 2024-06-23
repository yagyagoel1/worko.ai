import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";

const verifyUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json(new ApiError(401, "unauthorized"));
    }
    const user = await jwt.verify(token,process.env.JWT_SECRET);
    if(!user){
        return res.status(401).json(new ApiError(401,"unauthorized"));
    }
    const userExists = await findUserById(user._id);
    if(!userExists){
        return res.status(401).json(new ApiError(401,"unauthorized"));
    }
    req.user = {id:user._id,email:user.email};
    next();
});
export default verifyUser;