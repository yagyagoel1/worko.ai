import express from 'express'
import { deleteUser, getAllUsers, getUser, loginUser, logoutUser, registerUser, updateUser, updateUserFields, updateUserPassword } from '../controllers/user.controller.js';
import verifyUser from '../middlewares/auth.middleware.js';





const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(verifyUser, getAllUsers);
router.route("/changepassword").patch(verifyUser, updateUserPassword);
router.route("/logout").post(verifyUser, logoutUser);
router.route("/id/:userId")
    .get(verifyUser, getUser)
    .put(verifyUser, updateUser)
    .patch(verifyUser, updateUserFields)
    .delete(verifyUser, deleteUser);

export default router;