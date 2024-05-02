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
exports.dashboardService = void 0;
const dashnoard_repository_1 = require("../data/dashnoard.repository");
class DashboardService {
    constructor(dashBoardRepository) {
        this.dashBoardRepository = dashBoardRepository;
    }
    getDashboardOverviewById(id) {
        return dashnoard_repository_1.dashBoardRepository.getDashboardOverviewById(id);
    }
    getWeeklyDataById(id) {
        return dashnoard_repository_1.dashBoardRepository.getWeeklyDataById(id);
    }
    getHighSaleProductsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return dashnoard_repository_1.dashBoardRepository.getHighSaleProductsById(id);
        });
    }
}
const dashboardService = new DashboardService(dashnoard_repository_1.dashBoardRepository);
exports.dashboardService = dashboardService;
//# sourceMappingURL=dashboard.service.js.map