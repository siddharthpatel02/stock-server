"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockRoute = void 0;
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../../utility/authentication");
const stock_controller_1 = require("./stock.controller");
const stockRoute = express_1.default.Router();
exports.stockRoute = stockRoute;
stockRoute
    .route("/")
    .post(authentication_1.jwtAuthentication, stock_controller_1.createStock)
    .get(authentication_1.jwtAuthentication, stock_controller_1.getStockData);
//# sourceMappingURL=stock.route.js.map