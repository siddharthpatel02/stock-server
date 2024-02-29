import { Request } from "express";

interface UserRequest extends Request {
  user: any;
}
export { UserRequest };
