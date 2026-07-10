import { supabase } from "../lib/supabase";
import { getCurrentUser } from "./authService";

export async function getAchievements() {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .eq("user_id", user.id);

  if (error) throw error;

  return data;
}

export async function unlockAchievement(name) {
  const user = await getCurrentUser();

  // Check if already unlocked
  const { data: existing } = await supabase
    .from("achievements")
    .select("*")
    .eq("user_id", user.id)
    .eq("achievement_name", name)
    .maybeSingle();

  if (existing) return;

  const { error } = await supabase
    .from("achievements")
    .insert({
      user_id: user.id,
      achievement_name: name,
    });

  if (error) throw error;
}