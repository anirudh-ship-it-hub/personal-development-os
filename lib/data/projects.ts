import { supabase } from "../supabase";

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*");

  if (error) throw error;

  return data;
}