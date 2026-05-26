"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  specialty: string;
  patients: number;
  revenue: number;
  rating: number;
  score: number;
}

const rankIcons = [Trophy, Medal, Award];

export function Leaderboard({ data }: { data: LeaderboardEntry[] }) {
  return (
    <div className="space-y-2">
      {data.map((entry, i) => {
        const RankIcon = rankIcons[entry.rank - 1];
        return (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 transition-colors"
          >
            <div className="w-8 flex justify-center">
              {RankIcon ? (
                <RankIcon
                  className={`h-5 w-5 ${
                    entry.rank === 1
                      ? "text-amber-500"
                      : entry.rank === 2
                        ? "text-slate-400"
                        : "text-amber-700"
                  }`}
                />
              ) : (
                <span className="text-sm font-bold text-[var(--muted)]">#{entry.rank}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{entry.name}</p>
              <p className="text-xs text-[var(--muted)]">{entry.specialty}</p>
            </div>
            <div className="text-right text-xs">
              <p className="font-semibold">₹{entry.revenue} Cr</p>
              <p className="text-[var(--muted)]">{entry.patients} patients · ★{entry.rating}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
              {entry.score}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
