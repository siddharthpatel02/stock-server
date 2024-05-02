"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesRoute = void 0;
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../../utility/authentication");
const salesRoute = express_1.default.Router();
exports.salesRoute = salesRoute;
const sales_controller_1 = require("./sales.controller");
salesRoute
    .route("/")
    .get(authentication_1.jwtAuthentication, sales_controller_1.getSalesData)
    .post(authentication_1.jwtAuthentication, sales_controller_1.createSales);
//# sourceMappingURL=sales.route.js.map