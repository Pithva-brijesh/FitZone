import { supabase } from "../lib/supabase";
import { getCurrentUser } from "./authService";
import { updateWorkoutStreak } from "./streakService";

export async function saveWorkout({
  routineId,
  calories,
  duration,
}) {
  const user = await getCurrentUser();

  const { error } = await supabase
    .from("workout_history")
    .insert({
      user_id: user.id,
      routine_id: routineId,
      calories,
      duration,
    });

  if (error) throw error;

  await updateWorkoutStreak();
}

export async function getWorkoutHistory() {
  const { data, error } = await supabase
    .from("workout_history")
    .select(`
      *,
      routines(name)
    `)
    .order("completed_at", { ascending: false });

  if (error) throw error;

  return data;
}