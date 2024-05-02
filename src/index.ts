import express, { Express, Request, Response } from "express";
import "dotenv/config";
import { connectDB } from "./utility/database";
import { productRoute } from "./product/presentation/product.route";
import { userRouter } from "./routes/userRoute";
import { AppError } from "./utility/errorHandling";
import { jwtAuthentication } from "./utility/authentication";
import { salesRoute } from "./sales/presentation/sales.route";
import { stockRoute } from "./stock/presentation/stock.route";
import { stockReturnRoute } from "./stockReturns/presentation/stockReturns.route";
import { dashBoardRouter } from "./routes/dashBoardRoute";
import { Worker, workerData } from "node:worker_threads";

import cors from "cors";
import path from "path";

const app: Express = express();
const port = process.env.PORT || 8080;
connectDB();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// const newThread = new Worker("./src/worker-thread.ts", {
//   workerData: { name: "siddharth" },
// });
// newThread.on("message", (m) => {
//   console.log(m);
// });
// newThread.on("message", (m) => {
//   console.log("wor");
// });
app.use(express.json());
const productPictures = path.join(__dirname, "../public/uploads");
app.use("/public", express.static(productPictures));
app.use("/user", userRouter);
app.use("/products", productRoute);
app.use("/sales", salesRoute);
app.use("/stock", stockRoute);
app.use("/stock-returns", stockReturnRoute);
app.use("/dashboard", dashBoardRouter);
app.get("/auth", jwtAuthentication);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript server");
});
app.use(function (err: AppError, _req: Request, res: Response, _next) {
  if (err instanceof AppError) {
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
