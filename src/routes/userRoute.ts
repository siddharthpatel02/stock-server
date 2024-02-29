import express from "express";
import { createUser, getUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/").post(createUser);
userRouter.route("/login").post(getUser);

export { userRouter };
