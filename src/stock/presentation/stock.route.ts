import express from "express";
import { jwtAuthentication } from "../../utility/authentication";
import { createStock, getStockData } from "./stock.controller";

const stockRoute = express.Router();

stockRoute
  .route("/")
  .post(jwtAuthentication, createStock)
  .get(jwtAuthentication, getStockData);

export { stockRoute };
