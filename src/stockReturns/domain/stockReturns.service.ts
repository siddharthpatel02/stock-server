import {
  StockReturnRepository,
  stockReturnRepository,
  StockReturnType,
} from "../data/stockReturns.repository";

class StockReturnService {
  constructor(private stockReturnRepository: StockReturnRepository) {}

  createStockReturn(stockReturn: StockReturnType) {
    return stockReturnRepository.createStockReturn(stockReturn);
  }

  getStockReturnByProductId(productId: string) {
    return stockReturnRepository.getStockReturnByProductId(productId);
  }

  getStockReturnByUserId(userId: string) {
    return stockReturnRepository.getStockReturnByUserId(userId);
  }
}
const stockReturnService = new StockReturnService(stockReturnRepository);
export { stockReturnService };
