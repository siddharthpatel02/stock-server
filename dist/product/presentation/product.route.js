"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const imageUpload_1 = require("../../utility/imageUpload");
const authentication_1 = require("../../utility/authentication");
const productRoute = express_1.default.Router();
exports.productRoute = productRoute;
productRoute
    .route("/")
    .post(authentication_1.jwtAuthentication, imageUpload_1.uploadFileS3.single("productPhoto"), product_controller_1.createProduct)
    .get(authentication_1.jwtAuthentication, product_controller_1.getProducts);
//# sourceMappingURL=product.route.js.map