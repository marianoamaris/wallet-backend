/**
 * @swagger
 * components:
 *   schemas:
 *     CreateWalletDTO:
 *       type: object
 *       required:
 *         - name
 *         - balance
 *         - currency
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the wallet
 *         balance:
 *           type: number
 *           description: Initial balance of the wallet
 *         currency:
 *           type: string
 *           description: Currency code (e.g., USD, EUR)
 *
 *     UpdateWalletDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the wallet
 *         balance:
 *           type: number
 *           description: Current balance of the wallet
 *         currency:
 *           type: string
 *           description: Currency code (e.g., USD, EUR)
 *
 *     WalletResponseDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the wallet
 *         name:
 *           type: string
 *           description: Name of the wallet
 *         balance:
 *           type: number
 *           description: Current balance of the wallet
 *         currency:
 *           type: string
 *           description: Currency code (e.g., USD, EUR)
 *         userId:
 *           type: string
 *           description: ID of the wallet owner
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the wallet was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the wallet was last updated
 */

export interface WalletData {
  name: string;
  balance: number;
  currency: string;
}

export interface Wallet extends WalletData {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
