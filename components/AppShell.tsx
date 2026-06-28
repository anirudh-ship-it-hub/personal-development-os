"use client";

import { usePathname } from "next/navigation";
import { shouldHideNavigation } from "@/lib/navigation";
import BottomNavigation from "@/components/BottomNavigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavigation = shouldHideNavigation(pathname);

  if (hideNavigation) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="min-h-screen pb-[calc(5.75rem+env(safe-area-inset-bottom))]">
        <div className="mx-auto max-w-lg px-4 py-6">
          {children}
        </div>
      </div>
      <BottomNavigation />
    </>
  );
}
