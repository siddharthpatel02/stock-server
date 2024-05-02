import express, { Express, Request, Response } from "express";
import { createProduct, getProducts } from "./product.controller";
import { uploadFile, uploadFileS3 } from "../../utility/imageUpload";
import { jwtAuthentication } from "../../utility/authentication";

const productRoute = express.Router();

productRoute
  .route("/")
  .post(jwtAuthentication, uploadFileS3.single("productPhoto"), createProduct)
  .get(jwtAuthentication, getProducts);

export { productRoute };
