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
exports.getProducts = exports.createProduct = void 0;
const errorHandling_1 = require("../../utility/errorHandling");
const product_service_1 = require("../domain/product.service");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            throw new errorHandling_1.BadRequestError("kindly upload image");
        }
        console.log(req.file.filename);
        const { productName, modelName, price, description } = req.body;
        console.log(req.file);
        const productPhoto = req.file.key;
        const { id: createdBy } = req.user;
        const createdProduct = yield product_service_1.productService.createProduct({
            productName,
            modelName,
            price,
            description,
            productPhoto,
            createdBy,
        });
        res.status(201).json({
            status: true,
            data: [],
            message: "created Successfully",
        });
    }
    catch (err) {
        next(new errorHandling_1.BadRequestError(err.message));
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: userId } = req.user;
        const products = yield product_service_1.productService.getProductByUserId(userId);
        // if (products.length < 1) {
        //   throw new NotFoundError("No Data found");
        // }
        res
            .status(200)
            .json({ status: true, data: products, message: "Successful" });
    }
    catch (err) {
        next(err);
    }
});
exports.getProducts = getProducts;
//# sourceMappingURL=product.controller.js.map