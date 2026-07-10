import { supabase } from "../lib/supabase";
import { getCurrentUser } from "./authService";

export async function getProgressData() {
  const user = await getCurrentUser();

  const { data: workouts } = await supabase
    .from("workout_history")
    .select("*")
    .eq("user_id", user.id)
    .order("completed_at");

  const { data: weights } = await supabase
    .from("weight_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("logged_at");

  return {
    workouts: workouts || [],
    weights: weights || [],
  };
}