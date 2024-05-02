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
exports.DashBoardRepository = exports.dashBoardRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("../../product/data/product.model");
const userModel_1 = require("../../models/userModel");
const sales_model_1 = require("../../sales/data/sales.model");
class DashBoardRepository {
    getDashboardOverviewById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield product_model_1.Product.aggregate([
                    {
                        $match: {
                            createdBy: new mongoose_1.default.Types.ObjectId(id),
                        },
                    },
                    {
                        $lookup: {
                            from: "sales",
                            let: { id: "$_id", productName: "$productName" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $eq: ["$productId", "$$id"] },
                                    },
                                },
                                {
                                    $addFields: {
                                        revenue: { $multiply: ["$qtySold", "$unitCost"] },
                                    },
                                },
                                {
                                    $group: {
                                        _id: "$$productName",
                                        totalSoldQty: { $sum: "$qtySold" },
                                        totalRevenue: { $sum: "$revenue" },
                                    },
                                },
                            ],
                            as: "sales",
                        },
                    },
                    {
                        $group: {
                            _id: "dashboard",
                            totalSales: { $sum: { $first: "$sales.totalSoldQty" } },
                            totalRevenue: { $sum: { $first: "$sales.totalRevenue" } },
                            productList: {
                                $push: {
                                    productName: "$productName",
                                    id: "$_id",
                                },
                            },
                            salesPerProduct: { $push: { $first: "$sales.totalSoldQty" } },
                            totalProducts: { $sum: 1 },
                            availableStocks: { $sum: "$availableStock" },
                        },
                    },
                ]);
                const result = {
                    totalSales: response[0].totalSales,
                    totalRevenue: response[0].totalRevenue,
                    productList: response[0].productList,
                    salesPerProduct: response[0].salesPerProduct,
                    totalProducts: response[0].totalProducts,
                    availableStocks: response[0].availableStocks,
                };
                console.log(result);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getWeeklyDataById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield userModel_1.User.aggregate([
                    { $match: { _id: new mongoose_1.default.Types.ObjectId(id) } },
                    {
                        $project: {
                            name: 1,
                            _id: 1,
                            startWeek: {
                                $week: { $subtract: [new Date(), 3 * 7 * 24 * 60 * 60 * 1000] },
                            },
                        },
                    },
                    {
                        $lookup: {
                            from: "products",
                            let: { id: "$_id" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$createdBy", "$$id"] },
                                                { $lte: ["$availableStock", 5] },
                                            ],
                                        },
                                    },
                                },
                                {
                                    $project: {
                                        productName: 1,
                                        modelName: 1,
                                        availableStock: 1,
                                        _id: 1,
                                    },
                                },
                                { $sort: { availableStock: 1 } },
                            ],
                            as: "lowStockProduct",
                        },
                    },
                    {
                        $lookup: {
                            from: "sales",
                            let: { id: "$_id" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$userId", "$$id"] },
                                                {
                                                    $gte: [
                                                        "$date",
                                                        {
                                                            $subtract: [
                                                                new Date(),
                                                                4 * 7 * 24 * 60 * 60 * 1000,
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    $group: {
                                        _id: { $week: "$date" },
                                        sales: { $sum: "$qtySold" },
                                    },
                                },
                                {
                                    $sort: {
                                        _id: 1, // sorts by week in descending order
                                    },
                                },
                            ],
                            as: "sales",
                        },
                    },
                    {
                        $lookup: {
                            from: "stocks",
                            let: { id: "$_id" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$userId", "$$id"] },
                                                {
                                                    $gte: [
                                                        "$date",
                                                        {
                                                            $subtract: [
                                                                new Date(),
                                                                4 * 7 * 24 * 60 * 60 * 1000,
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    $group: {
                                        _id: { $week: "$date" },
                                        stock: { $sum: "$stockQty" },
                                    },
                                },
                                {
                                    $sort: {
                                        _id: 1, // sorts by week in descending order
                                    },
                                },
                            ],
                            as: "stocks",
                        },
                    },
                    {
                        $lookup: {
                            from: "stocks-returns",
                            let: { id: "$_id" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$userId", "$$id"] },
                                                {
                                                    $gte: [
                                                        "$date",
                                                        {
                                                            $subtract: [
                                                                new Date(),
                                                                4 * 7 * 24 * 60 * 60 * 1000,
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    $group: {
                                        _id: { $week: "$date" },
                                        stockReturn: { $sum: "$stockQty" },
                                    },
                                },
                                {
                                    $sort: {
                                        _id: 1, // sorts by week in descending order
                                    },
                                },
                            ],
                            as: "stocksReturn",
                        },
                    },
                ]);
                const generateArrayWithZeros = () => Array(4).fill(0);
                const startWeek = response[0].startWeek;
                console.log(response[0]);
                const sales = generateArrayWithZeros().map((_, index) => {
                    var _a, _b;
                    return (((_b = (_a = response[0]) === null || _a === void 0 ? void 0 : _a.sales.find((item) => item._id === index + startWeek)) === null || _b === void 0 ? void 0 : _b.sales) || 0);
                });
                const stock = generateArrayWithZeros().map((_, index) => {
                    var _a, _b;
                    return (((_b = (_a = response[0]) === null || _a === void 0 ? void 0 : _a.stocks.find((item) => item._id === index + startWeek)) === null || _b === void 0 ? void 0 : _b.stock) || 0);
                });
                const stock_return = generateArrayWithZeros().map((_, index) => {
                    var _a, _b;
                    return (((_b = (_a = response[0]) === null || _a === void 0 ? void 0 : _a.stocksReturn.find((item) => item._id === index + startWeek)) === null || _b === void 0 ? void 0 : _b.stockReturn) || 0);
                });
                const result = {
                    weeklySales: sales,
                    weeklyStock: stock,
                    weeklyStockReturn: stock_return,
                    userName: response[0].name,
                    lowStockProduct: response[0].lowStockProduct,
                };
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getHighSaleProductsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = sales_model_1.Sales.aggregate([
                    { $match: { userId: new mongoose_1.default.Types.ObjectId(id) } },
                    {
                        $group: {
                            _id: "$productId",
                            totalSales: { $sum: "$qtySold" },
                            productName: { $first: "$productName" },
                            modelName: { $first: "$modelName" },
                        },
                    },
                    { $sort: { totalSales: -1 } },
                    { $limit: 5 },
                ]);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.DashBoardRepository = DashBoardRepository;
const dashBoardRepository = new DashBoardRepository();
exports.dashBoardRepository = dashBoardRepository;
//# sourceMappingURL=dashnoard.repository.js.map