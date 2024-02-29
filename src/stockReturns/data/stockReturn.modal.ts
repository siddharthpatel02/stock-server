import mongoose from "mongoose";

interface StockReturnType extends Document {
  productName: string;
  date: Date;
  productId: string;
  userID: string;
  qtySold: number;
  unitCost: number;
}

const stockReturnsSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  modelName:{ type: String, required: true },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PRODUCT",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
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
const stockReturns = mongoose.model<StockReturnType>("STOCKS-RETURNS", stockReturnsSchema);
export { stockReturns };
