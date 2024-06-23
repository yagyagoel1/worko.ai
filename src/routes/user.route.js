import express from 'express'
import { deleteUser, getAllUsers, getUser, loginUser, registerUser, updateUser, updateUserFields } from '../controllers/user.controller';
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
router
export default router;