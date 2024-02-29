import express, { Express, Request, Response } from "express";
import { createProduct, getProducts } from "./product.controller";
import { uploadFile } from "../../utility/imageUpload";
import { jwtAuthentication } from "../../utility/authentication";

const productRoute = express.Router();

productRoute
  .route("/")
  .post(jwtAuthentication, uploadFile.single("productPhoto"), createProduct)
  .get(jwtAuthentication, getProducts);

export { productRoute };
