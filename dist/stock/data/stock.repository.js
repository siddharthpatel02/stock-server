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
exports.stockRepository = exports.StockRepository = void 0;
const stock_modal_1 = require("./stock.modal");
class StockRepository {
    createStock(stock) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdStock = yield stock_modal_1.Stock.create(stock);
                return createdStock;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getStockByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockFromProductId = yield stock_modal_1.Stock.find({ productId });
                return stockFromProductId;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getStockByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockFromUserId = yield stock_modal_1.Stock.find({ userId });
                return stockFromUserId;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.StockRepository = StockRepository;
const stockRepository = new StockRepository();
exports.stockRepository = stockRepository;
//# sourceMappingURL=stock.repository.js.map