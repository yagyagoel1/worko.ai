import express from 'express'
import { getAllUsers, loginUser, registerUser } from '../controllers/user.controller';
import verifyUser from '../middlewares/auth.middleware';





const router =express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(verifyUser,getAllUsers).post(createUser);