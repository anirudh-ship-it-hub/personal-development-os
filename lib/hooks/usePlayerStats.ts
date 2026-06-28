"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toLocalDate(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function usePlayerStats() {
  const [totalXP, setTotalXP] = useState(0);
  const [perfectDays, setPerfectDays] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setEmail(user.email ?? null);

      const { data: xpLogs, error: xpError } = await supabase
        .from("xp_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (xpError) {
        console.error(xpError);
        return;
      }

      const xpTotal =
        xpLogs?.reduce((sum, row) => sum + (row.xp_earned || 0), 0) || 0;
      const perfectDayCount =
        xpLogs?.filter((row) => row.source === "perfect_day").length || 0;

      setTotalXP(xpTotal);
      setPerfectDays(perfectDayCount);

      const { data: streakLogs, error: streakError } = await supabase
        .from("habit_logs")
        .select("log_date")
        .eq("status", "completed")
        .order("log_date", { ascending: false });

      if (streakError) {
        console.error(streakError);
        return;
      }

      const uniqueDates = [
        ...new Set(streakLogs?.map((log) => log.log_date) || []),
      ];

      let currentStreak = 0;
      const today = new Date();

      for (let i = 0; i < uniqueDates.length; i++) {
        const expected = toLocalDate(
          new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)
        );

        if (uniqueDates.includes(expected)) {
          currentStreak++;
        } else {
          break;
        }
      }

      setStreak(currentStreak);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const level = Math.floor(totalXP / 100) + 1;

  return { totalXP, perfectDays, streak, level, loading, email };
}
