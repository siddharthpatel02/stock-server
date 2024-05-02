"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockReturnRoute = void 0;
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../../utility/authentication");
const stockReturns_controller_1 = require("./stockReturns.controller");
const stockReturnRoute = express_1.default.Router();
exports.stockReturnRoute = stockReturnRoute;
stockReturnRoute
    .route("/")
    .post(authentication_1.jwtAuthentication, stockReturns_controller_1.createStockReturn)
    .get(authentication_1.jwtAuthentication, stockReturns_controller_1.getStockReturnData);
//# sourceMappingURL=stockReturns.route.js.map