"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useEffect, useMemo, useState } from "react";

const dayOptions = [
  "Daily",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const categoryIcons: Record<string, string> = {
  health: "🏋️",
  career: "🚀",
  relationships: "❤️",
  finance: "💰",
  mental_health: "🧠",
  learning: "📚",
  business: "⚡",
  productivity: "🎯",
};

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
const focusAreaCategories: Record<string, string> = {
  Gym: "Training",
  Nutrition: "Nutrition",
  Sleep: "Recovery",
  Cardio: "Endurance",
  Communication: "Connection",
  Trust: "Relationship",
  Connection: "Relationship",
  Leadership: "Leadership",
  Networking: "Growth",
  Skills: "Development",
  Savings: "Finance",
  Investing: "Wealth",
  Mindfulness: "Mental Fitness",
};
export default function MissionBriefingPage() {
  const router = useRouter();
  const [saving, setSaving] =
  useState(false);
  const [mission, setMission] = useState<any>(null);
  const [missionName, setMissionName] = useState("");
  const [description, setDescription] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [futurePosition, setFuturePosition] = useState("");
  const [checkpointSchedule, setCheckpointSchedule] = useState("weekly");
  const [targetDate, setTargetDate] = useState("");
  const [showMissionModal, setShowMissionModal] =
  useState(false);
  const [editingHabit, setEditingHabit] =
  useState<any>(null);

const [selectedDay, setSelectedDay] =
  useState("");

const [existingMissions, setExistingMissions] =
  useState<any[]>([]);

  useEffect(() => {
    const storedMission = sessionStorage.getItem("missionData");
    if (!storedMission) return;

    const data = JSON.parse(storedMission);

    setMission(data);
    setMissionName(data.missionName || "");
    setDescription(data.description || "");
    setCurrentPosition(data.currentPosition || "");
    setFuturePosition(data.futurePosition || "");
    setCheckpointSchedule(data.checkpointSchedule || "weekly");
  }, []);

  const habitsByFocusArea = useMemo(() => {
    if (!mission?.habits) return {};
    return mission.habits.reduce((acc: any, habit: any) => {
      if (!acc[habit.focusArea]) acc[habit.focusArea] = [];
      acc[habit.focusArea].push(habit);
      return acc;
    }, {});
  }, [mission]);

  async function createMission(user: any) {
      // Create Project
  
      const {
        data: project,
        error: projectError,
      } = await supabase
        .from("projects")
        .insert({
          user_id: user.id,
  
          title: missionName,
  
          description,
  
          project_type:
            mission.missionCategory,
  
          current_state:
            currentPosition,
  
          target_state:
            futurePosition,
  
          target_date:
            targetDate || null,
  
          check_in_frequency:
            checkpointSchedule,
  
          mission_type:
            mission.missionType,
  
          xp_reward:
            mission.xpReward || 100,
  
          status: "active",
        })
        .select()
        .single();
  
      if (projectError)
        throw projectError;
  
      // Save Focus Areas
  
      const focusAreaMap:
        Record<string, string> = {};
  
      for (const area of mission.focusAreas) {
        const {
          data: focusArea,
          error,
        } = await supabase
          .from("focus_areas")
          .insert({
            project_id: project.id,
  
            name: area.name,
  
            description:
              area.description,
  
            level: 1,
  
            progress: 0,
          })
          .select()
          .single();
  
        if (error) throw error;
  
        console.log(
          "Saved Focus Area:",
          area.name,
          focusArea.id
        );
        focusAreaMap[area.name] =
  focusArea.id;
      }
  
      // Save Habits
  
      for (const habit of mission.habits) {

        const focusAreaId =
          focusAreaMap[habit.focusArea];
      
        console.log(
          "Habit:",
          habit.name
        );
      
        console.log(
          "Focus Area:",
          habit.focusArea
        );
      
        console.log(
          "Focus Area ID:",
          focusAreaId
        );
        console.log("==========");
console.log("Focus Area Map");
console.log(focusAreaMap);

console.log("Habit");
console.log(habit);

console.log("Resolved Focus Area ID");
console.log(focusAreaId);
      
        const { data, error } =
          await supabase
            .from("habits")
            .insert({
              focus_area_id:
                focusAreaId,
      
              name: habit.name,
      
              description: "",
      
              habit_type:
                "habit",
      
              target_frequency:
                habit.frequency,
      
              active: true,
      
              xp_reward: 10,
            })
            .select();
      
        console.log(
          "Habit Insert Result:"
        );
      
        console.log("Habit Insert Error:");
console.log(error);

if (error) {
  throw error;
}
      }
  
      // Award XP
  
      await supabase
        .from("xp_logs")
        .insert({
          user_id: user.id,
  
          xp_earned:
            mission.xpReward || 100,
  
          source:
            "mission_started",
  
          source_id:
            project.id,
        });
  
      sessionStorage.removeItem(
        "missionData"
      );
  
      router.push(
        "/command-center"
      );
  }
  async function replaceJourney() {

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) return;
  
    if (existingMissions.length === 0) return;
  
    const latestMission =
      existingMissions[0];
  
    const { error } =
      await supabase
        .from("projects")
        .update({
          status: "archived",
        })
        .eq("id", latestMission.id);
  
    if (error) {
      console.error(error);
      alert("Failed to archive journey.");
      return;
    }
  
    setShowMissionModal(false);
  
    await createMission(user);
  }
  async function handleStartMission() {
    try {
      setSaving(true);
  
      const {
        data: { user },
      } = await supabase.auth.getUser();
  
      if (!user) {
        alert("Please login first.");
        return;
      }
      const { data: activeMissions } =
      await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active");
    
    if (
      activeMissions &&
      activeMissions.length > 0
    ) {
      setExistingMissions(activeMissions);
      setShowMissionModal(true);
      return;
    }

    await createMission(user);
  
    } catch (error: any) {
      console.error(error);
    
      alert(
        JSON.stringify(error, null, 2)
      );
    }
  }


  if (!mission) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Preparing Mission...</h1>
        
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="rounded-3xl border bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-start justify-between">
                <div>
                <div>
                  <div className="text-6xl">
                    {categoryIcons[mission.missionCategory] || "🎯"}
                  </div>
                  <div className="mt-3 inline-flex rounded-full bg-blue-950 px-3 py-1 text-xs font-medium text-blue-300">
                  {mission.missionCategory
                  .replace("_", " ")
                   .replace(/\b\w/g, (c) => c.toUpperCase())}
</div>
                </div>

                  <input
                    value={missionName}
                    onChange={(e) => setMissionName(e.target.value)}
                    className="mt-4 w-full bg-transparent text-4xl font-bold outline-none dark:text-white"
                  />
                </div>

                <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {mission.missionType === "quantifiable"
                    ? "🎯 Quantifiable Mission"
                    : "🌱 Transformational Mission"}
                </div>
              </div>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-6 w-full resize-none bg-transparent text-neutral-600 outline-none dark:text-neutral-400"
              />

<div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/20">

  <p className="font-semibold text-emerald-700 dark:text-emerald-400">
    🏆 Mission Activated Reward
  </p>

  <p className="mt-2 text-4xl font-bold">
    +{mission.xpReward || 50} XP
  </p>

  <p className="mt-3 text-sm text-neutral-500">
    Awarded when this mission is activated.
    <br />
    <br />
    Earn additional XP through habits,
    checkpoints and mission completion.
  </p>

</div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <h3 className="text-xl font-semibold">📍 Current Reality</h3>
                <p className="mt-1 text-sm text-neutral-500">
  Be honest about where you are today
</p>
                <textarea
  value={currentPosition}
  onChange={(e) =>
    setCurrentPosition(e.target.value)
  }
  placeholder="Describe where you are today..."
  rows={6}
  className="
    mt-4
    w-full
    rounded-xl
    border
    border-neutral-200
    bg-neutral-50
    p-4
    outline-none
    transition
    focus:border-blue-500
    dark:border-neutral-700
    dark:bg-neutral-950
    dark:text-white
  "
/>
              </div>

              <div className="rounded-2xl border bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <h3 className="text-xl font-semibold">🏁 Future Identity</h3>
                <p className="mt-1 text-sm text-neutral-500">
  Describe who you're becoming
</p>
                <textarea
  value={futurePosition}
  onChange={(e) =>
    setFuturePosition(e.target.value)
  }
  placeholder="Describe the future version of yourself..."
  rows={6}
  className="
    mt-4
    w-full
    rounded-xl
    border
    border-neutral-200
    bg-neutral-50
    p-4
    outline-none
    transition
    focus:border-blue-500
    dark:border-neutral-700
    dark:bg-neutral-950
    dark:text-white
  "
/>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <h3 className="font-semibold">🎯 Target Milestone</h3>
                <input type="date" value={targetDate} onChange={(e)=>setTargetDate(e.target.value)}
                  className="mt-4 rounded-xl border p-3 dark:bg-neutral-950" />
              </div>

              <div className="rounded-2xl border bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <h3 className="font-semibold">🧭 Checkpoint Schedule</h3>
                <select value={checkpointSchedule} onChange={(e)=>setCheckpointSchedule(e.target.value)}
                  className="mt-4 rounded-xl border p-3 dark:bg-neutral-950">
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Biweekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold">🎯 Focus Areas</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {mission.focusAreas?.map((area:any)=>(
                  <div
                  key={area.name}
                  className="min-h-[140px] rounded-2xl border bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
                >
                    <h3 className="font-semibold text-lg">
  {(focusAreaIcons[area.name] || "🎯") + " " + area.name}
</h3>

<p className="mt-2 text-sm text-neutral-500">
  {area.description}
</p>

<div className="mt-4 flex items-center justify-between">

  <span className="text-xs font-medium text-neutral-500">
    {focusAreaCategories[area.name] || "Growth"}
  </span>

  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
    {
      mission.habits?.filter(
        (habit: any) =>
          habit.focusArea === area.name
      ).length
    }{" "}
    habits
  </span>

</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold">⚡ Execution Plan</h2>
              <div className="mt-6 space-y-6">
                {Object.entries(habitsByFocusArea).map(([focusArea, habits]: any) => (
                  <div key={focusArea} className="rounded-2xl border bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                    <h3 className="mb-4 text-xl font-semibold">
                      {(focusAreaIcons[focusArea] || "🎯") + " " + focusArea}
                    </h3>

                    <div className="space-y-3">
                      {habits.map((habit:any, index:number) => {

  const habitKey =
    `${focusArea}-${habit.name}-${index}`;

  return (
                        <div
                        key={habit.name}
                        className="
  group
  relative
  flex
  items-center
  justify-between
  rounded-xl
  border
  p-4
"
                      >
                        
                          <div className="flex items-center gap-3">

<div className="h-5 w-5 rounded border border-neutral-300" />

<div>

  <p className="font-medium">
    {habit.name}
  </p>

  <p className="text-xs text-neutral-500">
  {habit.frequency === "Daily"
    ? "Recommended daily"
    : habit.frequency === "Weekly"
    ? "Recommended weekly"
    : `Recommended every ${habit.frequency}`}
</p>

</div>

</div>
{habit.frequency === "Daily" ? (
  <span className="text-sm text-neutral-500">
    Daily
  </span>
) : (
  <button
    onClick={() => {
      setEditingHabit(habit);
      setSelectedDay(habit.frequency);
    }}
    className="
      rounded-lg
      px-3
      py-1
      text-sm
      text-neutral-400
      hover:bg-neutral-800
      hover:text-white
      transition
    "
  >
    {habit.frequency} ▼
  </button>
)}
                        </div>
);
})}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-2xl border bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <h3 className="font-semibold">
                📋 Mission Summary
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <p className="text-2xl font-bold">
                    {mission.focusAreas?.length || 0}
                  </p>
                  <p className="text-sm text-neutral-500">Focus Areas</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {mission.habits?.length || 0}
                  </p>
                  <p className="text-sm text-neutral-500">Habits</p>
                </div>
                <div>
                  <p className="text-2xl font-bold capitalize">
                    {checkpointSchedule}
                  </p>
                  <p className="text-sm text-neutral-500">Checkpoint</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {mission.xpReward || 50}
                  </p>
                  <p className="text-sm text-neutral-500">XP Reward</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
            <button
  onClick={handleStartMission}
  disabled={saving}
  className="rounded-xl bg-blue-600 px-8 py-4 font-medium text-white disabled:opacity-50"
>
  {saving
    ? "⏳ Activating Mission..."
    : "🚀 Start Mission"}
</button>

              <button className="rounded-xl border px-8 py-4 font-medium">
                🔄 Regenerate Plan
              </button>
            </div>
          </div>

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
      {showMissionModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

    <div className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-900 p-8">

      <div className="text-5xl">
        {categoryIcons[
          mission.missionCategory
        ] || "🎯"}
      </div>

      <h2 className="mt-4 text-2xl font-bold text-white">
        Journey Already Active
      </h2>

      <p className="mt-3 text-neutral-400">
      You already have active journeys in progress.

Starting another journey may split your focus.
      </p>
      <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">

  <p className="text-sm text-amber-300">
    ⚠️ Most successful people focus on a few meaningful journeys at a time.
  </p>

</div>
      <div className="mt-4 space-y-3">

{existingMissions.map((mission) => (

  <div
    key={mission.id}
    className="rounded-xl border border-neutral-800 p-3"
  >
    <p className="font-medium text-white">
      {mission.title}
    </p>

    <p className="text-xs text-neutral-500">
      {mission.project_type}
    </p>
  </div>

))}

</div>

      <div className="mt-6 flex flex-col gap-3">

      <button
  onClick={() =>
    router.push("/command-center")
  }
  className="rounded-xl bg-blue-600 py-3 font-medium text-white"
>
  Continue Journeys
</button>
<button
  onClick={replaceJourney}
  className="rounded-xl border border-neutral-700 py-3 font-medium text-white"
>
  Replace Journey
</button>


        <button
          onClick={() =>
            setShowMissionModal(false)
          }
          className="text-sm text-neutral-500"
        >
          Cancel
        </button>

      </div>

    </div>

  </div>
)}
{editingHabit && (
  <div
  className="
    fixed
    inset-0
    z-[100]
    bg-black/70
    backdrop-blur-sm
  "
>
  <div
    className="
      absolute
      left-1/2
      top-1/2
      -translate-x-1/2
      -translate-y-1/2
      w-full
      max-w-md
    "
  >

    <div className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-900 p-8">

      <div className="text-5xl">
        ⚔️
      </div>

      <h2 className="mt-4 text-2xl font-bold text-white">
        Adjust Mission Plan
      </h2>

      <p className="mt-3 text-neutral-400">
        The AI strategist recommended{" "}
        <span className="font-semibold text-white">
          {editingHabit.frequency}
        </span>.
      </p>

      <p className="mt-2 text-sm text-neutral-500">
        Choose the day you'll commit to.
      </p>

      <div className="mt-6 space-y-2">

        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day) => (

          <button
            key={day}
            onClick={() =>
              setSelectedDay(day)
            }
            className={`
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              border
              px-4
              py-3
              text-left
              transition
              ${
                selectedDay === day
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-neutral-800 hover:border-neutral-700"
              }
            `}
          >
            <span className="text-lg">
              {selectedDay === day
                ? "🔵"
                : "⚪"}
            </span>

            <span>{day}</span>

          </button>

        ))}

      </div>

      <div className="mt-6 flex gap-3">

        <button
          onClick={() => {

            const updatedHabits =
              mission.habits.map(
                (h: any) =>

                  h.name ===
                  editingHabit.name

                    ? {
                        ...h,
                        frequency:
                          selectedDay,
                      }

                    : h
              );

            setMission({
              ...mission,
              habits: updatedHabits,
            });

            setEditingHabit(null);
          }}
          className="
            flex-1
            rounded-xl
            bg-blue-600
            py-3
            font-medium
            text-white
          "
        >
          Confirm Adjustment
        </button>

        <button
          onClick={() =>
            setEditingHabit(null)
          }
          className="
            rounded-xl
            border
            border-neutral-700
            px-5
            py-3
            text-white
          "
        >
          Cancel
        </button>

      </div>

      </div>

</div>

</div>

)}
</main>
);
}