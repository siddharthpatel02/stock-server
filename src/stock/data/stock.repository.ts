import { setUncaughtExceptionCaptureCallback } from "process";
import { Stock } from "./stock.modal";

interface StockType {
  productId: string;
  userId: string;
  stockQty: number;
  unitCost: number;
  productName: string;
  modelName:string
}

class StockRepository {
  async createStock(stock: StockType) {
    try {
      const createdStock = await Stock.create(stock);
      return createdStock;
    } catch (error) {
      throw error;
    }
  }
  async getStockByProductId(productId: string) {
    try {
      const stockFromProductId = await Stock.find({ productId });
      return stockFromProductId;
    } catch (error) {
      throw error;
    }
  }
  async getStockByUserId(userId: string) {
    try {
      const stockFromUserId = await Stock.find({ userId });
      return stockFromUserId;
    } catch (error) {
      throw error;
    }
  }
}

const stockRepository = new StockRepository();
export { StockRepository, stockRepository, StockType };
