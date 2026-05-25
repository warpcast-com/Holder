import { NextResponse } from "next/server";
import { store } from "@/lib/inMemoryStore";

export async function GET() {
  try {
    const leaderboard = store.getLeaderboard(50);
    return NextResponse.json({
      ok: true,
      leaderboard: leaderboard.map((user) => ({
        walletAddress: user.walletAddress,
        points: user.points.toString(),
        totalVolumeUsd: user.totalVolumeUsd,
        totalTrades: user.totalTrades,
      })),
    });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}