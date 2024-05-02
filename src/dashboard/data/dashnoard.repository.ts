import mongoose from "mongoose";
import { Product } from "../../product/data/product.model";
import { User } from "../../models/userModel";
import { pipeline } from "stream";
import { Sales } from "../../sales/data/sales.model";

class DashBoardRepository {
  async getDashboardOverviewById(id: string) {
    try {
      const response = await Product.aggregate([
        {
          $match: {
            createdBy: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "sales",
            let: { id: "$_id", productName: "$productName" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$productId", "$$id"] },
                },
              },
              {
                $addFields: {
                  revenue: { $multiply: ["$qtySold", "$unitCost"] },
                },
              },
              {
                $group: {
                  _id: "$$productName",
                  totalSoldQty: { $sum: "$qtySold" },
                  totalRevenue: { $sum: "$revenue" },
                },
              },
            ],
            as: "sales",
          },
        },
        {
          $group: {
            _id: "dashboard",
            totalSales: { $sum: { $first: "$sales.totalSoldQty" } },
            totalRevenue: { $sum: { $first: "$sales.totalRevenue" } },
            productList: {
              $push: {
                productName: "$productName",
                id: "$_id",
              },
            },
            salesPerProduct: { $push: { $first: "$sales.totalSoldQty" } },
            totalProducts: { $sum: 1 },
            availableStocks: { $sum: "$availableStock" },
          },
        },
      ]);
      const result = {
        totalSales: response[0].totalSales,
        totalRevenue: response[0].totalRevenue,
        productList: response[0].productList,
        salesPerProduct: response[0].salesPerProduct,
        totalProducts: response[0].totalProducts,
        availableStocks: response[0].availableStocks,
      };
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getWeeklyDataById(id: string) {
    try {
      const response = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $project: {
            name: 1,
            _id: 1,
            startWeek: {
              $week: { $subtract: [new Date(), 3 * 7 * 24 * 60 * 60 * 1000] },
            },
          },
        },
        {
          $lookup: {
            from: "products",
            let: { id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$createdBy", "$$id"] },
                      { $lte: ["$availableStock", 5] },
                    ],
                  },
                },
              },
              {
                $project: {
                  productName: 1,
                  modelName: 1,
                  availableStock: 1,
                  _id: 1,
                },
              },
              { $sort: { availableStock: 1 } },
            ],
            as: "lowStockProduct",
          },
        },
        {
          $lookup: {
            from: "sales",
            let: { id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$userId", "$$id"] },
                      {
                        $gte: [
                          "$date",
                          {
                            $subtract: [
                              new Date(),
                              4 * 7 * 24 * 60 * 60 * 1000,
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              {
                $group: {
                  _id: { $week: "$date" },
                  sales: { $sum: "$qtySold" },
                },
              },
              {
                $sort: {
                  _id: 1, // sorts by week in descending order
                },
              },
            ],
            as: "sales",
          },
        },
        {
          $lookup: {
            from: "stocks",
            let: { id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$userId", "$$id"] },
                      {
                        $gte: [
                          "$date",
                          {
                            $subtract: [
                              new Date(),
                              4 * 7 * 24 * 60 * 60 * 1000,
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              {
                $group: {
                  _id: { $week: "$date" },
                  stock: { $sum: "$stockQty" },
                },
              },
              {
                $sort: {
                  _id: 1, // sorts by week in descending order
                },
              },
            ],
            as: "stocks",
          },
        },
        {
          $lookup: {
            from: "stocks-returns",
            let: { id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$userId", "$$id"] },
                      {
                        $gte: [
                          "$date",
                          {
                            $subtract: [
                              new Date(),
                              4 * 7 * 24 * 60 * 60 * 1000,
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              {
                $group: {
                  _id: { $week: "$date" },
                  stockReturn: { $sum: "$stockQty" },
                },
              },
              {
                $sort: {
                  _id: 1, // sorts by week in descending order
                },
              },
            ],
            as: "stocksReturn",
          },
        },
      ]);
      const generateArrayWithZeros = () => Array(4).fill(0);
      const startWeek = response[0].startWeek;
      console.log(response[0]);
      const sales = generateArrayWithZeros().map((_, index) => {
        return (
          response[0]?.sales.find((item) => item._id === index + startWeek)
            ?.sales || 0
        );
      });
      const stock = generateArrayWithZeros().map((_, index) => {
        return (
          response[0]?.stocks.find((item) => item._id === index + startWeek)
            ?.stock || 0
        );
      });
      const stock_return = generateArrayWithZeros().map((_, index) => {
        return (
          response[0]?.stocksReturn.find(
            (item) => item._id === index + startWeek
          )?.stockReturn || 0
        );
      });

      const result = {
        weeklySales: sales,
        weeklyStock: stock,
        weeklyStockReturn: stock_return,
        userName: response[0].name,
        lowStockProduct: response[0].lowStockProduct,
      };
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getHighSaleProductsById(id: string) {
    try {
      const response = Sales.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(id) } },
        {
          $group: {
            _id: "$productId",
            totalSales: { $sum: "$qtySold" },
            productName: { $first: "$productName" },
            modelName: { $first: "$modelName" },
          },
        },
        { $sort: { totalSales: -1 } },
        { $limit: 5 },
      ]);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
const dashBoardRepository = new DashBoardRepository();
export { dashBoardRepository, DashBoardRepository };
