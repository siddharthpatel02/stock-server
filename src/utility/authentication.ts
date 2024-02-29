import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "./errorHandling";
import { verifyToken } from "./tokenVerification";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

interface userRequest extends Request {
  user: { id: string };
}

const jwtAuthentication = async (req: userRequest, res: Response, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      if (req.path === "/auth") {
        return next(new UnauthorizedError("Authentication failed"));
      }
      return next(new UnauthorizedError("invalid"));
    }
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = await verifyToken(token);
    if (req.path === "/auth") {
      return res.status(201).json({
        status: true,
        data: [],
        message: "Authentication Successfully",
      });
    }

    req.user = { id: (decodedToken as TokenPayload).id };
    next();
  } catch (err) {
    if (req.path === "/auth") {
      return next(new UnauthorizedError("Authentication failed"));
    }
    return next(new UnauthorizedError());
  }
};

export { jwtAuthentication };
