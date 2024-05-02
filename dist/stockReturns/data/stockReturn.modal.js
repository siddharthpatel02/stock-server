"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockReturns = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const stockReturnsSchema = new mongoose_1.default.Schema({
    productName: { type: String, required: true },
    modelName: { type: String, required: true },
    date: {
        type: Date,
        required: true,
        default: new Date(),
    },
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "PRODUCT",
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "USER",
        required: true,
    },
    stockQty: {
        type: Number,
        required: true,
    },
    unitCost: {
        type: Number,
        required: true,
    },
});
const stockReturns = mongoose_1.default.model("STOCKS-RETURNS", stockReturnsSchema);
exports.stockReturns = stockReturns;
//# sourceMappingURL=stockReturn.modal.js.map