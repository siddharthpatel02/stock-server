import {
  SalesRepository,
  salesRepository,
  SaleType,
} from "../data/sales.repository";

class SalesService {
  constructor(private salesRepository: SalesRepository) {}

  createSale(salesData: SaleType) {
    return this.salesRepository.createSales(salesData);
  }
  getSalesByUserId(userId: string) {
    return this.salesRepository.getSalesByUSerId(userId);
  }
  getSalesByProductId(productId: string) {
    return this.salesRepository.getSalesByProductId(productId);
  }
}

const salesService = new SalesService(salesRepository);
export { salesService };
