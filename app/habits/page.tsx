const habits = [
  {
    project: "Health & Fitness",
    focusArea: "Gym",
    name: "Push Day",
    status: "completed"
  },
  {
    project: "Health & Fitness",
    focusArea: "Gym",
    name: "Pull Day",
    status: "in-progress"
  },
  {
    project: "Health & Fitness",
    focusArea: "Sleep",
    name: "Sleep Before 11 PM",
    status: "not-started"
  },
  {
    project: "Career",
    focusArea: "Consulting",
    name: "Client Work",
    status: "completed"
  },
  {
    project: "Career",
    focusArea: "Networking",
    name: "Reach Out",
    status: "not-started"
  },
  {
    project: "Miscellaneous",
    focusArea: "General",
    name: "Buy Groceries",
    status: "not-started"
  }
];
const completed = habits.filter(
  h => h.status === "completed"
).length;

const inProgress = habits.filter(
  h => h.status === "in-progress"
).length;

const notStarted = habits.filter(
  h => h.status === "not-started"
).length;

const totalHabits = habits.length;

const overallProgress = Math.round(
  (completed / totalHabits) * 100
);

const progressColor =
  overallProgress < 30
    ? "bg-red-500"
    : overallProgress < 70
    ? "bg-yellow-500"
    : "bg-green-500";

  
export default function HabitsPage() {
    return (
      <main className="p-10">
       <h1 className="text-4xl font-bold">
       Execution
      </h1>

      <p className="mt-3 text-neutral-500">
      Every completed action moves you closer to your next level.
      </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">

  <div className="rounded-xl border p-4">
    <p className="text-sm text-neutral-500">
      Completed
    </p>

    <p className="mt-2 text-3xl font-bold">
      {completed}
    </p>
  </div>

  <div className="rounded-xl border p-4">
    <p className="text-sm text-neutral-500">
      In Progress
    </p>

    <p className="mt-2 text-3xl font-bold">
      {inProgress}
    </p>
  </div>

  <div className="rounded-xl border p-4">
    <p className="text-sm text-neutral-500">
      Not Started
    </p>

    <p className="mt-2 text-3xl font-bold">
      {notStarted}
    </p>
  </div>

</div>
<div className="mt-8 rounded-xl border p-6">

  <div className="flex items-center justify-between">

    <h3 className="font-semibold">
      Today's Progress
    </h3>

    <span
  className={`text-lg font-bold
  ${
    overallProgress < 30
      ? "text-red-500"
      : overallProgress < 70
      ? "text-yellow-500"
      : "text-green-500"
  }`}
>
  {overallProgress}%
</span>

  </div>

  <div className="mt-4 h-3 w-full rounded-full bg-neutral-800">

    <div
      className={`h-3 rounded-full ${progressColor} transition-all`}
      style={{
        width: `${overallProgress}%`
      }}
    />

  </div>

  <p className="mt-3 text-sm text-neutral-500">
    {completed} of {totalHabits} habits completed today
  </p>

</div>

<div className="mt-10">

<h2 className="text-2xl font-bold">
  Today's Mission
</h2>

</div>

<div className="mt-6 rounded-xl border p-6">

  <h3 className="text-xl font-semibold">
    Health & Fitness
  </h3>

  {/* Gym */}

  <div className="mt-6 rounded-xl border border-neutral-800 p-4">

    <div className="flex items-center justify-between">

      <h4 className="font-semibold text-blue-400">
        Gym
      </h4>

      <span className="text-xs text-neutral-500">
        2 habits
      </span>

    </div>

    <div className="mt-4 space-y-3">

      <div className="rounded-lg border p-4">

        <p className="font-medium">
          Push Day
        </p>

        <div className="mt-3 flex gap-2">

          <button className="rounded-lg border px-3 py-1 text-sm">
            Not Started
          </button>

          <button className="rounded-lg border border-yellow-500 text-yellow-500 px-3 py-1 text-sm">
            In Progress
          </button>

          <button className="rounded-lg border px-3 py-1 text-sm">
            Completed
          </button>

        </div>

      </div>

      <div className="rounded-lg border p-4">

        <p className="font-medium">
          Pull Day
        </p>

        <div className="mt-3 flex gap-2">

          <button className="rounded-lg border px-3 py-1 text-sm">
            Not Started
          </button>

          <button className="rounded-lg border px-3 py-1 text-sm">
            In Progress
          </button>

          <button className="rounded-lg border border-green-500 text-green-500 px-3 py-1 text-sm">
            Completed
          </button>

        </div>

      </div>

    </div>

  </div>

  {/* Sleep */}

  <div className="mt-4 rounded-xl border border-neutral-800 p-4">

    <div className="flex items-center justify-between">

      <h4 className="font-semibold text-blue-400">
        Sleep
      </h4>

      <span className="text-xs text-neutral-500">
        1 habit
      </span>

    </div>

    <div className="mt-4">

      <div className="rounded-lg border p-4">

        <p className="font-medium">
          Sleep Before 11 PM
        </p>

        <div className="mt-3 flex gap-2">

          <button className="rounded-lg border px-3 py-1 text-sm">
            Not Started
          </button>

          <button className="rounded-lg border border-green-500 text-green-500 px-3 py-1 text-sm">
            Completed
          </button>

        </div>

      </div>

    </div>

  </div>

</div>

      </main>
    );
  }