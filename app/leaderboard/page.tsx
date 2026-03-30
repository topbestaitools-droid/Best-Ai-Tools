import { prisma } from "@/lib/prisma";

export default async function LeaderboardPage() {
  // TODO: Replace with actual DB query
  const leaderboard = [
    { rank: 1, name: "Sarah Chen", points: 1250, level: 8, badges: 12 },
    { rank: 2, name: "Alex Rodriguez", points: 980, level: 7, badges: 9 },
    { rank: 3, name: "Jordan Smith", points: 856, level: 6, badges: 8 },
    { rank: 4, name: "Morgan Lee", points: 742, level: 5, badges: 7 },
    { rank: 5, name: "Casey Taylor", points: 631, level: 5, badges: 6 }
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Leaderboard</h1>
        <p className="mt-1 text-muted">Top contributors to the AIAdvisor community</p>
      </header>

      <div className="rounded-2xl border border-border bg-panel p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-sm text-muted">
              <th className="pb-3 px-3">Rank</th>
              <th className="pb-3 px-3">User</th>
              <th className="pb-3 px-3">Points</th>
              <th className="pb-3 px-3">Level</th>
              <th className="pb-3 px-3">Badges</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user) => (
              <tr key={user.rank} className="border-b border-border/50 text-sm hover:bg-bg transition">
                <td className="py-3 px-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 border border-primary/40 font-semibold text-accent">
                    {user.rank}
                  </span>
                </td>
                <td className="py-3 px-3 font-semibold">{user.name}</td>
                <td className="py-3 px-3 text-primary font-semibold">{user.points}</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-primary/15 border border-primary/30">
                    Lvl {user.level}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span>{user.badges}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="rounded-2xl border border-border bg-panel p-6">
        <h2 className="text-xl font-semibold mb-4">How to Climb the Leaderboard</h2>
        <div className="space-y-3">
          {[
            { action: "Write a review", points: 10 },
            { action: "Reply to discussion", points: 5 },
            { action: "Create a collection", points: 20 },
            { action: "Find trending tool", points: 50 },
            { action: "Reach 100 followers", points: 100 }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-bg border border-border/50">
              <span>{item.action}</span>
              <span className="text-primary font-semibold">+{item.points} pts</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
