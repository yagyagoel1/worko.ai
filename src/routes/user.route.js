import express from 'express'
import { getAllUsers, getUser, loginUser, registerUser, updateUser } from '../controllers/user.controller';
import verifyUser from '../middlewares/auth.middleware';
import { createUser } from '../Database/user.database';





const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(verifyUser, getAllUsers).post(createUser);
router.route("/:userId")
    .get(verifyUser, getUser)
    .put(verifyUser, updateUser)
    .patch(verifyUser, updateUserFields)
    .delete(verifyUser, deleteUser);
export default router;