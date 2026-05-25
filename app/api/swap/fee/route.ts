import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token") || "USDC";

    const fees: Record<string, { amount: number; decimals: number }> = {
      ETH: { amount: 0.02, decimals: 18 },
      USDC: { amount: 5, decimals: 6 },
      DEGEN: { amount: 1000, decimals: 18 },
      MORPHO: { amount: 10, decimals: 18 },
      VIRTUAL: { amount: 50, decimals: 18 },
      AERO: { amount: 100, decimals: 18 },
      BRETT: { amount: 500, decimals: 18 },
      TOSHI: { amount: 200, decimals: 18 },
    };

    const fee = fees[token];
    if (!fee) {
      return NextResponse.json({ ok: false, error: `Unknown token: ${token}` }, { status: 400 });
    }

    return NextResponse.json({ ok: true, token, amount: fee.amount, decimals: fee.decimals });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}