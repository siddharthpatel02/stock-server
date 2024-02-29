import {
  StockRepository,
  stockRepository,
  StockType,
} from "../data/stock.repository";

class StockService {
  constructor(private stockRepository: StockRepository) {}
  createStock(stock: StockType) {
    return stockRepository.createStock(stock);
  }
  getStockByProductId(productId: string) {
    return stockRepository.getStockByProductId(productId);
  }
  getStockByUserId(UserId: string) {
    return stockRepository.getStockByUserId(UserId);
  }
}

const stockService = new StockService(stockRepository);
export { stockService };
