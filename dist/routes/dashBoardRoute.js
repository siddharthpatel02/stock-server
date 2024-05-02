"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashBoardRouter = void 0;
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../utility/authentication");
const dashBoardController_1 = require("../dashboard/presentation/dashBoardController");
const dashBoardRouter = express_1.default.Router();
exports.dashBoardRouter = dashBoardRouter;
dashBoardRouter.route("/").get(authentication_1.jwtAuthentication, dashBoardController_1.getDashBoardDetails);
//# sourceMappingURL=dashBoardRoute.js.map