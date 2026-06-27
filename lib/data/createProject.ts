"use server";

import { supabase } from "../supabase";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("description");

  const { error } = await supabase
    .from("projects")
    .insert([
      {
        title,
        description,
        project_type: "growth",
        level: 1,
        progress: 0,
      },
    ]);

  if (error) {
    throw error;
  }

  revalidatePath("/projects-v2");
}