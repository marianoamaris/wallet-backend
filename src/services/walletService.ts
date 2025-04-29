import { AppDataSource } from "../config/database";
import { Wallet } from "../entities/Wallet";
import { User } from "../entities/User";
import { AppError } from "../middleware/errorHandler";
import logger from "../utils/logger";

interface WalletData {
  tag?: string;
  chain: string;
  address: string;
}

export class WalletService {
  private walletRepository = AppDataSource.getRepository(Wallet);
  private userRepository = AppDataSource.getRepository(User);

  async createWallet(userId: string, walletData: WalletData): Promise<Wallet> {
    logger.info("Creating wallet", { userId, ...walletData });

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new AppError(404, "User not found");
    }

    const existingWallet = await this.walletRepository.findOne({
      where: { address: walletData.address },
    });
    if (existingWallet) {
      throw new AppError(400, "Wallet address already exists");
    }

    const wallet = this.walletRepository.create({
      ...walletData,
      userId: user.id,
    });

    await this.walletRepository.save(wallet);
    return wallet;
  }

  async getUserWallets(userId: string): Promise<Wallet[]> {
    logger.info("Fetching user wallets", { userId });

    return this.walletRepository.find({
      where: { userId },
    });
  }

  async getWalletById(userId: string, walletId: string): Promise<Wallet> {
    logger.info("Fetching wallet by ID", { userId, walletId });

    const wallet = await this.walletRepository.findOne({
      where: { id: walletId, userId },
    });

    if (!wallet) {
      throw new AppError(404, "Wallet not found");
    }

    return wallet;
  }

  async updateWallet(
    userId: string,
    walletId: string,
    walletData: WalletData
  ): Promise<Wallet> {
    logger.info("Updating wallet", { userId, walletId, ...walletData });

    const wallet = await this.getWalletById(userId, walletId);

    if (walletData.address !== wallet.address) {
      const existingWallet = await this.walletRepository.findOne({
        where: { address: walletData.address },
      });
      if (existingWallet) {
        throw new AppError(400, "Wallet address already exists");
      }
    }

    Object.assign(wallet, walletData);
    await this.walletRepository.save(wallet);

    return wallet;
  }

  async deleteWallet(userId: string, walletId: string): Promise<Wallet> {
    logger.info("Deleting wallet", { userId, walletId });

    const wallet = await this.getWalletById(userId, walletId);
    await this.walletRepository.remove(wallet);

    return wallet;
  }
}
