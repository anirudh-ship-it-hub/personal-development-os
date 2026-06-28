"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Journey {
  id: string;
  title: string;
  description?: string;
  project_type: string;
  xp_reward?: number;
  created_at?: string;
}

export default function JourneyPage() {
  const router = useRouter();
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJourneys();
  }, []);

  async function loadJourneys() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("projects")
        .select("id, title, description, project_type, xp_reward, created_at")
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setJourneys(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-neutral-400">Loading journeys...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          🧭 Journey
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Your active adventures
        </p>
      </header>

      {journeys.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-700 py-16 text-center">
          <p className="text-5xl">🚀</p>
          <h2 className="mt-4 text-xl font-bold text-white">
            No journeys yet
          </h2>
          <p className="mt-2 max-w-xs text-sm text-neutral-500">
            Create your first mission and start earning XP, building streaks, and unlocking new ranks.
          </p>
          <button
            onClick={() => router.push("/mission-builder")}
            className="btn-touch mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
          >
            ⚔️ Create New Journey
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-500">
              {journeys.length} active {journeys.length === 1 ? "journey" : "journeys"}
            </p>
            <button
              onClick={() => router.push("/mission-builder")}
              className="rounded-lg border border-blue-500/30 px-4 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500/10"
            >
              + New Journey
            </button>
          </div>

          {journeys.map((journey) => (
            <div
              key={journey.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-white">
                    ⚔️ {journey.title}
                  </p>
                  {journey.description && (
                    <p className="mt-1 text-sm text-neutral-500 line-clamp-2">
                      {journey.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm">
                <span className="rounded-full bg-blue-950 px-3 py-1 text-xs font-medium text-blue-400">
                  {journey.project_type?.replace("_", " ") || "Growth"}
                </span>
                {journey.xp_reward && (
                  <span className="text-xs text-amber-400">
                    +{journey.xp_reward} XP
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
