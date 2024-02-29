import { Response } from "express";
import { BadRequestError, NotFoundError } from "../../utility/errorHandling";
import { salesService } from "../domain/sales.service";
import { UserRequest } from "../../types/userRequestType";
import mongoose from "mongoose";
import { productService } from "../../product/domain/product.service";

const createSales = async (req: UserRequest, res: Response, next) => {
  try {
    const { id } = req.user;
    const { productId, qtySold, unitCost } = req.body;
    if (qtySold < 1 || unitCost < 1) {
      throw new BadRequestError(
        "Stock quantity and unit cost must be non-negative"
      );
    }
    const updatedProductStock = await productService.removeProductStock(
      qtySold,
      productId
    );
    const { productName,modelName} = updatedProductStock;
    console.log(modelName)

    const createdSale = await salesService.createSale({
      productId,
      userId: id,
      qtySold,
      unitCost,
      productName,
      modelName
    });
    res.status(201).json({
      status: true,
      data: updatedProductStock,
      message: "sales created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getSalesData = async (req: UserRequest, res: Response, next) => {
  try {
    const { id } = req.user;
    const type = req.query.type;
    const productId = req.query.productId;
    if (type !== "user" && type !== "product") {
      throw new BadRequestError("Query parameter missing or invalid");
    }
    if (type === "user") {
      const salesData = await salesService.getSalesByUserId(id);
      return res
        .status(200)
        .json({ status: true, data: salesData, message: "Successful" });
    } else {
      if (!productId) {
        throw new BadRequestError("ProductId missing");
      }
      const isProductIdValid = mongoose.isValidObjectId(productId);

      if (!isProductIdValid) {
        throw new BadRequestError("ProductId is invalid");
      }

      const salesData = await salesService.getSalesByProductId(
        productId as string
      );
      res
        .status(200)
        .json({ status: true, data: salesData, message: "Successful" });
    }
  } catch (err) {
    next(err);
  }
};

export { createSales, getSalesData };
