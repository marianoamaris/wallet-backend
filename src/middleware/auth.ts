import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../types/custom";
import { AppError } from "./errorHandler";
import { AuthService } from "../services/authService";

const authService = new AuthService();

export const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    throw new AppError(401, "Authentication required");
  }

  if (authService.isTokenBlacklisted(token)) {
    throw new AppError(401, "Token has been invalidated");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    req.userId = decoded.userId;
    // Store token for potential signout
    req.token = token;
    next();
  } catch (error) {
    throw new AppError(403, "Invalid token");
  }
};
