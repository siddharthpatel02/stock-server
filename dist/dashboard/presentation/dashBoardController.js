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
exports.getDashBoardDetails = void 0;
const dashboard_service_1 = require("../domain/dashboard.service");
// import { productRepository } from "src/product/data/product.repository";
const getDashBoardDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    try {
        const overview = yield dashboard_service_1.dashboardService.getDashboardOverviewById(id);
        const weeklyData = yield dashboard_service_1.dashboardService.getWeeklyDataById(id);
        const highSaleProduct = yield dashboard_service_1.dashboardService.getHighSaleProductsById(id);
        res.status(200).json({
            status: true,
            data: Object.assign(Object.assign(Object.assign({}, overview), weeklyData), { highSaleProduct }),
            message: "Successful",
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getDashBoardDetails = getDashBoardDetails;
//# sourceMappingURL=dashBoardController.js.map