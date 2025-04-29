import express from "express";
import rateLimit from "express-rate-limit";
import { AuthService } from "../services/authService";
import { validateRequest } from "../middleware/validateRequest";
import { userSchema } from "../schemas/auth.schema";
import { CustomRequest } from "../types/custom";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();
const authService = new AuthService();

// Rate limiter configuration for login route only
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful attempts
});

router.post(
  "/register",
  validateRequest(userSchema),
  async (req: CustomRequest, res, next) => {
    try {
      const result = await authService.signup(req.body);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  loginLimiter, // Apply rate limiting only to login route
  validateRequest(userSchema),
  async (req: CustomRequest, res, next) => {
    try {
      const result = await authService.signin(req.body);
      res.json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/signout", authenticateToken, (req: CustomRequest, res) => {
  if (req.token) {
    authService.signout(req.token);
  }
  res.json({
    success: true,
    message: "Successfully signed out",
  });
});

export default router;
