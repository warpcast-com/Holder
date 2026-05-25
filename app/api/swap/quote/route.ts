import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sellToken, buyToken, sellAmount, takerAddress } = body;

    if (!sellToken || !buyToken || !sellAmount) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.ZEROX_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ ok: false, error: "Missing ZEROX_API_KEY" }, { status: 500 });
    }

    const url = new URL("https://base.api.0x.org/swap/v1/quote");
    url.searchParams.set("sellToken", sellToken);
    url.searchParams.set("buyToken", buyToken);
    url.searchParams.set("sellAmount", sellAmount);
    if (takerAddress) url.searchParams.set("takerAddress", takerAddress);

    const res = await fetch(url.toString(), {
      headers: { "0x-api-key": apiKey },
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: data?.message || "0x quote failed" }, { status: res.status });
    }

    return NextResponse.json({ ok: true, quote: data });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}