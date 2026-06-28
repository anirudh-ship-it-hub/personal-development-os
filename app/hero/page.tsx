"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { usePlayerStats } from "@/lib/hooks/usePlayerStats";
import { useTheme } from "@/components/ThemeProvider";

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}

export default function HeroPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { totalXP, perfectDays, streak, level, loading, email } =
    usePlayerStats();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/auth/login");
  }

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-neutral-400">Loading Hero...</p>
      </main>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Hero
        </h1>
        {email && (
          <p className="mt-2 text-sm text-neutral-400">
            {email}
          </p>
        )}
      </header>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Stats
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Level" value={level} />
          <StatCard label="Total XP" value={totalXP} />
          <StatCard label="Streak" value={streak} />
          <StatCard label="Perfect Days" value={perfectDays} />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Appearance
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`btn-touch flex min-h-[52px] items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold ${
              theme === "dark"
                ? "border-blue-500 bg-blue-500/15 text-blue-400"
                : "border-neutral-800 bg-neutral-900 text-neutral-300"
            }`}
          >
            🌙 Dark Theme
          </button>
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`btn-touch flex min-h-[52px] items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold ${
              theme === "light"
                ? "border-blue-500 bg-blue-500/15 text-blue-400"
                : "border-neutral-800 bg-neutral-900 text-neutral-300"
            }`}
          >
            ☀️ Light Theme
          </button>
        </div>
      </section>

      <button
        type="button"
        onClick={handleLogout}
        className="btn-touch flex min-h-[52px] w-full items-center justify-center rounded-xl border border-red-500/40 bg-red-500/10 text-base font-semibold text-red-400 hover:bg-red-500/20"
      >
        Logout
      </button>
    </div>
  );
}
