"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockService = void 0;
const stock_repository_1 = require("../data/stock.repository");
class StockService {
    constructor(stockRepository) {
        this.stockRepository = stockRepository;
    }
    createStock(stock) {
        return stock_repository_1.stockRepository.createStock(stock);
    }
    getStockByProductId(productId) {
        return stock_repository_1.stockRepository.getStockByProductId(productId);
    }
    getStockByUserId(UserId) {
        return stock_repository_1.stockRepository.getStockByUserId(UserId);
    }
}
const stockService = new StockService(stock_repository_1.stockRepository);
exports.stockService = stockService;
//# sourceMappingURL=stock.service.js.map