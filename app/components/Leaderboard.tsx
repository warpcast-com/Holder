"use client";

import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/leaderboard").then(r => r.json()).then(json => setData(json.leaderboard || []));
  }, []);

  return (
    <div className="p-6 bg-purple-50 rounded-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🏆 Leaderboard</h2>
      {data.length === 0 && <p className="text-gray-600">No trades yet</p>}
      {data.map((u, i) => (
        <div key={u.walletAddress} className="p-3 bg-white rounded flex justify-between mb-2 hover:shadow-md">
          <span><strong>#{i + 1}</strong> {u.walletAddress.slice(0, 6)}...{u.walletAddress.slice(-4)}</span>
          <span className="font-bold">{u.points} pts</span>
        </div>
      ))}
    </div>
  );
}