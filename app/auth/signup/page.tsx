"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const PRESETS = [
  { id: "health", label: "🏋️ Health", text: "This mission is about optimizing raw physical energy, boosting daily stamina, and reclaiming core health. By training consistently, you will build a disciplined body ready to sustain long-term ambitions." },
  { id: "career", label: "🚀 Career", text: "This mission is about accelerating professional trajectories, mastering critical domain skills, and seizing high-impact projects. By executing tasks deliberately, you turn raw ambition into measurable marketplace leverage." },
  { id: "finance", label: "💰 Finance", text: "This mission is about constructing bulletproof financial systems, mastering asset allocation, and removing baseline resource anxiety. By monitoring targets aggressively, you design complete personal sovereignty." },
  { id: "mindset", label: "🧠 Mindset", text: "This mission is about reducing stress and improving mindfulness to build a calmer mindset. By achieving this, you'll be able to handle life's challenges with greater ease and clarity." },
  { id: "relationships", label: "❤️ Relationships", text: "This mission is about forging deep relational bonds, building radical communication habits, and anchoring a core support tribe. By committing intentional energy, you build authentic lifelong alignments." },
];

export default function SignupPage() {
  const router = useRouter();
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[3]); // Default to Mindset
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup() {
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            starting_mission_focus: selectedPreset.id,
            current_rank: "Explorer",
          }
        }
      });

      if (error) throw error;
      router.push("/mission-builder");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-blue-500/20">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          
          {/* LEFT COLUMN: Main Form Entry */}
          <div className="space-y-8">
            <div className="rounded-3xl border bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-6xl mb-3">⚔️</div>
                  <p className="text-sm font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                    HERO CREATION
                  </p>
                  <h1 className="mt-2 text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Begin Your Adventure
                  </h1>
                </div>
                <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  🌱 Level 1 Character
                </div>
              </div>

              <p className="mt-4 text-neutral-600 dark:text-neutral-300 max-w-xl">
                The person you want to become is one campaign away. Your Quest Guide will help transform your ambition into a dynamic training template.
              </p>

              {/* Dynamic Mission Box Statement */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                  Your Primary Adventure Target
                </label>
                <div className="w-full min-h-[100px] rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {selectedPreset.text}
                </div>
              </div>

              {/* Clean, Consistent Grid Selection Blocks (Fixed dark bg contrast errors from image_267ec5.png) */}
              <div className="mt-6">
                <h3 className="text-sm font-bold tracking-tight text-neutral-400 dark:text-neutral-400 uppercase mb-3">
                  Need Inspiration? Select a track below:
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {PRESETS.map((preset) => {
                    const isSelected = selectedPreset.id === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setSelectedPreset(preset)}
                        className={`rounded-xl border p-4 text-left transition-all text-sm font-bold tracking-wide outline-none ${
                          isSelected
                            ? "border-blue-600 bg-blue-600 text-white dark:bg-blue-600 dark:text-white ring-2 ring-blue-500/30"
                            : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:bg-blue-600 dark:hover:text-white dark:hover:border-blue-600"
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Profile Identity Credentials Block */}
            <div className="rounded-3xl border bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">Account Credentials</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5 px-0.5">Player Email</label>
                  <input
                    type="email"
                    placeholder="adventurer@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border p-4 bg-neutral-50 dark:bg-neutral-950 text-base border-neutral-200 dark:border-neutral-800 outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5 px-0.5">Adventure Passkey</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border p-4 bg-neutral-50 dark:bg-neutral-950 text-base border-neutral-200 dark:border-neutral-800 outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5 px-0.5">Confirm Passkey</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border p-4 bg-neutral-50 dark:bg-neutral-950 text-base border-neutral-200 dark:border-neutral-800 outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {error && (
                <p className="mt-4 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 p-3 rounded-xl">
                  ⚠️ {error}
                </p>
              )}

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={handleSignup}
                  disabled={loading}
                  className="w-full sm:w-auto rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-500 transition-colors disabled:opacity-50"
                >
                  {loading ? "Registering Hero..." : "🚀 Complete Registration"}
                </button>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Already tracking a journey?{" "}
                  <button onClick={() => router.push("/auth/login")} className="text-blue-500 font-semibold hover:underline">
                    Continue Journey
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar HUD Modules */}
          <div>
            <div className="sticky top-8 space-y-6">
              <div className="rounded-2xl border bg-gradient-to-br from-blue-500/10 to-violet-500/10 p-6 border-neutral-200 dark:border-neutral-800">
                <h3 className="text-xl font-bold flex items-center gap-2 text-neutral-900 dark:text-white">
                  🧭 <span>Your Quest Guide</span>
                </h3>
                <p className="mt-4 text-sm leading-7 text-neutral-500 dark:text-neutral-400">
                  Every meaningful transformation starts with a single mission. This system isn't designed around achieving toxic flawlessness. It is built to gain continuous momentum through actions repeated systematically.
                </p>
              </div>

              <div className="rounded-2xl border bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <h3 className="font-bold mb-3 text-neutral-900 dark:text-white">🏆 XP System Breakdown</h3>
                <div className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <p className="flex justify-between"><span>Daily Task Complete:</span> <span className="font-bold text-neutral-800 dark:text-neutral-200">+10 XP</span></p>
                  <p className="flex justify-between"><span>Weekly Checkpoint:</span> <span className="font-bold text-neutral-800 dark:text-neutral-200">+100 XP</span></p>
                  <p className="flex justify-between"><span>Quest Completed:</span> <span className="font-bold text-neutral-800 dark:text-neutral-200">+500 XP</span></p>
                </div>
              </div>

              <div className="rounded-2xl border bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <h3 className="font-bold mb-3 text-neutral-900 dark:text-white">🎖 Journey Progression</h3>
                <div className="space-y-2 text-sm font-medium text-neutral-400">
                  <p className="text-blue-500 font-bold flex items-center justify-between">
                    <span>Level 1 → Explorer</span>
                    <span className="text-[10px] bg-blue-100 dark:bg-blue-950 px-2 py-0.5 rounded-full uppercase">Current</span>
                  </p>
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