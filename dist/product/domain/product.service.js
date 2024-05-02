"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const product_repository_1 = require("../data/product.repository");
class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    createProduct(product) {
        return product_repository_1.productRepository.createProduct(product);
    }
    getProductByUserId(id) {
        return product_repository_1.productRepository.getProductByUserId(id);
    }
    addProductStock(addQty, productId) {
        return product_repository_1.productRepository.addProductStock(addQty, productId);
    }
    removeProductStock(removeQty, productId) {
        return product_repository_1.productRepository.removeProductStock(removeQty, productId);
    }
}
const productService = new ProductService(product_repository_1.productRepository);
exports.productService = productService;
//# sourceMappingURL=product.service.js.map