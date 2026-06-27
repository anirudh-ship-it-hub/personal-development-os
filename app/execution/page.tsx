"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

const focusAreaIcons: Record<string, string> = {
  Gym: "🏋️",
  Nutrition: "🥗",
  Sleep: "😴",
  Cardio: "🏃",
  Communication: "💬",
  Trust: "🤝",
  Connection: "❤️",
  Leadership: "🚀",
  Networking: "🌐",
  Skills: "📚",
  Savings: "💰",
  Investing: "📈",
  Mindfulness: "🧠",
};

export default function ExecutionPage() {
    const [showPerfectDay, setShowPerfectDay] =
  useState(false);
    const [xpPopup, setXpPopup] =
  useState<string | null>(null);
    const [completedHabits, setCompletedHabits] =
  useState<string[]>([]);
  const [journeys, setJourneys] = useState<any[]>([]);
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
      const todayDate =
      new Date()
        .toISOString()
        .split("T")[0];
    
    const {
      data: completedLogs,
      error: completedError,
    } = await supabase
      .from("habit_logs")
      .select("habit_id")
      .eq("log_date", todayDate)
      .eq("status", "completed");
    
    if (completedError) {
      console.error(completedError);
    }
    
    setCompletedHabits(
        [
          ...new Set(
            completedLogs?.map(
              (log: any) => log.habit_id
            ) || []
          ),
        ]
      );
      const { data, error } = await supabase
        .from("projects")
        .select(`
          id,
          title,
          focus_areas (
            id,
            name,
            habits (
              id,
              name,
              target_frequency,
              xp_reward,
              active
            )
          )
        `)
        .eq("user_id", user.id)
        .eq("status", "active");

      if (error) throw error;

      const todayWeekday = new Date().toLocaleDateString(
        "en-US",
        {
          weekday: "long",
        }
      );

      const filtered =
      data
        ?.map((project: any) => {
    
          const focusAreas =
            project.focus_areas
              .map((area: any) => ({
    
                ...area,
    
                habits:
                  area.habits.filter(
                    (habit: any) =>
                      habit.active &&
                      (
                        habit.target_frequency ===
                        "Daily" ||
                      habit.target_frequency ===
                        todayWeekday
                      )
                  ),
    
              }))
              .filter(
                (area: any) =>
                  area.habits.length > 0
              );
    
          return {
            ...project,
            focus_areas: focusAreas,
          };
        })
        .filter(
          (project: any) =>
            project.focus_areas.length > 0
        ) || [];

      setJourneys(filtered);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  async function toggleHabit(
    habit: any
  ) {
  
    const todayDate =
      new Date()
        .toISOString()
        .split("T")[0];
  
    const completed =
      completedHabits.includes(
        habit.id
      );
      
    if (completed) {
        const { error } =
        await supabase
          .from("habit_logs")
          .delete()
          .eq("habit_id", habit.id)
          .eq("log_date", todayDate);
          await supabase
          .from("xp_logs")
          .delete()
          .eq(
            "source",
            "habit_completion"
          )
          .eq(
            "source_id",
            habit.id
          );
      if (error) {
        console.error(error);
        return;
      }
        const remainingHabits =
        completedHabits.filter(
          (id) => id !== habit.id
        );
      
      if (
        completedHabits.length === totalQuests
      ) {
        console.log(
            "Removing Perfect Day XP"
          );
        await supabase
  .from("xp_logs")
  .delete()
  .eq(
    "source",
    "perfect_day"
  )
  .eq(
    "metadata",
    todayDate
  );
      
      }
      setCompletedHabits(
        remainingHabits
      );
  
    } else {
  
      const { error } =
        await supabase
          .from("habit_logs")
          .insert({
            habit_id: habit.id,
            log_date: todayDate,
            status: "completed",
          });
  
      if (error) {
        console.error(error);
        return;
      }
      const {
        data: { user },
      } = await supabase.auth.getUser();
      
      if (user) {
        const { error: xpError } =
          await supabase
            .from("xp_logs")
            .insert({
              user_id: user.id,
              xp_earned:
                habit.xp_reward || 10,
              source:
                "habit_completion",
              source_id:
                habit.id,
            });
      
        if (xpError) {
          console.error(
            "Habit XP Error:",
            xpError
          );
        }
      }
      
      
      const updatedHabits = [
        ...completedHabits,
        habit.id,
      ];
     
      setCompletedHabits(
        updatedHabits
      );

      if (
        updatedHabits.length === totalQuests &&
        totalQuests > 0
      ) {
        const {
            data: existingPerfectDay,
          } = await supabase
            .from("xp_logs")
            .select("id")
            .eq(
              "source",
              "perfect_day"
            )
            .eq(
              "metadata",
              todayDate
            );

      
        if (
            user &&
            (
              !existingPerfectDay ||
              existingPerfectDay.length === 0
            )
          ) {
          
            const { error: perfectDayError } =
            await supabase
              .from("xp_logs")
              .insert({
                user_id: user.id,
                xp_earned: 50,
                source: "perfect_day",
                metadata: todayDate,
              });
          
          if (perfectDayError) {
            console.error(
              "Perfect Day XP Error:",
              perfectDayError
            );
          }
          
          }
      
        setShowPerfectDay(true);
      
        setTimeout(() => {
          setShowPerfectDay(false);
        }, 1500);
      
      }
  
    }
  
  }
  const totalQuests = useMemo(() => {
    return journeys.reduce(
      (sum, project) =>
        sum +
        project.focus_areas.reduce(
          (areaSum: number, area: any) =>
            areaSum + area.habits.length,
          0
        ),
      0
    );
  }, [journeys]);

  const totalXp = useMemo(() => {
    return journeys.reduce(
      (sum, project) =>
        sum +
        project.focus_areas.reduce(
          (areaSum: number, area: any) =>
            areaSum +
            area.habits.reduce(
              (habitSum: number, habit: any) =>
                habitSum + (habit.xp_reward || 10),
              0
            ),
          0
        ),
      0
    );
  }, [journeys]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-950">
        <h1 className="text-2xl font-bold text-white">
          Preparing Quest Board...
        </h1>
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
            <h1 className="text-5xl font-bold text-white">
  ⚔️ Today's Quests
</h1>
{
  showPerfectDay && (
    <div className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/40
    ">
      <div className="
        rounded-2xl
        border
        border-amber-500
        bg-neutral-900
        p-8
        text-center
        animate-bounce
      ">
        <p className="text-3xl font-bold text-amber-300">
          🏆 Perfect Day Achieved
        </p>

        <p className="mt-3 text-white">
          Every quest completed
        </p>

        <p className="mt-2 text-amber-300">
          +50 Bonus XP
        </p>
      </div>
    </div>
  )
}
<p className="mt-4 text-neutral-400 leading-7">
  Today's quests are the actions
  that move your journey forward.

  <br />
  <br />

  Complete them.
  Build momentum.
  Level up.
</p>

<div className="mt-8 grid grid-cols-2 gap-4">

  <div className="flex-1 rounded-2xl border p-6">

    <p className="text-sm text-neutral-500">
      QUESTS TODAY
    </p>

    <p className="mt-2 text-6xl font-bold text-white">
      {totalQuests}
    </p>

  </div>

  <div className="flex-1 rounded-2xl border p-6">

    <p className="text-sm text-neutral-500">
      XP AVAILABLE
    </p>

    <p className="mt-2 text-6xl font-bold text-emerald-400">
      +{totalXp}
    </p>

  </div>

</div>
<div className="mt-6 rounded-2xl border border-blue-900 bg-blue-950/20 p-5">

  <p className="font-semibold text-blue-400">
    🎯 Today's Objective
  </p>

  <p className="mt-2 text-white">
    Complete all {totalQuests} quests
    to earn a Perfect Day (+50 XP)
  </p>

  <p className="mt-2 text-sm text-neutral-500">
    Perfect Days will contribute to
    streaks, momentum and progression.
  </p>

</div>
            {/* PROGRESS */}

            <div className="mt-8 rounded-2xl border bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">

              <h3 className="font-semibold text-white">
                🏆 Today's Progress
              </h3>

              <p className="mt-4 text-5xl font-bold text-white">
              {totalQuests === 0
  ? 0
  : Math.round(
      (
        completedHabits.length /
        totalQuests
      ) * 100
    )}%
</p>

<p className="text-sm text-neutral-500">
  Daily Progress
</p>
{
  totalQuests > 0 &&
  completedHabits.length === totalQuests && (
    <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">

      <p className="font-semibold text-amber-300">
        🏆 Perfect Day Achieved
      </p>

      <p className="mt-1 text-sm text-neutral-300">
        Every quest completed.
        Bonus XP unlocked.
      </p>

    </div>
  )
}
<p className="mt-4 text-sm text-amber-400">
  Perfect Day Reward: +50 XP
</p>

              <div className="mt-6 h-3 rounded-full bg-neutral-800">
              <div
  className="h-3 rounded-full bg-blue-500 transition-all"
  style={{
    width: `${
      totalQuests === 0
        ? 0
        : (
            completedHabits.length /
            totalQuests
          ) * 100
    }%`,
  }}
/>
              </div>

            </div>

            {/* JOURNEYS */}

            <div className="mt-10 space-y-6">

              {journeys.map((project: any) => (

                <div
                  key={project.id}
                  className="rounded-2xl border bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
                >

                  <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-white">
                      ⚔️ {project.title}
                    </h2>

                    <span className="rounded-full bg-orange-950 px-3 py-1 text-xs text-orange-300">
  🔥 Momentum
</span>

                  </div>

                  <div className="mt-6 space-y-6">

                  {project.focus_areas
  .filter(
    (area: any) =>
      area.habits &&
      area.habits.length > 0
  )
  .map((area: any) => (

                      <div key={area.id}>

                        <h3 className="mb-3 text-lg font-semibold text-white">
                          {(focusAreaIcons[area.name] || "🎯")} {area.name}
                        </h3>

                        <div className="space-y-3">

                          {area.habits.map((habit: any) => (

<div
  key={habit.id}
  onClick={() =>
    toggleHabit(habit)
  }
  className={`
    flex
    cursor-pointer
    items-center
    justify-between
    rounded-xl
    border
    p-5
    transition
  
    ${
      completedHabits.includes(
        habit.id
      )
      ? `
      border-l-4 border-l-green-500
bg-green-950/30
    `
        : `
          border-neutral-800
          bg-neutral-950/30
          hover:border-blue-500/40
        `
    }
  `}
>

                              <div>

                              <p className="font-medium">

  <span
    className={
      completedHabits.includes(habit.id)
        ? "text-green-500"
        : "text-neutral-400"
    }
  >
    {completedHabits.includes(habit.id)
      ? "✓"
      : "○"}{"  "}
  </span>

  <span className="ml-2 text-white">
    {habit.name}
  </span>

</p>

                                <p className="mt-2 text-xs text-neutral-500">
  ↻ Reschedule (Coming Soon)
</p>

                              </div>

                              <div>

                                <p className="font-medium text-blue-400">
                                  +{habit.xp_reward || 10} XP
                                </p>

                              </div>


                            </div>

                          ))}

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              ))}

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
  );
}