"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { BASE_TOKENS, TokenKey, ERC20_ABI, ROUTER_ABI, isNativeToken } from "@/lib/web3";

const FEE_RECIPIENT = process.env.NEXT_PUBLIC_FEE_RECIPIENT || "0x3dbD0ffbAAAFaDd11f0B0190b6830b00F8071B60";
const ROUTER_ADDRESS = process.env.NEXT_PUBLIC_ROUTER_ADDRESS || "0xYourDeployedRouterAddress";

export default function TradeSection() {
  const [account, setAccount] = useState("");
  const [sellToken, setSellToken] = useState<TokenKey>("ETH");
  const [buyToken, setBuyToken] = useState<TokenKey>("USDC");
  const [amount, setAmount] = useState("");
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const connect = async () => {
    try {
      if (!window.ethereum) throw new Error("Wallet not found");
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      setAccount(await signer.getAddress());
    } catch (err: any) {
      setError(err.message);
    }
  };

  const getQuote = async () => {
    if (!amount || !account) return;
    try {
      setLoading(true);
      const sell = BASE_TOKENS[sellToken];
      const sellAmountWei = ethers.parseUnits(amount, sell.decimals).toString();

      const res = await fetch("/api/swap/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sellToken: sell.address,
          buyToken: BASE_TOKENS[buyToken].address,
          sellAmount: sellAmountWei,
          takerAddress: account,
        }),
      });

      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      setQuote(json.quote);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-blue-50 rounded-lg space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Swap</h2>
      {error && <div className="text-red-600">{error}</div>}
      {!account ? (
        <button onClick={connect} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Connect Wallet
        </button>
      ) : (
        <>
          <select value={sellToken} onChange={(e) => setSellToken(e.target.value as TokenKey)} className="w-full p-2 border rounded">
            {Object.keys(BASE_TOKENS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="w-full p-2 border rounded" />
          <select value={buyToken} onChange={(e) => setBuyToken(e.target.value as TokenKey)} className="w-full p-2 border rounded">
            {Object.keys(BASE_TOKENS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
          <button onClick={getQuote} disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400">
            {loading ? "Loading..." : "Get Quote"}
          </button>
          {quote && <p className="text-green-600">Quote received!</p>}
        </>
      )}
    </div>
  );
}