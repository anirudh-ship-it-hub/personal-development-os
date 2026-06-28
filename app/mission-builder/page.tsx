"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const templates = [
  {
    title: "🏋 Transform My Health",
    prompt:
      "I want to lose 10kg, improve my nutrition, exercise consistently and build a healthier lifestyle.",
  },
  {
    title: "🚀 Accelerate My Career",
    prompt:
      "I want to become better at my profession, develop leadership skills and accelerate my career growth.",
  },
  {
    title: "❤️ Build Better Relationships",
    prompt:
      "I want to improve communication, strengthen relationships and become more emotionally present.",
  },
  {
    title: "🧠 Improve Mental Wellbeing",
    prompt:
      "I want to reduce stress, improve mindfulness and build a calmer mindset.",
  },
  {
    title: "💰 Build Financial Freedom",
    prompt:
      "I want to improve my finances, increase savings and build long-term wealth.",
  },
];

const loadingMessages = [
    "🔮 Understanding Your Ambition...",
    "🗺️ Mapping Your Journey...",
    "⚡ Discovering Key Focus Areas...",
    "🏆 Preparing Your Mission...",
  ];

export default function MissionBuilderPage() {
  const router = useRouter();

  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  async function beginJourney() {
    if (!goal.trim()) return;
  
    try {
      setLoading(true);
  
      const response = await fetch(
        "/api/generate-mission",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            goal,
          }),
        }
      );
  
      const missionData = await response.json();

if (!response.ok) {
  alert(
    missionData.error ||
      "Failed to generate mission"
  );

  setLoading(false);
  return;
}
  
      console.log("MISSION DATA");
        console.log(
        JSON.stringify(
            missionData,
            null,
            2
        )
        );
  
      sessionStorage.setItem(
        "missionData",
        JSON.stringify(missionData)
      );
  
      for (let i = 0; i < loadingMessages.length; i++) {
        setLoadingStep(i);
  
        await new Promise((resolve) =>
          setTimeout(resolve, 1000)
        );
      }
  
      router.push("/mission-briefing");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-950 text-white">
        <div className="text-center">
          <div className="mb-8 text-6xl animate-pulse">
            ⚔️
          </div>

          <h1 className="text-3xl font-bold">
            {loadingMessages[loadingStep]}
          </h1>

          <p className="mt-4 text-neutral-400">
            Your Guide is preparing your journey...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6 py-12">

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

          {/* Main Section */}

          <div>

            <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
              Character Creation
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight text-white">
              ⚔️ Begin Your Journey
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-neutral-400">
            Who do you want to become?

            Start with one mission today.

            Your Guide will help transform your ambition
            into a mission, identify focus areas and
            create an action plan.

            You can always add more missions as your
            journey evolves.
            </p>

            <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">

              <label className="text-sm font-medium text-neutral-500">
                Describe your future self
              </label>

              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="I want to lose 10kg, improve my nutrition, build consistency in the gym and create a healthier lifestyle..."
                className="mt-3 h-40 w-full rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-white outline-none placeholder:text-neutral-500 focus:border-blue-500"
              />

              <button
                onClick={beginJourney}
                disabled={!goal.trim()}
                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-neutral-500"
              >
                Begin Journey
              </button>

            </div>

            <div className="mt-10">

              <h2 className="text-xl font-semibold text-white">
                Need Inspiration?
              </h2>

              <p className="mt-2 text-neutral-500">
                Select a journey below and customize it.
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-2">

                {templates.map((template) => (
                  <button
                    key={template.title}
                    onClick={() => setGoal(template.prompt)}
                    className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-left transition hover:border-blue-500"
                  >
                    <p className="font-medium text-white">
                      {template.title}
                    </p>
                  </button>
                ))}

              </div>

            </div>

          </div>

          {/* Guide Panel */}

          <div className="hidden lg:block">

            <div className="sticky top-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">

              <div className="text-5xl">
                🧭
              </div>

              <h3 className="mt-4 text-xl font-semibold text-white">
                Your Guide
              </h3>

              <p className="mt-3 text-neutral-400">
              Soon you'll have a personal guide helping
                you create missions, review checkpoints,
                track your progress and stay accountable
                through every stage of your journey.
              </p>

              <div className="mt-6 rounded-xl bg-neutral-950 p-4">

                <p className="italic text-neutral-500">
                "Every great life is built through many missions.

                Start with one.
                We'll help you build the rest."
                </p>

              </div>

              <div className="mt-6 border-t border-neutral-800 pt-6">

                <h4 className="font-semibold text-white">
                  Journey Titles
                </h4>

                <div className="mt-3 space-y-2 text-sm text-neutral-500">

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