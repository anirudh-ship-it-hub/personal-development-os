"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface XpLog {
  id: string;
  xp_earned: number;
  source: string;
  created_at: string;
}

export default function CommandCenterPage() {
  const router = useRouter();
  const [journeys, setJourneys] = useState<any[]>([]);
const [todayQuests, setTodayQuests] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [perfectDays, setPerfectDays] = useState(0);
  const [recentActivity, setRecentActivity] = useState<XpLog[]>([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const toLocalDate = (d: Date) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  async function loadStats() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;
      const { data: projects, error: projectsError } =
  await supabase
    .from("projects")
    .select(`
      id,
      title,
      focus_areas (
        id,
        habits (
          id,
          active
        )
      )
    `)
    .eq("user_id", user.id)
    .eq("status", "active");
    if (projectsError) {
      console.error(projectsError);
    }
    setJourneys(projects || []);
    const [journeys, setJourneys] =
  useState<any[]>([]);

      // Single xp_logs fetch — derive everything from it
      const { data: xpLogs, error: xpError } = await supabase
        .from("xp_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (xpError) {
        console.error(xpError);
        return;
      }

      const xpTotal = xpLogs?.reduce((sum, row) => sum + (row.xp_earned || 0), 0) || 0;
      const perfectDayCount = xpLogs?.filter((row) => row.source === "perfect_day").length || 0;
      const recent = xpLogs?.slice(0, 10) || [];

      setTotalXP(xpTotal);
      setPerfectDays(perfectDayCount);
      setRecentActivity(recent);

      // Streak — separate habit_logs query, local date to avoid UTC shift
      const { data: streakLogs, error: streakError } = await supabase
        .from("habit_logs")
        .select("log_date")
        .eq("status", "completed")
        .order("log_date", { ascending: false });

      if (streakError) {
        console.error(streakError);
        return;
      }

      const uniqueDates = [...new Set(streakLogs?.map((log) => log.log_date) || [])];

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
  const nextLevelXP = level * 100;
  const xpIntoCurrentLevel = totalXP % 100;
  const progressPercent = (xpIntoCurrentLevel / 100) * 100;

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-950">
        <p className="text-white">
          Loading Command Center...
        </p>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
  
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
  
          {/* LEFT SIDE */}
          <div>
  
            {/* HERO */}
            <h1 className="text-6xl font-bold text-white">
  🏰 Command Center
</h1>

<p className="mt-6 text-5xl font-bold text-blue-400">
  Explorer
</p>

<p className="mt-2 text-neutral-400">
  Level {level}
</p>

<p className="mt-4 text-neutral-400 leading-7">
  Build momentum.
  Earn XP.
  Become who you're trying to become.
</p>

<p className="mt-4 text-lg text-amber-400 font-medium">
  {100 - xpIntoCurrentLevel} XP until Level {level + 1}
</p>
<div
  className="
    mt-8
    rounded-3xl
    border
    border-amber-500/30
    bg-gradient-to-r
    from-amber-950/20
    to-orange-950/20
    p-8
  "
>
  <p className="font-semibold text-amber-400">
    🏆 NEXT MILESTONE
  </p>

  <p className="mt-3 text-3xl font-bold text-white">
    Reach Level {level + 1}
  </p>

  <p className="mt-3 text-neutral-400">
    Earn 100 XP to unlock your next rank.
  </p>

  <p className="mt-4 text-amber-300">
    Reward: Pathfinder Rank
  </p>
</div>
<div
  className="
    mt-8
    rounded-3xl
    border
    border-blue-500/30
    bg-gradient-to-r
    from-blue-950/40
    to-violet-950/40
    p-8
  "
>

  <p className="font-semibold text-blue-400">
    ⚔️ TODAY'S MISSION
  </p>

  <p className="mt-3 text-3xl font-bold text-white">
    Complete all active quests
  </p>

  <p className="
mt-8
rounded-3xl
border
border-blue-500/30
bg-gradient-to-r
from-blue-950/40
to-violet-950/40
p-8
">
    Earn a Perfect Day and unlock
    +50 Bonus XP.
  </p>

</div>
            {/* STATS */}
            <div className="mt-8 rounded-3xl border bg-neutral-900 p-8">

<p className="font-semibold text-blue-400">
  ⚡ CHARACTER STATS
</p>

<div className="mt-8 grid grid-cols-4 gap-6">

  <div className="text-center">
    <p className="text-xs text-neutral-500">
      LEVEL
    </p>

    <p className="mt-2 text-4xl font-bold text-white">
      {level}
    </p>
  </div>

  <div className="text-center">
    <p className="text-xs text-neutral-500">
      XP
    </p>

    <p className="mt-2 text-4xl font-bold text-emerald-400">
      {totalXP}
    </p>
  </div>

  <div className="text-center">
    <p className="text-xs text-neutral-500">
      STREAK
    </p>

    <p className="mt-2 text-4xl font-bold text-orange-400">
      {streak}
    </p>
  </div>

  <div className="text-center">
    <p className="text-xs text-neutral-500">
      PERFECT DAYS
    </p>

    <p className="mt-2 text-4xl font-bold text-amber-400">
      {perfectDays}
    </p>
  </div>

</div>

</div>
            {/* XP PROGRESS */}
  
            <div className="mt-8 rounded-2xl border bg-neutral-900 p-6">
  
            <div className="flex items-center justify-between">

<div>

  <p className="font-semibold text-amber-400">
    ⭐ CHARACTER PROGRESSION
  </p>

</div>

<p className="text-sm text-neutral-500">
  {xpIntoCurrentLevel} / 100 XP
</p>

</div>
  
              <div className="mt-4 h-3 rounded-full bg-neutral-800">
  
                <div
                  className="h-3 rounded-full bg-blue-500"
                  style={{
                    width: `${progressPercent}%`,
                  }}
                />
  
              </div>
  
              <p className="mt-2 text-sm text-neutral-500">
                {xpIntoCurrentLevel} XP Until Pathfinder
              </p>
  
            </div>
            <div className="mt-8 rounded-2xl border bg-neutral-900 p-6">

<p className="font-semibold text-blue-400">
  🎯 CURRENT CAMPAIGN
</p>

<p className="mt-4 text-2xl font-bold text-white">
  Complete all active quests
</p>

<p className="mt-3 text-neutral-400">
  Finish every quest today to earn a Perfect Day.
</p>

<div className="mt-6 flex items-center justify-between">

  <span className="text-neutral-400">
    Reward
  </span>

  <span className="font-semibold text-amber-400">
    +50 XP
  </span>

</div>

</div>
            {/* JOURNEY MOMENTUM */}
            {journeys.length === 0 ? (

<div
  className="
    mt-8
    rounded-3xl
    border
    border-dashed
    border-blue-500/30
    bg-blue-950/10
    p-10
    text-center
  "
>

  <p className="text-5xl">
    🚀
  </p>

  <h2 className="mt-4 text-2xl font-bold text-white">
    No Active Journeys
  </h2>

  <p className="mt-3 text-neutral-400">
    Create your first mission and begin earning XP,
    building streaks and unlocking new ranks.
  </p>

  <button
    onClick={() => router.push("/mission-builder")}
    className="
      mt-8
      rounded-xl
      bg-blue-600
      px-6
      py-3
      font-semibold
      text-white
      transition
      hover:bg-blue-500
    "
  >
    ⚔️ Build Your First Mission
  </button>

</div>

) : (

<div className="mt-6 space-y-4">

  {journeys.map((journey: any) => (

    <div
      key={journey.id}
      className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5"
    >

      <p className="font-semibold text-white">
        ⚔️ {journey.title}
      </p>

      <div className="mt-3 flex justify-between">

        <span className="text-neutral-400">
          Status
        </span>

        <span className="text-emerald-400">
          Active
        </span>

      </div>

      <div className="mt-2 flex justify-between">

        <span className="text-neutral-400">
          Momentum
        </span>

        <span className="text-blue-400">
          Coming Soon
        </span>

      </div>

    </div>

  ))}

</div>

)}
            <div className="mt-8 rounded-2xl border bg-neutral-900 p-6">

<p className="font-semibold text-green-400">
  📈 MOMENTUM STATUS
</p>

<div className="mt-6 space-y-4">

  <div className="flex justify-between">
    <span className="text-neutral-400">
      Current Rank
    </span>

    <span className="text-white">
      Explorer
    </span>
  </div>

  <div className="flex justify-between">
    <span className="text-neutral-400">
      Streak
    </span>

    <span className="text-orange-400">
      {streak} Days
    </span>
  </div>

  <div className="flex justify-between">
    <span className="text-neutral-400">
      Perfect Days
    </span>

    <span className="text-amber-400">
      {perfectDays}
    </span>
  </div>

</div>

</div>
            <div className="mt-8 rounded-2xl border bg-neutral-900 p-6">

            <div className="flex items-center justify-between">

<h3 className="font-semibold text-white">
  ⚔️ Active Journeys
</h3>

<button
  onClick={() => router.push("/mission-builder")}
  className="
    rounded-lg
    border
    border-blue-500/30
    px-4
    py-2
    text-sm
    font-medium
    text-blue-400
    transition
    hover:bg-blue-500/10
  "
>
  + New Mission
</button>

</div>

  <div className="mt-6 space-y-4">

    {journeys.map((journey: any) => (

      <div
        key={journey.id}
        className="rounded-xl border border-neutral-800 p-4"
      >

<p className="font-medium text-white">
  ⚔️ {journey.title}
</p>

<div className="mt-3 flex justify-between">

  <span className="text-neutral-400">
    Status
  </span>

  <span className="text-emerald-400">
    Active
  </span>

</div>

<div className="mt-2 flex justify-between">

  <span className="text-neutral-400">
    Momentum
  </span>

  <span className="text-blue-400">
    Calculating...
  </span>

</div>
      </div>

    ))}

  </div>

</div>
            {/* RECENT ACTIVITY */}
  
            <div className="mt-8 rounded-2xl border bg-neutral-900 p-6">
  
              <h3 className="font-bold text-white">
                ⚡ Recent Activity
              </h3>
  
              <div className="mt-4 space-y-3">
  
                {recentActivity.map((activity) => (
  
<div
  key={activity.id}
  className="
    flex
    items-center
    justify-between
    rounded-xl
    border
    border-neutral-800
    bg-neutral-950/40
    p-4
  "
>

<div>

  <p
    className={
      activity.source === "perfect_day"
        ? "text-amber-400 font-medium"
        : "text-blue-400 font-medium"
    }
  >
    {
      activity.source === "perfect_day"
        ? "🏆 Perfect Day Achieved"
        : "⚔️ Quest Completed"
    }
  </p>

  <p className="mt-1 text-xs text-neutral-500">
    {
      new Date(
        activity.created_at
      ).toLocaleDateString()
    }
  </p>

</div>

  <p className="font-bold text-emerald-400">
    +{activity.xp_earned} XP
  </p>

</div>
  
                ))}
  
              </div>
  
            </div>
  
          </div>

          {/* RIGHT SIDE */}
  
          <div>

          <div className="sticky top-8 space-y-6">
            <div className="rounded-2xl border bg-gradient-to-br from-blue-500/10 to-violet-500/10 p-6 dark:border-neutral-800">

            <h3 className="text-xl font-bold">
  📜 Upcoming Unlocks
</h3>

<p className="mt-3 text-sm text-neutral-400 leading-6">
  Your journey has begun.
  New systems, rewards and experiences
  will unlock as the world evolves.
</p>

<div className="mt-8">


<h4
className="
  text-xs
  uppercase
  tracking-widest
  font-semibold
  text-neutral-400
"
>
🌎 Available Today
</h4>

<div className="mt-4 space-y-2 text-sm">
<p>✅ AI Mission Creation</p>
<p>✅ Personalized Focus Areas</p>
<p>✅ Mission Briefing</p>
<p>✅ Journey Activation</p>
</div>


</div>

<div className="mt-8">


<h4
className="
  text-xs
  uppercase
  tracking-widest
  font-semibold
  text-neutral-400
"
>
⚒️ Currently Unlocking
</h4>

<div className="mt-4 space-y-2 text-sm">
<p>🚧 Daily Execution</p>
<p>🚧 Habit Completion Tracking</p>
<p>🚧 XP Rewards</p>
</div>


</div>

<div className="mt-8">


<h4
className="
  text-xs
  uppercase
  tracking-widest
  font-semibold
  text-neutral-400
"
>
🗺️ Next Unlocks
</h4>

<div className="mt-4 space-y-2 text-sm">
<p>⬜ Fix Day Selection</p>
<p>⬜ Habit Completion UI</p>
<p>⬜ Streak Tracking</p>
<p>⬜ Level Progression</p>
<p>⬜ Command Center</p>
<p>⬜ Journey Details</p>
<p>⬜ AI Check-ins</p>
<p>⬜ Transformation Progress</p>
</div>


</div>

<div className="mt-8">


<h4
className="
  text-xs
  uppercase
  tracking-widest
  font-semibold
  text-neutral-400
"
>
🏰 Future Expansions
</h4>

<div className="mt-4 space-y-2 text-sm">
<p>🏆 Achievement System</p>
<p>🤝 Accountability Partners</p>
<p>⚔️ Guilds & Teams</p>
<p>🌎 Shared Challenges</p>
<p>🧠 AI Mentor</p>
<p>🎭 Skill Trees</p>
<p>⭐ Reputation System</p>
</div>


</div>

<div className="mt-8">


<h4
className="
  text-xs
  uppercase
  tracking-widest
  font-semibold
  text-neutral-400
"
>
🐛 Known Issues
</h4>

<div className="mt-4 space-y-2 text-sm">
<p>⬜ Duplicate test journeys</p>
<p>⬜ Habit validation</p>
<p>⬜ Day selection popup</p>
<p>⬜ Full onboarding test</p>

</div>


</div>

<div className="mt-8 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">


<p className="text-xs font-semibold uppercase tracking-wider text-blue-300">
💬 Beta Tester Mission
</p>

<div className="mt-3 space-y-2 text-sm text-neutral-400">
<p>• What feels confusing?</p>
<p>• What feels exciting?</p>
<p>• What would make you return tomorrow?</p>
</div>

<p className="mt-4 text-xs text-neutral-500">
Your feedback helps shape future unlocks.
</p>


</div>

</div>


              <div className="rounded-2xl border bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <h3 className="font-bold">🏆 XP Rewards</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <p>+10 XP Habit Complete</p>
                  <p>+100 XP Checkpoint Complete</p>
                  <p>+500 XP Mission Complete</p>
                </div>
              </div>

              <div className="rounded-2xl border bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <h3 className="font-bold">🎖 Journey Ranks</h3>
                <div className="mt-4 space-y-2 text-sm">
                  <p>Level 1 → Explorer</p>
                  <p>Level 5 → Pathfinder</p>
                  <p>Level 10 → Builder</p>
                  <p>Level 20 → Strategist</p>
                  <p>Level 30 → Architect</p>
                </div>
              </div>
            </div>

          </div>
  
        </div>
  
      </div>
    </main>
  )
  
};