import { getUserByEmail } from "../Database/user.database";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { validateRegisterUser } from "../validations/user.validation";

const registerUser = asyncHandler(async (req, res) => {
const {email,name,age,password,city,zipCode} = req.body;
const validate = validateRegisterUser({email,name,age,password,city,zipCode});
if(validate.error){
    return res.status(400).json(new ApiError(400,validate.error.details[0].message));
}
const user = await  getUserByEmail(email);
if(user){
    return res.status(400).json(new ApiError(400,"user already exists"));
}
const newUser = await createUser({email,name,age,password,city,zipCode});
res.status(201).json(new ApiResponse(201,"user created successfully",{email:newUser.email,name:newUser.name,age:newUser.age,city:newUser.city,zipCode:newUser.zipCode}));
});


export {registerUser}