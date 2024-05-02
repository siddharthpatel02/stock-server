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
exports.getSalesData = exports.createSales = void 0;
const errorHandling_1 = require("../../utility/errorHandling");
const sales_service_1 = require("../domain/sales.service");
const mongoose_1 = __importDefault(require("mongoose"));
const product_service_1 = require("../../product/domain/product.service");
const createSales = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const { productId, qtySold, unitCost } = req.body;
        if (qtySold < 1 || unitCost < 1) {
            throw new errorHandling_1.BadRequestError("Stock quantity and unit cost must be non-negative");
        }
        const updatedProductStock = yield product_service_1.productService.removeProductStock(qtySold, productId);
        const { productName, modelName } = updatedProductStock;
        console.log(modelName);
        const createdSale = yield sales_service_1.salesService.createSale({
            productId,
            userId: id,
            qtySold,
            unitCost,
            productName,
            modelName,
        });
        res.status(201).json({
            status: true,
            data: updatedProductStock,
            message: "sales created successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createSales = createSales;
const getSalesData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const type = req.query.type;
        const sortByDate = req.query.sort;
        console.log(sortByDate);
        const productId = req.query.productId;
        if (sortByDate !== "asc" && sortByDate !== "dsc") {
            throw new errorHandling_1.BadRequestError("Query parameter missing or invalid");
        }
        if (type !== "user" && type !== "product") {
            throw new errorHandling_1.BadRequestError("Query parameter missing or invalid");
        }
        if (type === "user") {
            const sortBy = sortByDate === "asc" ? 1 : -1;
            const salesData = yield sales_service_1.salesService.getSalesByUserId(id, sortBy);
            return res
                .status(200)
                .json({ status: true, data: salesData, message: "Successful" });
        }
        else {
            if (!productId) {
                throw new errorHandling_1.BadRequestError("ProductId missing");
            }
            const isProductIdValid = mongoose_1.default.isValidObjectId(productId);
            if (!isProductIdValid) {
                throw new errorHandling_1.BadRequestError("ProductId is invalid");
            }
            const salesData = yield sales_service_1.salesService.getSalesByProductId(productId);
            res
                .status(200)
                .json({ status: true, data: salesData, message: "Successful" });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getSalesData = getSalesData;
//# sourceMappingURL=sales.controller.js.map