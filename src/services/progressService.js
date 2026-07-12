import { supabase } from "../lib/supabase";
import { getCurrentUser } from "./authService";

export async function getProgressData() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const [
    { data: workouts, error: workoutError },
    { data: weights, error: weightError },
    { data: achievements, error: achievementError },
    { data: profile, error: profileError },
  ] = await Promise.all([
    supabase
      .from("workout_history")
      .select("*")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: true }),

    supabase
      .from("weight_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("logged_at", { ascending: true }),

    supabase
      .from("achievements")
      .select("*")
      .eq("user_id", user.id)
      .order("unlocked_at", { ascending: false }),

    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single(),
  ]);

  if (workoutError) throw workoutError;
  if (weightError) throw weightError;
  if (achievementError) throw achievementError;
  if (profileError) throw profileError;

  return {
    workouts: workouts || [],
    weights: weights || [],
    achievements: achievements || [],
    profile: profile || null,
  };
}