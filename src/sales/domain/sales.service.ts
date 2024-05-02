import {
  SalesRepository,
  salesRepository,
  SaleType,
} from "../data/sales.repository";
import { SortOrder } from "mongoose";


class SalesService {
  constructor(private salesRepository: SalesRepository) {}

  createSale(salesData: SaleType) {
    return this.salesRepository.createSales(salesData);
  }
  getSalesByUserId(userId: string, sortBy: SortOrder) {
    return this.salesRepository.getSalesByUSerId(userId, sortBy);
  }
  getSalesByProductId(productId: string) {
    return this.salesRepository.getSalesByProductId(productId);
  }
}

const salesService = new SalesService(salesRepository);
export { salesService };
