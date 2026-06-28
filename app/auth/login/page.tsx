"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    try {
      setLoading(true);
      setError("");
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push("/command-center");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-blue-500/20">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          
          {/* LEFT COLUMN: Main Form Entry */}
          <div className="space-y-8">
            <div className="rounded-3xl border bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <div>
                <div className="text-6xl mb-3">🧭</div>
                <p className="text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                  CURRENT RANK: EXPLORER
                </p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
                  Welcome Back Explorer
                </h1>
              </div>

              {/* Clean, Non-Squished XP HUD Metric Block */}
              <div className="mt-8 max-w-xl bg-neutral-950 rounded-2xl border border-neutral-800 p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm font-bold text-neutral-600 dark:text-neutral-300 mb-3">
                  <span>Rank Progress to Pathfinder</span>
                  <span className="text-blue-500 font-mono bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg border border-blue-100 dark:border-blue-900/30 text-xs">
                    ⚡ 37 XP Remaining
                  </span>
                </div>
                <div className="w-full h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: "63%" }}></div>
                </div>
              </div>

              <hr className="my-10 border-neutral-800" />

              {/* Spaced Form Fields using Classic RPG Wording */}
              <div className="space-y-6 max-w-xl">
                <div>
                  <label className="block text-xs font-bold text-neutral-400 dark:text-neutral-400 uppercase tracking-wider mb-2 px-0.5">
                    Player Email
                  </label>
                  <input
                    type="email"
                    placeholder="explorer@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border p-4 bg-neutral-950 text-base border-neutral-800 outline-none text-white placeholder:text-neutral-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-400 dark:text-neutral-400 uppercase tracking-wider mb-2 px-0.5">
                    Adventure Passkey
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border p-4 bg-neutral-950 text-base border-neutral-800 outline-none text-white placeholder:text-neutral-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {error && (
                <p className="mt-6 max-w-xl text-sm font-medium text-white bg-red-500/10 border border-red-500/40 p-3 rounded-xl">
                  ⚠️ {error}
                </p>
              )}

              {/* Action Operations */}
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full sm:w-auto rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-500 transition-colors disabled:opacity-50"
                >
                  {loading ? "Resuming Quest..." : "🚀 Continue Journey"}
                </button>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  New to the sector?{" "}
                  <button onClick={() => router.push("/auth/signup")} className="text-blue-500 font-semibold hover:underline">
                    Begin Journey
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar HUD Modules */}
          <div className="hidden lg:block">
            <div className="sticky top-8 space-y-6">
              
              {/* Mission Summary Replication widget */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
                <h3 className="font-bold flex items-center gap-2 mb-4 text-white">
                  📋 <span>Mission Summary</span>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-center">
                    <p className="text-3xl font-bold tracking-tight text-white">1</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Active Mission</p>
                  </div>
                  <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-center">
                    <p className="text-3xl font-bold tracking-tight text-orange-500">0</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Day Streak</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
                <h3 className="font-bold mb-3 text-white">🏆 XP Rewards</h3>
                <div className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <p>+10 XP Habit Complete</p>
                  <p>+100 XP Checkpoint Complete</p>
                  <p>+500 XP Mission Complete</p>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
                <h3 className="font-bold mb-3 text-white">🎖 Journey Ranks</h3>
                <div className="space-y-2 text-sm font-medium text-neutral-400">
                  <p className="text-blue-500 font-bold">Level 1 → Explorer</p>
                  <p className="dark:text-neutral-300">Level 5 → Pathfinder</p>
                  <p className="dark:text-neutral-300">Level 10 → Builder</p>
                  <p className="dark:text-neutral-300">Level 20 → Strategist</p>
                  <p className="dark:text-neutral-300">Level 30 → Architect</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}