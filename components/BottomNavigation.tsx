"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { shouldHideNavigation } from "@/lib/navigation";

const tabs = [
  {
    href: "/command-center",
    icon: "🏠",
    label: "Home",
  },
  {
    href: "/execution",
    icon: "⚔",
    label: "Execute",
  },
  {
    href: "/journey",
    icon: "🧭",
    label: "Journey",
  },
  {
    href: "/hero",
    icon: "👤",
    label: "Hero",
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  if (shouldHideNavigation(pathname)) {
    return null;
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 px-2 pb-[env(safe-area-inset-bottom)]"
      aria-label="Main navigation"
    >
      <div className="mx-auto mb-2 flex max-w-lg items-stretch justify-around rounded-2xl border border-neutral-800/60 bg-neutral-950/90 shadow-lg shadow-black/50 backdrop-blur-2xl">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href ||
            (tab.href === "/command-center" && pathname === "/");

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative flex min-h-[64px] min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 transition-all duration-200 active:scale-90 select-none ${
                isActive
                  ? "text-blue-400"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {/* Active indicator pill */}
              {isActive && (
                <span className="absolute -top-[2px] left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full bg-blue-500 transition-all duration-300" />
              )}
              <span
                className={`text-xl leading-none transition-all duration-200 ${
                  isActive ? "scale-110" : ""
                }`}
              >
                {tab.icon}
              </span>
              <span
                className={`text-[11px] font-semibold leading-tight transition-all duration-200 ${
                  isActive ? "text-blue-400" : "text-neutral-400"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
