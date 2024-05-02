import { ServiceUnavailableError } from "../../utility/errorHandling";
import { Sales } from "./sales.model";
import { SortOrder } from "mongoose";

interface SaleType {
  productId: string;
  userId: string;
  qtySold: number;
  unitCost: number;
  productName: string;
  modelName: string;
}

class SalesRepository {
  async createSales({
    productId,
    userId,
    qtySold,
    unitCost,
    productName,
    modelName,
  }: SaleType) {
    try {
      const createdSale = await Sales.create({
        productId,
        userId,
        qtySold,
        unitCost,
        productName,
        modelName,
      });
      return createdSale;
    } catch (error) {
      throw error;
    }
  }
  async getSalesByUSerId(userId: string, sortBy: SortOrder) {
    try {
      const salesData = await Sales.find({ userId }).sort({ date: sortBy });
      const formattedSalesData = salesData.map((item) => ({
        ...item.toObject(),
        date: item.date.toLocaleDateString(),
      }));
      return formattedSalesData;
    } catch (error) {
      throw error;
    }
  }
  async getSalesByProductId(productId: string) {
    try {
      const salesData = await Sales.find({ productId });
      return salesData;
    } catch (error) {
      throw error;
    }
  }
}
const salesRepository = new SalesRepository();

export { salesRepository, SalesRepository, SaleType };
