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
