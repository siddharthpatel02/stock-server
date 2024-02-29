import { setUncaughtExceptionCaptureCallback } from "process";
import { stockReturns } from "./stockReturn.modal";

interface StockReturnType {
  productId: string;
  userId: string;
  stockQty: number;
  unitCost: number;
  productName: string;
  modelName:string
}

class StockReturnRepository {
  async createStockReturn(stockReturn: StockReturnType) {
    try {
      const createdStockReturn = await stockReturns.create(stockReturn);
      return createdStockReturn;
    } catch (error) {
      throw error;
    }
  }
  async getStockReturnByProductId(productId: string) {
    try {
      const stockReturnFromProductId = await stockReturns.find({ productId });
      return stockReturnFromProductId;
    } catch (error) {
      throw error;
    }
  }
  async getStockReturnByUserId(userId: string) {
    try {
      const stockReturnFromUserId = await stockReturns.find({ userId });
      return stockReturnFromUserId;
    } catch (error) {
      throw error;
    }
  }
}

const stockReturnRepository = new StockReturnRepository();
export { StockReturnRepository, stockReturnRepository, StockReturnType };
