import TradeSection from "./components/TradeSection";
import Leaderboard from "./components/Leaderboard";
import PointsCard from "./components/PointsCard";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">🚀 Mini Swap App</h1>
          <p className="text-gray-400">Trade with fees and earn points on Farcaster</p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2"><TradeSection /></div>
          <div><PointsCard /></div>
        </div>
        <Leaderboard />
      </div>
    </main>
  );
}