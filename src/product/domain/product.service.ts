import {
  ProductType,
  productRepository,
  ProductRepository,
} from "../data/product.repository";

class ProductService {
  constructor(private productRepository: ProductRepository) {}
  createProduct(product: ProductType) {
    return productRepository.createProduct(product);
  }
  getProductByUserId(id: string) {
    return productRepository.getProductByUserId(id);
  }
  addProductStock(addQty: number, productId: string) {
    return productRepository.addProductStock(addQty, productId);
  }
  removeProductStock(removeQty: number, productId: string) {
    return productRepository.removeProductStock(removeQty, productId);
  }
}

const productService = new ProductService(productRepository);

export { productService };
