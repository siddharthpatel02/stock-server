import { Response } from "express";
import { UserRequest } from "../../types/userRequestType";
import { stockService } from "../domain/stock.service";
import { BadRequestError } from "../../utility/errorHandling";
import mongoose from "mongoose";
import { productService } from "../../product/domain/product.service";

const createStock = async (req: UserRequest, res: Response, next) => {
  const { id } = req.user;
  const { productId, stockQty, unitCost } = req.body;
  try {
    if (stockQty < 1 || unitCost < 1) {
      throw new BadRequestError(
        "Stock quantity and unit cost must be fr"
      );
    }
    const updatedProductStock = await productService.addProductStock(
      stockQty,
      productId
    );
    const { productName,modelName } = updatedProductStock;
    const createdStock = await stockService.createStock({
      productId,
      stockQty,
      unitCost,
      productName,
      userId: id,
      modelName,
    });
    res
      .status(201)
      .json({ status: true, data: [], message: "New stock entry updated" });
  } catch (error) {
    next(error);
  }
};

const getStockData = async (req: UserRequest, res: Response, next) => {
  try {
    const type = req.query.type;
    const productId = req.query.productId;
    const { id } = req.user;
    if (type !== "user" && type !== "product") {
      throw new BadRequestError("Query parameter missing or invalid");
    }
    if (type === "product") {
      if (!productId) {
        throw new BadRequestError("ProductId missing or invalid");
      }
      const isProductIdValid = mongoose.isValidObjectId(productId);

      if (!isProductIdValid) {
        throw new BadRequestError("ProductId is invalid");
      }
      const stockData = await stockService.getStockByProductId(
        productId as string
      );
      return res
        .status(200)
        .json({ status: true, data: stockData, message: "Successful" });
    } else {
      const stockData = await stockService.getStockByUserId(id);
      return res
        .status(200)
        .json({ status: true, data: stockData, message: "Successful" });
    }
  } catch (error) {
    next(error);
  }
};

export { createStock, getStockData };
