"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.replace("/command-center");
      } else {
        router.replace("/auth/login");
      }
    }

    checkUser();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
      Loading Founder OS...
    </main>
  );
}