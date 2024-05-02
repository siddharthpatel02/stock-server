import express, { Request, Response } from "express";
import { Product } from "../data/product.model";
import { BadRequestError, NotFoundError } from "../../utility/errorHandling";
import { UserRequest } from "../../types/userRequestType";
import { productService } from "../domain/product.service";

const createProduct = async (req: UserRequest, res: Response, next) => {
  try {
    if (!req.file) {
      throw new BadRequestError("kindly upload image");
    }
    console.log(req.file.filename);
    const { productName, modelName, price, description } = req.body;
    console.log(req.file);
    const productPhoto = (req.file as any).key;
    const { id: createdBy } = req.user;
    const createdProduct = await productService.createProduct({
      productName,
      modelName,
      price,
      description,
      productPhoto,
      createdBy,
    });
    res.status(201).json({
      status: true,
      data: [],
      message: "created Successfully",
    });
  } catch (err) {
    next(new BadRequestError(err.message));
  }
};

const getProducts = async (req: UserRequest, res: Response, next) => {
  try {
    const { id: userId } = req.user;
    const products = await productService.getProductByUserId(userId);

    // if (products.length < 1) {
    //   throw new NotFoundError("No Data found");
    // }
    res
      .status(200)
      .json({ status: true, data: products, message: "Successful" });
  } catch (err) {
    next(err);
  }
};
export { createProduct, getProducts };
