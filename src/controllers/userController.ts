import mongoose from "mongoose";
import { Request, Response } from "express";
import { User } from "../models/userModel";
import jwt from "jsonwebtoken";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../utility/errorHandling";

const createUser = async (req: Request, res: Response, next) => {
  try {
    const user = await User.create(req.body);
    res
      .status(201)
      .json({ status: true, data: [], message: "User created Successfully" });
  } catch (err) {
    next(new BadRequestError(err.message));
  }
};

const getUser = async (req: Request, res: Response, next) => {
  try {
    const getUser = await User.find({ userName: req.body.username });
    const user = getUser[0];
    if (!user) {
      throw new NotFoundError("User not found");
      // next(new NotFoundError("User not found"));
    }
    const isPasswordValid = await user.comparePassword(req.body.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("incorrect credentials");
      // next(new UnauthorizedError("incorrect credentials"));
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXP_TIME,
    });

    res
      .status(200)
      .json({ status: true, token: `Bearer ${token}`, message: "success" });
  } catch (err) {
    next(err);
  }
};

export { createUser, getUser };
