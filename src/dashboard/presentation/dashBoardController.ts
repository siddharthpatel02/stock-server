import { User } from "../../models/userModel";
import { UserRequest } from "../../types/userRequestType";
import { request, Response } from "express";
import { Sales } from "../../sales/data/sales.model";
import mongoose from "mongoose";
import { Product } from "../../product/data/product.model";
import { dashboardService } from "../domain/dashboard.service";
// import { productRepository } from "src/product/data/product.repository";

const getDashBoardDetails = async (req: UserRequest, res: Response, next) => {
  const { id } = req.user;
  try {
    const overview = await dashboardService.getDashboardOverviewById(id);
    const weeklyData = await dashboardService.getWeeklyDataById(id);
    const highSaleProduct = await dashboardService.getHighSaleProductsById(id);

    res.status(200).json({
      status: true,
      data: { ...overview, ...weeklyData, highSaleProduct },
      message: "Successful",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getDashBoardDetails };
