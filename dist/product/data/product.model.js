"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    productName: { type: String, required: true },
    modelName: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    availableStock: { type: Number, required: true, default: 0 },
    productPhoto: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
    createdOn: { type: Date, required: true, default: new Date() },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "USER",
        required: true,
    },
});
const Product = mongoose_1.default.model("PRODUCT", productSchema);
exports.Product = Product;
//# sourceMappingURL=product.model.js.map