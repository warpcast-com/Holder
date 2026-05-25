"use client";

export default function PointsCard({ points = "0", trades = 0 }: { points?: string | number; trades?: number }) {
  return (
    <div className="p-6 bg-yellow-50 rounded-lg max-w-sm mx-auto shadow-lg">
      <h3 className="text-xl font-bold mb-2">⭐ Your Points</h3>
      <p className="text-3xl font-bold text-orange-600">{points}</p>
      <p className="text-sm text-gray-600 mt-2">Trades: {trades}</p>
    </div>
  );
}