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
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuthentication = void 0;
const errorHandling_1 = require("./errorHandling");
const tokenVerification_1 = require("./tokenVerification");
const jwtAuthentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            if (req.path === "/auth") {
                return next(new errorHandling_1.UnauthorizedError("Authentication failed"));
            }
            return next(new errorHandling_1.UnauthorizedError("invalid"));
        }
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = yield (0, tokenVerification_1.verifyToken)(token);
        if (req.path === "/auth") {
            return res.status(201).json({
                status: true,
                data: [],
                message: "Authentication Successfully",
            });
        }
        req.user = { id: decodedToken.id };
        next();
    }
    catch (err) {
        if (req.path === "/auth") {
            return next(new errorHandling_1.UnauthorizedError("Authentication failed"));
        }
        return next(new errorHandling_1.UnauthorizedError());
    }
});
exports.jwtAuthentication = jwtAuthentication;
//# sourceMappingURL=authentication.js.map