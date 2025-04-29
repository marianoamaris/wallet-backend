import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { AppDataSource } from "./config/database";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/auth";
import walletRoutes from "./routes/wallet";
import logger from "./utils/logger";

dotenv.config();

export const app = express();
const port = process.env.PORT || 3000;

// Global rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    success: false,
    message: "Too many requests. Please try again after 15 minutes.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Middleware
app.use(limiter);
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/wallets", walletRoutes);

// Error handling
app.use(errorHandler);

// Initialize database connection
const startServer = async () => {
  try {
    await AppDataSource.initialize();
    logger.info("Database connection established");

    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  } catch (error) {
    logger.error("Error during server initialization:", error);
    process.exit(1);
  }
};

// Only start the server if this file is being run directly
if (require.main === module) {
  startServer();
}
