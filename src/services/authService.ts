import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { AppError } from "../middleware/errorHandler";
import logger from "../utils/logger";
import { AuthDTO, AuthResponseDTO } from "../dtos/auth.dto";
import { tokenBlacklist } from "./tokenBlacklist";

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async signup(data: AuthDTO): Promise<AuthResponseDTO> {
    logger.info("Registration attempt", { email: data.email });

    const existingUser = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new AppError(400, "Email already in use");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = this.userRepository.create({
      email: data.email,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    const token = this.generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async signin(data: AuthDTO): Promise<AuthResponseDTO> {
    logger.info("Login attempt", { email: data.email });

    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (!user) {
      throw new AppError(401, "Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      throw new AppError(401, "Invalid credentials");
    }

    const token = this.generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  signout(token: string): void {
    logger.info("User signing out");
    tokenBlacklist.add(token);
  }

  isTokenBlacklisted(token: string): boolean {
    return tokenBlacklist.has(token);
  }

  private generateToken(userId: string): string {
    if (!process.env.JWT_SECRET) {
      throw new AppError(500, "JWT_SECRET not configured");
    }

    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
  }
}
