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
exports.ProductRepository = exports.productRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandling_1 = require("../../utility/errorHandling");
const product_model_1 = require("./product.model");
class ProductRepository {
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdProduct = yield product_model_1.Product.create(product);
                return createdProduct;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getProductByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_model_1.Product.find({ createdBy: id });
                return products;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addProductStock(addQty, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isProductIdValid = mongoose_1.default.isValidObjectId(productId);
                if (!isProductIdValid) {
                    throw new errorHandling_1.BadRequestError("ProductId is invalid");
                }
                const product = yield product_model_1.Product.findById(productId);
                if (!product) {
                    throw new errorHandling_1.NotFoundError("Product not found");
                }
                product.availableStock += addQty;
                const savedProduct = yield product.save();
                return savedProduct;
            }
            catch (error) {
                throw error;
            }
        });
    }
    removeProductStock(removeQty, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isProductIdValid = mongoose_1.default.isValidObjectId(productId);
                if (!isProductIdValid) {
                    throw new errorHandling_1.BadRequestError("ProductId is invalid");
                }
                const product = yield product_model_1.Product.findById(productId);
                if (!product) {
                    throw new errorHandling_1.NotFoundError("Product not found");
                }
                if (removeQty > product.availableStock) {
                    throw new errorHandling_1.BadRequestError("Insufficient stock to remove");
                }
                product.availableStock -= removeQty;
                const savedProduct = yield product.save();
                return savedProduct;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ProductRepository = ProductRepository;
const productRepository = new ProductRepository();
exports.productRepository = productRepository;
//# sourceMappingURL=product.repository.js.map