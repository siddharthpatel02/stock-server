import express from "express";
import { jwtAuthentication } from "../../utility/authentication";
const salesRoute = express.Router();
import { createSales, getSalesData } from "./sales.controller";

salesRoute
  .route("/")
  .get(jwtAuthentication, getSalesData)
  .post(jwtAuthentication, createSales);

export { salesRoute };
