"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockReturnService = void 0;
const stockReturns_repository_1 = require("../data/stockReturns.repository");
class StockReturnService {
    constructor(stockReturnRepository) {
        this.stockReturnRepository = stockReturnRepository;
    }
    createStockReturn(stockReturn) {
        return stockReturns_repository_1.stockReturnRepository.createStockReturn(stockReturn);
    }
    getStockReturnByProductId(productId) {
        return stockReturns_repository_1.stockReturnRepository.getStockReturnByProductId(productId);
    }
    getStockReturnByUserId(userId) {
        return stockReturns_repository_1.stockReturnRepository.getStockReturnByUserId(userId);
    }
}
const stockReturnService = new StockReturnService(stockReturns_repository_1.stockReturnRepository);
exports.stockReturnService = stockReturnService;
//# sourceMappingURL=stockReturns.service.js.map