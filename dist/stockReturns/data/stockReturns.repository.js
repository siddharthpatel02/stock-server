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
exports.stockReturnRepository = exports.StockReturnRepository = void 0;
const stockReturn_modal_1 = require("./stockReturn.modal");
class StockReturnRepository {
    createStockReturn(stockReturn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdStockReturn = yield stockReturn_modal_1.stockReturns.create(stockReturn);
                return createdStockReturn;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getStockReturnByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockReturnFromProductId = yield stockReturn_modal_1.stockReturns.find({ productId });
                return stockReturnFromProductId;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getStockReturnByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockReturnFromUserId = yield stockReturn_modal_1.stockReturns.find({ userId });
                return stockReturnFromUserId;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.StockReturnRepository = StockReturnRepository;
const stockReturnRepository = new StockReturnRepository();
exports.stockReturnRepository = stockReturnRepository;
//# sourceMappingURL=stockReturns.repository.js.map