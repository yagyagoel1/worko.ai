import { getUserByEmail, getUsers } from "../Database/user.database";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { validateLoginUser, validateRegisterUser, validategetAllUsers, validategetUser } from "../validations/user.validation";

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

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const validate = validateLoginUser({ email, password });
    if (validate.error) {
      return res.status(400).json(new ApiError(400, validate.error.details[0].message));
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json(new ApiError(404, "user not found"));
    } 
    if (!(await user.isPasswordCorrect(password))) {
      return res.status(401).json(new ApiError(401, "invalid password"));
    }
    const token = await user.generateAuthToken();

    res.status(200).cookie("token",token,{
        httpOnly:true,
        sameSite:"none",
        secure:process.env.NODE_ENV === "production",
    }).json(new ApiResponse(200, "login successful"));
});

const getAllUsers = asyncHandler(async (req, res) => {

    const {page}=  req.query;
    const validate= validategetAllUsers({page});
    if(validate.error){
        return res.status(400).json(new ApiError(400,validate.error.details[0].message));
    }

    const users = await getUsers(page);
    res.status(200).json(new ApiResponse(200,"users fetched successfully",users));
  });
const getUser =  asyncHandler(async (req,res)=>{
    const {id} = req.params;    
    const validate = validategetUser({id});
    if(validate.error){
        return res.status(400).json(new ApiError(400,validate.error.details[0].message));
    }
    const user = await findUserById(id);
    if(!user){
        return res.status(404).json(new ApiError(404,"user not found"));
    }


    res.status(200).json(new ApiResponse(200,"user fetched successfully",{id:user._id ,email:user.email,name:user.name,age:user.age,city:user.city,zipCode:user.zipCode}));
})


export {registerUser,loginUser,getAllUsers,getUser}