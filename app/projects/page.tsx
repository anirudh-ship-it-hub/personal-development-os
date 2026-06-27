"use client";

import { useState, useRef } from "react";
const projects = [
  {
    title: "Health & Fitness",
    description: "Become fitter, stronger and healthier.",

    level: 12,
    progress: 65,

    currentState: "90 kg",
    targetState: "80 kg",
    targetDate: "Dec 2026",

    focusAreas: [
      {
        name: "Gym",
        level: 7,
        progress: 80,
        weeklyCompleted: 4,
        weeklyTarget: 5,
        habits: [
          { name: "Push Day", status: "completed" },
          { name: "Pull Day", status: "completed" },
          { name: "Leg Day", status: "in-progress" },
          { name: "Upper Day", status: "not-started" },
          { name: "Lower Day", status: "not-started" }
        ]
      },
      {
        name: "Nutrition",
        level: 4,
        progress: 55,
        weeklyCompleted: 5,
        weeklyTarget: 7,
        habits: [
          { name: "Protein Goal", status: "completed" },
          { name: "Water Goal", status: "completed" },
          { name: "Calorie Goal", status: "in-progress" }
        ]
      },
      {
        name: "Sleep",
        level: 8,
        progress: 85,
        weeklyCompleted: 6,
        weeklyTarget: 7,
        habits: [
          { name: "Sleep Before 11 PM", status: "completed" },
          { name: "8 Hours Sleep", status: "not-started" }
        ]
      },
      {
        name: "Cardio",
        level: 3,
        progress: 35,
        weeklyCompleted: 2,
        weeklyTarget: 4,
        habits: [
          { name: "10k Steps", status: "in-progress" },
          { name: "Badminton", status: "not-started" }
        ]
      }
    ]
  },

  {
    title: "Career",
    description: "Grow professionally.",

    level: 8,
    progress: 45,

    currentState: "Analyst",
    targetState: "Founder",
    targetDate: "2030",

    focusAreas: [
      {
        name: "Consulting",
        level: 6,
        progress: 60,
        weeklyCompleted: 3,
        weeklyTarget: 5,
        habits: [
          { name: "Client Work", status: "completed" },
          { name: "Problem Solving", status: "completed" },
          { name: "Stakeholder Management", status: "completed" }
        ]
      },
      {
        name: "Networking",
        level: 4,
        progress: 40,
        weeklyCompleted: 1,
        weeklyTarget: 3,
        habits: [
          { name: "Reach Out", status: "completed" },
          { name: "Coffee Chats", status: "in-progress" },
          { name: "LinkedIn Engagement", status: "not-started" }
        ]
      },
      {
        name: "Leadership",
        level: 3,
        progress: 30,
        weeklyCompleted: 2,
        weeklyTarget: 4,
        habits: [
          { name: "Mentoring", status: "completed" },
          { name: "Team Collaboration", status: "completed" },
          { name: "Presentation Skills", status: "in-progress" }
          ]
      }
    ]
  },

  {
    title: "Upskilling",
    description: "Learn valuable skills.",

    level: 10,
    progress: 55,

    currentState: "Learning MVP Development",
    targetState: "Build Products Independently",
    targetDate: "2027",

    focusAreas: [
      {
        name: "Technology",
        level: 5,
        progress: 50,
        weeklyCompleted: 4,
        weeklyTarget: 7,
        habits: [
          {
            name: "Build Features",
            status: "completed"
          },
          {
            name: "Learn React",
            status: "in-progress"
          },
          {
            name: "Learn Databases",
            status: "not-started"
          }
        ]
      },
      {
        name: "Product Thinking",
        level: 6,
        progress: 65,
        weeklyCompleted: 3,
        weeklyTarget: 5,
        habits: [
          { name: "User Interviews", status: "completed" },
          { name: "Product Reviews", status: "completed" },
          { name: "Feature Prioritization", status: "in-progress" }
        ]
      },
      {
        name: "Behavioral Economics",
        level: 4,
        progress: 40,
        weeklyCompleted: 2,
        weeklyTarget: 4,
        habits: [
          { name: "Read Articles", status: "completed" },
          { name: "Take Notes", status: "completed" },
          { name: "Apply Concepts", status: "in-progress" }
        ]
      }
    ]
  },

  {
    title: "Relationships",
    description: "Build deeper and more meaningful connections.",

    level: 6,
    progress: 35,

    currentState: "Maintaining existing relationships",
    targetState: "Invest intentionally in family, friends and future partner",
    targetDate: "2027",

    focusAreas: [
      {
        name: "Family",
        level: 7,
        progress: 75,
        weeklyCompleted: 3,
        weeklyTarget: 4,
        habits: [
          { name: "Call Parents", status: "completed" },
          { name: "Family Time", status: "in-progress" }
        ]
      },
      {
        name: "Friendships",
        level: 5,
        progress: 55,
        weeklyCompleted: 2,
        weeklyTarget: 4,
        habits: [
          { name: "Reach Out", status: "completed" },
          { name: "Plan Meetups", status: "in-progress" }
        ]
      },
      {
        name: "Dating",
        level: 3,
        progress: 25,
        weeklyCompleted: 1,
        weeklyTarget: 3,
        habits: [
          { name: "Meet New People", status: "in-progress" },
          { name: "Go On Dates", status: "not-started" }
        ]
      }
    ]
  },

  {
    title: "Mental Peace",
    description: "Create a calmer, more balanced and intentional life.",

    level: 9,
    progress: 70,

    currentState: "Managing stress and staying consistent",
    targetState: "Become more present, focused and emotionally resilient",
    targetDate: "2027",

    focusAreas: [
      {
        name: "Mindfulness",
        level: 8,
        progress: 80,
        weeklyCompleted: 5,
        weeklyTarget: 7,
        habits: [
          { name: "Meditation", status: "completed" },
          { name: "Breathing Exercises", status: "in-progress" }
        ]
      },
      {
        name: "Journaling",
        level: 7,
        progress: 75,
        weeklyCompleted: 4,
        weeklyTarget: 7,
        habits: [
          { name: "Morning Journal", status: "completed" },
          { name: "Evening Reflection", status: "in-progress" }
        ]
      },
      {
        name: "Stress Management",
        level: 6,
        progress: 60,
        weeklyCompleted: 3,
        weeklyTarget: 5,
        habits: [
          { name: "Walks", status: "completed" },
          { name: "Digital Detox", status: "in-progress" }
        ]
      }
    ]
  }
];;

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedFocusArea, setSelectedFocusArea] = useState<any>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">
      Missions
      </h1>

      <p className="mt-3 text-neutral-500">
      Big goals. Clear direction. Consistent progress.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <button
            key={project.title}
            onClick={() => {
              setSelectedProject(project);
              setSelectedFocusArea(null);
            
              setTimeout(() => {
                detailsRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 100);
            }}
            className={`rounded-xl border p-6 transition-all duration-200
              ${
                selectedProject?.title === project.title
                  ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                  : "hover:border-blue-400 hover:bg-blue-500/5 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
              }`}
          >
            <h2 className="text-xl font-semibold">
  {project.title}
</h2>

<p className="mt-3 text-sm text-neutral-400">
  Level {project.level}
</p>

<div className="mt-2 h-2 w-full rounded-full bg-neutral-800">
  <div
    className="h-2 rounded-full bg-blue-500"
    style={{ width: `${project.progress}%` }}
  />
</div>

<p className="mt-2 text-xs text-neutral-500">
  {project.progress}% Complete
</p>

<p className="mt-4 text-neutral-500">
  {project.description}
</p>
            </button>
        ))}
      </div>
      <div
  ref={detailsRef}
  className="mt-10 rounded-xl border p-6"
>

  <h2 className="text-2xl font-bold">
    Project Details
  </h2>
  <p>
  Current Selection: {selectedProject?.title || "None"}
</p>
  {selectedProject ? (
    <div className="mt-4">

      <h3 className="text-xl font-semibold">
        {selectedProject.title}
      </h3>
      <div className="mt-4">

        <p className="text-sm text-neutral-400">
          Level {selectedProject.level}
        </p>

        <div className="mt-2 h-3 w-full rounded-full bg-neutral-800">
          <div
            className="h-3 rounded-full bg-blue-500"
            style={{ width: `${selectedProject.progress}%` }}
          />
        </div>

        <p className="mt-2 text-sm text-neutral-400">
          {selectedProject.progress}% Complete
        </p>

      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">

  <div className="rounded-xl border p-4">
    <p className="text-sm text-neutral-400">
      Current
    </p>

    <p className="mt-1 font-semibold">
      {selectedProject.currentState}
    </p>
  </div>

  <div className="rounded-xl border p-4">
    <p className="text-sm text-neutral-400">
      Target
    </p>

    <p className="mt-1 font-semibold">
      {selectedProject.targetState}
    </p>
  </div>

  <div className="rounded-xl border p-4">
    <p className="text-sm text-neutral-400">
      Deadline
    </p>

    <p className="mt-1 font-semibold">
      {selectedProject.targetDate}
    </p>
  </div>

</div>

      <div className="mt-4">
        <div className="mt-6">

  <h4 className="font-semibold mb-4">
    Focus Areas
  </h4>
  
  <div className="flex flex-wrap gap-3">

    {selectedProject.focusAreas.map((area: any) => (

      
      <button
        key={area.name}
        onClick={() => setSelectedFocusArea(area)}
        className={`rounded-lg border px-4 py-2 transition

        ${
          selectedFocusArea?.name === area.name
            ? "border-blue-500 bg-blue-500/10"
            : "hover:border-blue-300"
        }`}
      >
        {area.name}
      </button>

    ))}

  </div>
  {selectedFocusArea && (
  <div className="mt-6 rounded-xl border p-6">

    <h3 className="text-xl font-bold">
      {selectedFocusArea.name}
    </h3>

    <div className="mt-4">

<p className="text-sm text-neutral-400">
  Level {selectedFocusArea.level}
</p>

<div className="mt-2 h-2 w-full rounded-full bg-neutral-800">
  <div
    className="h-2 rounded-full bg-green-500"
    style={{
      width: `${selectedFocusArea.progress}%`
    }}
  />
</div>

<p className="mt-2 text-sm text-neutral-400">
  {selectedFocusArea.progress}% Complete
</p>

</div>

<div className="mt-4 rounded-xl border p-4">

  <p className="text-sm text-neutral-400">
    Weekly Progress
  </p>

  <p className="mt-1 text-xl font-semibold">
    {selectedFocusArea.weeklyCompleted}
    /
    {selectedFocusArea.weeklyTarget}
  </p>

  <p className="text-sm text-neutral-500">
    habits completed this week
  </p>

</div>

<div className="mt-6">

  <h4 className="font-semibold mb-3">
    Habits
  </h4>

  <div className="space-y-2">

    {selectedFocusArea.habits.map((habit:any) => (

      <div
        key={habit.name}
        className="flex items-center gap-3 rounded-lg border border-neutral-700 p-3"
      >
        <span
  className={
    habit.status === "completed"
      ? "text-green-500"
      : habit.status === "in-progress"
      ? "text-yellow-500"
      : "text-neutral-500"
  }
>
  {habit.status === "completed"
    ? "✓"
    : habit.status === "in-progress"
    ? "◐"
    : "○"}
</span>

<span>
  {habit.name}
</span>
      </div>

    ))}

  </div>

</div>

</div>
)}
</div>
      </div>

    </div>
  ) : (
    <p className="mt-4 text-neutral-500">
      Choose a project above to view your progress, focus areas,
      and the habits shaping your next level.
    </p>
  )}

</div>
    </main>
  );
}