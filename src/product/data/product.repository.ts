import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../../utility/errorHandling";
import { Product } from "./product.model";

interface ProductType {
  productName: string;
  modelName: string;
  price: string;
  description: string;
  productPhoto: string;
  createdBy: string;
}

class ProductRepository {
  async createProduct(product: ProductType) {
    try {
      const createdProduct = await Product.create(product);
      return createdProduct;
    } catch (error) {
      throw error;
    }
  }

  async getProductByUserId(id: string) {
    try {
      const products = await Product.find({ createdBy: id });
      return products;
    } catch (error) {
      throw error;
    }
  }
  async addProductStock(addQty: number, productId: string) {
    try {
      const isProductIdValid = mongoose.isValidObjectId(productId);
      if (!isProductIdValid) {
        throw new BadRequestError("ProductId is invalid");
      }
      const product = await Product.findById(productId);
      if (!product) {
        throw new NotFoundError("Product not found");
      }
      product.availableStock += addQty;
      const savedProduct = await product.save();
      return savedProduct;
    } catch (error) {
      throw error;
    }
  }

  async removeProductStock(removeQty: number, productId: string) {
    try {
      const isProductIdValid = mongoose.isValidObjectId(productId);
      if (!isProductIdValid) {
        throw new BadRequestError("ProductId is invalid");
      }
      const product = await Product.findById(productId);
      if (!product) {
        throw new NotFoundError("Product not found");
      }
      if (removeQty > product.availableStock) {
        throw new BadRequestError("Insufficient stock to remove");
      }
      product.availableStock -= removeQty;
      const savedProduct = await product.save();
      return savedProduct;
    } catch (error) {
      throw error;
    }
  }
}

const productRepository = new ProductRepository();
export { productRepository, ProductType, ProductRepository };
