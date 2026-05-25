import { NextResponse } from "next/server";
import { store } from "@/lib/inMemoryStore";
import { calculatePoints } from "@/lib/scoring";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { walletAddress, sellToken, buyToken, sellAmount, buyAmount, feeAmount, volumeUsd, txHash, tradeId } = body;

    if (!walletAddress || !txHash || !tradeId) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const existingTrade = store.getTrade(txHash);
    if (existingTrade) {
      return NextResponse.json({ ok: true, trade: existingTrade }, { status: 200 });
    }

    const pointsEarned = calculatePoints(Number(volumeUsd));

    const trade = store.createTrade({
      walletAddress,
      sellToken,
      buyToken,
      sellAmount: String(sellAmount),
      buyAmount: String(buyAmount),
      feeAmount: String(feeAmount),
      volumeUsd: Number(volumeUsd),
      txHash,
      tradeId,
      pointsEarned,
    });

    const currentUser = store.getUser(walletAddress);
    store.upsertUser(walletAddress, {
      points: (currentUser?.points || BigInt(0)) + pointsEarned,
      totalVolumeUsd: (currentUser?.totalVolumeUsd || 0) + Number(volumeUsd),
      totalTrades: (currentUser?.totalTrades || 0) + 1,
      lastTradeAt: new Date(),
    });

    return NextResponse.json({ ok: true, trade });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}