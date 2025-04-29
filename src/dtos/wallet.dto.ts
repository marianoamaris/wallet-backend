export type Chain = "Bitcoin" | "Ethereum" | "Polygon" | "Binance Smart Chain";

export interface CreateWalletDTO {
  tag?: string;
  chain: Chain;
  address: string;
}

export interface WalletResponseDTO {
  id: string;
  tag?: string;
  chain: Chain;
  address: string;
  userId: string;
}

export interface UpdateWalletDTO {
  tag?: string;
  chain?: Chain;
  address?: string;
}
