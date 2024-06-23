import { changeUserPasswordById, createUser, deleteUserById, findUserById, getUserByEmail, getUsers, updateUserById } from "../Database/user.database.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateLoginUser, validateRegisterUser, validateUpdatePassword, validateUpdateUser, validateUpdateUserFields, validategetAllUsers, validategetUser } from "../validations/user.validation.js";

const registerUser = asyncHandler(async (req, res) => {
    const { email, name, age, password, city, zipCode } = req.body;
    const validate = validateRegisterUser({ email, name, age, password, city, zipCode });
    if (validate.error) {
        return res.status(400).json(new ApiError(400, validate.error.details[0].message));
    }
    const user = await getUserByEmail(email);
    if (user) {
        return res.status(400).json(new ApiError(400, "user already exists"));
    }
    const newUser = await createUser({ email, name, age, password, city, zipCode });
    res.status(201).json(new ApiResponse(201, "user created successfully", { email: newUser.email, name: newUser.name, age: newUser.age, city: newUser.city, zipCode: newUser.zipCode }));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const validate = validateLoginUser({ email, password });
    if (validate.error) {
        return res.status(400).json(new ApiError(400, validate.error.details[0].message));
    }
    const user = await getUserByEmail(email);
    if (user.isDeleted) {
        return res.status(404).json(new ApiError(404, "user not found"));
    }
    if (!user) {
        return res.status(404).json(new ApiError(404, "user not found"));
    }
    if (!(await user.isPasswordCorrect(password))) {
        return res.status(401).json(new ApiError(401, "invalid password"));
    }
    const token = await user.generateAuthToken();

    res.status(200).cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
    }).json(new ApiResponse(200, "login successful", { id: user._id, email: user.email, name: user.name, age: user.age, city: user.city, zipCode: user.zipCode }));
});

const getAllUsers = asyncHandler(async (req, res) => {

    let { page } = req.query;
    if (!page) {
        page = 1;
    }
    const validate = validategetAllUsers({ page });
    if (validate.error) {
        return res.status(400).json(new ApiError(400, validate.error.details[0].message));
    }

    const users = await getUsers(page);
    res.status(200).json(new ApiResponse(200, "users fetched successfully", users));
});
const getUser = asyncHandler(async (req, res) => {
    const id = req.params.userId;
    const validate = validategetUser({ id });
    if (validate.error) {
        return res.status(400).json(new ApiError(400, validate.error.details[0].message));
    }
    const user = await findUserById(id);
    if (!user) {
        return res.status(404).json(new ApiError(404, "user not found"));
    }


    res.status(200).json(new ApiResponse(200, "user fetched successfully", { id: user._id, email: user.email, name: user.name, age: user.age, city: user.city, zipCode: user.zipCode }));
})
const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.userId;
    if (id !== req.user.id) {
        return res.status(401).json(new ApiError(401, "you are not authorized to access the user"));
    }
    const { name, age, city, zipCode } = req.body;
    const validate = validateUpdateUser({ id, name, age, city, zipCode });
    if (validate.error) {
        return res.status(400).json(new ApiError(400, validate.error.details[0].message));
    }
    const user = await findUserById(id);
    if (!user) {
        return res.status(404).json(new ApiError(404, "user not found"));
    }
    const updatedUser = await updateUserById(id, { name, age, city, zipCode });

    res.status(200).json(new ApiResponse(200, "user updated successfully", updatedUser));
});
const updateUserFields = asyncHandler(async (req, res) => {
    const id = req.params.userId;
    if (id !== req.user.id) {
        return res.status(401).json(new ApiError(401, "unauthorized"));
    }
    const data = req.body;
    const validate = validateUpdateUserFields({ id, ...data })
    if (validate.error) {
        return res.status(400).json(new ApiError(400, validate.error.details[0].message));
    }
    const user = await findUserById(id);
    if (!user) {
        return res.status(404).json(new ApiError(404, "user not found"));
    }
    const updatedUser = await updateUserById(id, data);
    res.status(200).json(new ApiResponse(200, "user updated successfully", updatedUser));
});
const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.userId;
    if (id !== req.user.id) {
        return res.status(401).json(new ApiError(401, "unauthorized"));
    }
    const validate = validategetUser({ id });
    if (validate.error) {
        return res.status(400).json(new ApiError(400, validate.error.details[0].message));
    }
    const userExists = await findUserById(id);
    if (!userExists) {
        return res.status(404).json(new ApiError(404, "user not found"));
    }
    const user = await deleteUserById(id);

    res.status(200).json(new ApiResponse(200, "user deleted successfully"));
});
const updateUserPassword = asyncHandler(async (req, res) => {

    const { newPassword } = req.body;
    const validate = validateUpdatePassword({ newPassword });
    if (validate.error) {
        return res.status(400).json(new ApiError(400, validate.error.details[0].message));
    }
    const user = await findUserById(req.user.id);
    if (!user) {
        return res.status(404).json(new ApiError(404, "user not found"));
    }
    const passwordChanged = await changeUserPasswordById(req.user.id, newPassword);
    res.status(200).json(new ApiResponse(200, "password updated successfully"));
});
const logoutUser = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const user = await updateUserById(id, { token: "" });
    res.clearCookie("token").json(new ApiResponse(200, "logout successful"));
});

export { registerUser, loginUser, getAllUsers, getUser, updateUser, updateUserFields, deleteUser, updateUserPassword, logoutUser }