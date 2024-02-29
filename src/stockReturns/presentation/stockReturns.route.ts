import express from "express";
import { jwtAuthentication } from "../../utility/authentication";
import { createStockReturn,getStockReturnData } from "./stockReturns.controller";

const stockReturnRoute = express.Router();

stockReturnRoute
  .route("/")
  .post(jwtAuthentication, createStockReturn)
  .get(jwtAuthentication, getStockReturnData);

export { stockReturnRoute };
