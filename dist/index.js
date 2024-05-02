"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const database_1 = require("./utility/database");
const product_route_1 = require("./product/presentation/product.route");
const userRoute_1 = require("./routes/userRoute");
const errorHandling_1 = require("./utility/errorHandling");
const authentication_1 = require("./utility/authentication");
const sales_route_1 = require("./sales/presentation/sales.route");
const stock_route_1 = require("./stock/presentation/stock.route");
const stockReturns_route_1 = require("./stockReturns/presentation/stockReturns.route");
const dashBoardRoute_1 = require("./routes/dashBoardRoute");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
(0, database_1.connectDB)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
// const newThread = new Worker("./src/worker-thread.ts", {
//   workerData: { name: "siddharth" },
// });
// newThread.on("message", (m) => {
//   console.log(m);
// });
// newThread.on("message", (m) => {
//   console.log("wor");
// });
app.use(express_1.default.json());
const productPictures = path_1.default.join(__dirname, "../public/uploads");
app.use("/public", express_1.default.static(productPictures));
app.use("/user", userRoute_1.userRouter);
app.use("/products", product_route_1.productRoute);
app.use("/sales", sales_route_1.salesRoute);
app.use("/stock", stock_route_1.stockRoute);
app.use("/stock-returns", stockReturns_route_1.stockReturnRoute);
app.use("/dashboard", dashBoardRoute_1.dashBoardRouter);
app.get("/auth", authentication_1.jwtAuthentication);
app.get("/", (req, res) => {
    res.send("Express + TypeScript server");
});
app.use(function (err, _req, res, _next) {
    if (err instanceof errorHandling_1.AppError) {
        res.status(err.statusCode).json({
            status: false,
            data: [],
            message: err.message,
        });
    }
    res.status(500).json({
        status: false,
        data: [],
        message: err.message,
    });
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map