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
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: [true, "Name required"] },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "require email id"],
        validate: {
            validator: function (value) {
                return validator_1.default.isEmail(value);
            },
            message: "email is not valid",
        },
    },
    password: {
        type: String,
        required: true,
        minlength: [10, "password is too short"],
    },
    confirmPassword: {
        type: String,
        required: true,
        enum: ["admin,:employee"],
        validate: {
            validator: function (value) {
                return this.password === value;
            },
            message: "password do not match",
        },
    },
    type: { type: String, enum: ["admin", "client"], required: true },
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const encryption = yield bcrypt_1.default.hash(this.password, 8);
        this.password = encryption;
        this.confirmPassword = null;
        next();
    });
});
userSchema.method("comparePassword", function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isPAsswordValid = yield bcrypt_1.default.compare(password, this.password);
            return isPAsswordValid;
        }
        catch (err) {
            throw new Error(err);
        }
    });
});
const User = mongoose_1.default.model("USER", userSchema);
exports.User = User;
// handle user type at front hand //
//# sourceMappingURL=userModel.js.map