import Link from "next/link";
const areas = [
  {
    title: "Health & Fitness",
    description: "Track workouts, sleep, nutrition, and energy levels.",
    metric: "3 workouts this week",
    accent: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    title: "Career",
    description: "Goals, projects, networking, and professional growth.",
    metric: "2 active goals",
    accent: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .414-.336.75-.75.75h-4.5a.75.75 0 0 1-.75-.75v-4.25m0 0h4.125c.621 0 1.125-.504 1.125-1.125V11.25c0-4.556-3.694-8.25-8.25-8.25S4.125 6.694 4.125 11.25v1.775c0 .621.504 1.125 1.125 1.125h4.125m9.75-3.375V9.75m0 0V8.625c0-1.036-.84-1.875-1.875-1.875H15.75M9.75 9.75h.008v.008H9.75V9.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 2.25h.008v.008h-.008V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
  },
  {
    title: "Upskilling",
    description: "Courses, books, certifications, and new skills.",
    metric: "1 course in progress",
    accent: "from-violet-500/20 to-violet-500/5",
    iconColor: "text-violet-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
      </svg>
    ),
  },
  {
    title: "Relationship",
    description: "Family, friends, partner, and meaningful connections.",
    metric: "5 people to reach out to",
    accent: "from-rose-500/20 to-rose-500/5",
    iconColor: "text-rose-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Mental Peace",
    description: "Mindfulness, journaling, rest, and emotional balance.",
    metric: "7-day reflection streak",
    accent: "from-cyan-500/20 to-cyan-500/5",
    iconColor: "text-cyan-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-10 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            Command Center
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Your Command Center
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            Track your missions, level up through execution, and become who you want to be.
          </p>
        </header>
        
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <article
              key={area.title}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${area.accent} opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
              />
              <div className="relative">
                <div
                  className={`mb-4 inline-flex rounded-xl bg-neutral-100 p-3 dark:bg-neutral-800 ${area.iconColor}`}
                >
                  {area.icon}
                </div>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                  {area.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {area.description}
                </p>
                <p className="mt-4 text-xs font-medium uppercase tracking-wide text-neutral-500">
                  {area.metric}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
