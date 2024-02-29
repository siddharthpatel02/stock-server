import { Response } from "express";
import { UserRequest } from "../../types/userRequestType";
import { stockReturnService } from "../domain/stockReturns.service";
import { BadRequestError } from "../../utility/errorHandling";
import mongoose from "mongoose";
import { productService } from "../../product/domain/product.service";

const createStockReturn = async (req: UserRequest, res: Response, next) => {
  const { id } = req.user;
  const { productId, stockQty, unitCost } = req.body;
  try {
    if (stockQty < 1 || unitCost < 1) {
      throw new BadRequestError(
        "Stock quantity and unit cost must be greater than 1"
      );
    }

    const updatedProductStock = await productService.removeProductStock(
      stockQty,
      productId
    );
    const { productName, modelName } = updatedProductStock;
    const createdStockReturn = await stockReturnService.createStockReturn({
      productId,
      stockQty,
      unitCost,
      productName,
      userId: id,
      modelName,
    });
    res.status(201).json({
      status: true,
      data: updatedProductStock,
      message: "Stock returned to vendor",
    });
  } catch (error) {
    next(error);
  }
};

const getStockReturnData = async (req: UserRequest, res: Response, next) => {
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

      const stockReturnData =
        await stockReturnService.getStockReturnByProductId(productId as string);
      return res
        .status(200)
        .json({ status: true, data: stockReturnData, message: "Successful" });
    } else {
      const stockReturnData = await stockReturnService.getStockReturnByUserId(
        id
      );
      return res
        .status(200)
        .json({ status: true, data: stockReturnData, message: "Successful" });
    }
  } catch (error) {
    next(error);
  }
};

export { createStockReturn, getStockReturnData };
