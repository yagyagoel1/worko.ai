import express from 'express'
import { registerUser } from '../controllers/user.controller';





const router =express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(getAllUsers).post(createUser);