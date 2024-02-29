import mongoose, { Document } from "mongoose";
// import validator from "validator";

interface productType extends Document {
  productName: string;
  modelName: string;
  price: string;
  description: string;
  availableStock: number;
  productPhoto: string;
  status: boolean;
  createdOn: Date;
  createdBy: string;
}

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  modelName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  availableStock: { type: Number, required: true, default: 0 },
  productPhoto: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
  createdOn: { type: Date, required: true, default: new Date() },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
    required: true,
  },
});

const Product = mongoose.model<productType>("PRODUCT", productSchema);
export { Product };
