import { Console } from "console";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("database connected successfully");
  } catch (err) {
    console.log(err);
  }
};

export { connectDB };
