import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

interface userType extends Document {
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  type: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name required"] },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "require email id"],
    validate: {
      validator: function (value: any) {
        return validator.isEmail(value);
      },
      message: "email is not valid",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [10, "password is too short"],
  },
  confirmPassword: {
    type: String,
    required: true,
    enum: ["admin,:employee"],
    validate: {
      validator: function (value: string) {
        return this.password === value;
      },
      message: "password do not match",
    },
  },
  type: { type: String, enum: ["admin", "client"], required: true },
});
userSchema.pre("save", async function (next) {
  const encryption = await bcrypt.hash(this.password, 8);
  this.password = encryption;
  this.confirmPassword = null;
  next();
});
userSchema.method(
  "comparePassword",
  async function (password: string): Promise<boolean> {
    try {
      const isPAsswordValid = await bcrypt.compare(password, this.password);
      return isPAsswordValid;
    } catch (err) {
      throw new Error(err);
    }
  }
);

const User = mongoose.model<userType>("USER", userSchema);

export { User };

// handle user type at front hand //
