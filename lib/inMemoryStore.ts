interface Trade {
  id: string;
  walletAddress: string;
  sellToken: string;
  buyToken: string;
  sellAmount: string;
  buyAmount: string;
  feeAmount: string;
  volumeUsd: number;
  txHash: string;
  tradeId: string;
  pointsEarned: bigint;
  createdAt: Date;
}

interface User {
  walletAddress: string;
  points: bigint;
  totalVolumeUsd: number;
  totalTrades: number;
  lastTradeAt: Date | null;
  createdAt: Date;
}

class InMemoryStore {
  private trades: Map<string, Trade> = new Map();
  private users: Map<string, User> = new Map();
  private tradeCounter = 0;

  createTrade(data: Omit<Trade, 'id' | 'createdAt'>): Trade {
    const trade: Trade = {
      ...data,
      id: `trade_${++this.tradeCounter}`,
      createdAt: new Date(),
    };
    this.trades.set(trade.txHash, trade);
    return trade;
  }

  getTrade(txHash: string): Trade | undefined {
    return this.trades.get(txHash);
  }

  getLeaderboard(limit = 50): User[] {
    return Array.from(this.users.values())
      .sort((a, b) => {
        if (b.points !== a.points) return Number(b.points - a.points);
        if (b.totalVolumeUsd !== a.totalVolumeUsd) return b.totalVolumeUsd - a.totalVolumeUsd;
        return b.totalTrades - a.totalTrades;
      })
      .slice(0, limit);
  }

  upsertUser(walletAddress: string, updates: Partial<User>): User {
    let user = this.users.get(walletAddress);
    if (!user) {
      user = {
        walletAddress,
        points: BigInt(0),
        totalVolumeUsd: 0,
        totalTrades: 0,
        lastTradeAt: null,
        createdAt: new Date(),
      };
    }
    if (updates.points !== undefined) user.points = updates.points;
    if (updates.totalVolumeUsd !== undefined) user.totalVolumeUsd = updates.totalVolumeUsd;
    if (updates.totalTrades !== undefined) user.totalTrades = updates.totalTrades;
    if (updates.lastTradeAt !== undefined) user.lastTradeAt = updates.lastTradeAt;
    this.users.set(walletAddress, user);
    return user;
  }

  getUser(walletAddress: string): User | undefined {
    return this.users.get(walletAddress);
  }
}

export const store = new InMemoryStore();