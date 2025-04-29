import express from "express";
import { WalletService } from "../services/walletService";
import { validateRequest } from "../middleware/validateRequest";
import { walletSchema } from "../schemas/wallet.schema";
import { CustomRequest } from "../types/custom";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();
const walletService = new WalletService();

router.get("/", authenticateToken, async (req: CustomRequest, res, next) => {
  try {
    const wallets = await walletService.getUserWallets(req.userId!);
    res.json({
      success: true,
      data: wallets,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authenticateToken, async (req: CustomRequest, res, next) => {
  try {
    const wallet = await walletService.getWalletById(
      req.userId!,
      req.params.id
    );
    res.json({
      success: true,
      data: wallet,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  authenticateToken,
  validateRequest(walletSchema),
  async (req: CustomRequest, res, next) => {
    try {
      const wallet = await walletService.createWallet(req.userId!, req.body);
      res.status(201).json({
        success: true,
        data: wallet,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  authenticateToken,
  validateRequest(walletSchema),
  async (req: CustomRequest, res, next) => {
    try {
      const wallet = await walletService.updateWallet(
        req.userId!,
        req.params.id,
        req.body
      );
      res.json({
        success: true,
        data: wallet,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  authenticateToken,
  async (req: CustomRequest, res, next) => {
    try {
      await walletService.deleteWallet(req.userId!, req.params.id);
      res.json({
        success: true,
        message: "Wallet deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
