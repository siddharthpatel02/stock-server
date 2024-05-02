"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.createUser = void 0;
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandling_1 = require("../utility/errorHandling");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.create(req.body);
        res
            .status(201)
            .json({ status: true, data: [], message: "User created Successfully" });
    }
    catch (err) {
        next(new errorHandling_1.BadRequestError(err.message));
    }
});
exports.createUser = createUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUser = yield userModel_1.User.find({ userName: req.body.username });
        const user = getUser[0];
        if (!user) {
            throw new errorHandling_1.NotFoundError("User not found");
            // next(new NotFoundError("User not found"));
        }
        const isPasswordValid = yield user.comparePassword(req.body.password);
        if (!isPasswordValid) {
            throw new errorHandling_1.UnauthorizedError("Incorrect credentials");
            // next(new UnauthorizedError("incorrect credentials"));
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXP_TIME,
        });
        res
            .status(200)
            .json({ status: true, token: `Bearer ${token}`, message: "success" });
    }
    catch (err) {
        next(err);
    }
});
exports.getUser = getUser;
//# sourceMappingURL=userController.js.map