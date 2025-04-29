// Singleton para manejar la lista negra de tokens
class TokenBlacklist {
  private static instance: TokenBlacklist;
  private blacklistedTokens: Set<string> = new Set();

  private constructor() {}

  public static getInstance(): TokenBlacklist {
    if (!TokenBlacklist.instance) {
      TokenBlacklist.instance = new TokenBlacklist();
    }
    return TokenBlacklist.instance;
  }

  public add(token: string): void {
    this.blacklistedTokens.add(token);
  }

  public has(token: string): boolean {
    return this.blacklistedTokens.has(token);
  }

  public remove(token: string): void {
    this.blacklistedTokens.delete(token);
  }

  public clear(): void {
    this.blacklistedTokens.clear();
  }
}

export const tokenBlacklist = TokenBlacklist.getInstance();
