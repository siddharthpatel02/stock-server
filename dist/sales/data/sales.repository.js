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
exports.SalesRepository = exports.salesRepository = void 0;
const sales_model_1 = require("./sales.model");
class SalesRepository {
    createSales({ productId, userId, qtySold, unitCost, productName, modelName, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdSale = yield sales_model_1.Sales.create({
                    productId,
                    userId,
                    qtySold,
                    unitCost,
                    productName,
                    modelName,
                });
                return createdSale;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getSalesByUSerId(userId, sortBy) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salesData = yield sales_model_1.Sales.find({ userId }).sort({ date: sortBy });
                const formattedSalesData = salesData.map((item) => (Object.assign(Object.assign({}, item.toObject()), { date: item.date.toLocaleDateString() })));
                return formattedSalesData;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getSalesByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salesData = yield sales_model_1.Sales.find({ productId });
                return salesData;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.SalesRepository = SalesRepository;
const salesRepository = new SalesRepository();
exports.salesRepository = salesRepository;
//# sourceMappingURL=sales.repository.js.map