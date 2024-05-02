"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesService = void 0;
const sales_repository_1 = require("../data/sales.repository");
class SalesService {
    constructor(salesRepository) {
        this.salesRepository = salesRepository;
    }
    createSale(salesData) {
        return this.salesRepository.createSales(salesData);
    }
    getSalesByUserId(userId, sortBy) {
        return this.salesRepository.getSalesByUSerId(userId, sortBy);
    }
    getSalesByProductId(productId) {
        return this.salesRepository.getSalesByProductId(productId);
    }
}
const salesService = new SalesService(sales_repository_1.salesRepository);
exports.salesService = salesService;
//# sourceMappingURL=sales.service.js.map