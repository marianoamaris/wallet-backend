import { z } from "zod";

export const walletSchema = z.object({
  body: z.object({
    tag: z.string().optional(),
    chain: z
      .string()
      .refine(
        (chain) =>
          ["Bitcoin", "Ethereum", "Polygon", "Binance Smart Chain"].includes(
            chain
          ),
        "Invalid blockchain. Supported chains: Bitcoin, Ethereum, Polygon, Binance Smart Chain"
      ),
    address: z.string().refine((address) => {
      // Ethereum, Polygon, BSC address format
      if (address.startsWith("0x")) {
        return /^0x[a-fA-F0-9]{40}$/.test(address);
      }
      // Bitcoin address format
      if (
        address.startsWith("bc1") ||
        address.startsWith("1") ||
        address.startsWith("3")
      ) {
        return /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/.test(address);
      }
      return false;
    }, "Invalid blockchain address format"),
  }),
});

export const walletUpdateSchema = walletSchema;

export const walletIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid wallet ID"),
  }),
});
