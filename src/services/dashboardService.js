import { supabase } from "../lib/supabase";
import { getCurrentUser } from "./authService";

export async function getDashboardStats() {
  const user = await getCurrentUser();

  const { data: workouts } = await supabase
    .from("workout_history")
    .select("*")
    .eq("user_id", user.id);

  const { data: routines } = await supabase
    .from("routines")
    .select("*")
    .eq("user_id", user.id);

  const totalCalories = (workouts || []).reduce(
    (sum, w) => sum + (w.calories || 0),
    0
  );

  const totalMinutes = Math.floor(
    (workouts || []).reduce(
      (sum, w) => sum + (w.duration || 0),
      0
    ) / 60
  );

  return {
    totalWorkouts: workouts?.length || 0,
    totalCalories,
    totalMinutes,
    totalRoutines: routines?.length || 0,
  };
}