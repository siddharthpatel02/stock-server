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
exports.getStockData = exports.createStock = void 0;
const stock_service_1 = require("../domain/stock.service");
const errorHandling_1 = require("../../utility/errorHandling");
const mongoose_1 = __importDefault(require("mongoose"));
const product_service_1 = require("../../product/domain/product.service");
const createStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { productId, stockQty, unitCost } = req.body;
    try {
        if (stockQty < 1 || unitCost < 1) {
            throw new errorHandling_1.BadRequestError("Stock quantity and unit cost must be fr");
        }
        const updatedProductStock = yield product_service_1.productService.addProductStock(stockQty, productId);
        const { productName, modelName } = updatedProductStock;
        const createdStock = yield stock_service_1.stockService.createStock({
            productId,
            stockQty,
            unitCost,
            productName,
            userId: id,
            modelName,
        });
        res
            .status(201)
            .json({ status: true, data: [], message: "New stock entry updated" });
    }
    catch (error) {
        next(error);
    }
});
exports.createStock = createStock;
const getStockData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const type = req.query.type;
        const productId = req.query.productId;
        const { id } = req.user;
        if (type !== "user" && type !== "product") {
            throw new errorHandling_1.BadRequestError("Query parameter missing or invalid");
        }
        if (type === "product") {
            if (!productId) {
                throw new errorHandling_1.BadRequestError("ProductId missing or invalid");
            }
            const isProductIdValid = mongoose_1.default.isValidObjectId(productId);
            if (!isProductIdValid) {
                throw new errorHandling_1.BadRequestError("ProductId is invalid");
            }
            const stockData = yield stock_service_1.stockService.getStockByProductId(productId);
            return res
                .status(200)
                .json({ status: true, data: stockData, message: "Successful" });
        }
        else {
            const stockData = yield stock_service_1.stockService.getStockByUserId(id);
            return res
                .status(200)
                .json({ status: true, data: stockData, message: "Successful" });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getStockData = getStockData;
//# sourceMappingURL=stock.controller.js.map