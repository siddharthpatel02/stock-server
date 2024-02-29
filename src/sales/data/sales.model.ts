import mongoose from "mongoose";
interface SalesType extends Document {
  productName: string;
  date: Date;
  productId: string;
  userID: string;
  qtySold: number;
  unitCost: number;
}

const salesSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  modelName: { type: String, required: true },
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
  qtySold: {
    type: Number,
    required: true,
  },
  unitCost: {
    type: Number,
    required: true,
  },
});
const Sales = mongoose.model<SalesType>("SALES", salesSchema);
export { Sales };
