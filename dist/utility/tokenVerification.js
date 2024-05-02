"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (token) => new Promise((resolve, reject) => {
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
        if (err) {
            reject(err);
        }
        else {
            resolve(decoded);
        }
    });
});
exports.verifyToken = verifyToken;
//# sourceMappingURL=tokenVerification.js.map