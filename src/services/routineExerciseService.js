import { supabase } from "../lib/supabase";

export async function getRoutineExercises(routineId) {
  const { data, error } = await supabase
    .from("routine_exercises")
    .select(`
      id,
      sets,
      reps,
      rest_time,
      exercise_order,
      exercises (
        id,
        name,
        description,
        difficulty,
        muscle_group,
        equipment,
        calories_per_min,
        image_url
      )
    `)
    .eq("routine_id", routineId)
    .order("exercise_order");

  if (error) throw error;

  return data;
}

export async function addExerciseToRoutine(
  routineId,
  exerciseId
) {
  const { error } = await supabase
    .from("routine_exercises")
    .insert({
      routine_id: routineId,
      exercise_id: exerciseId,
    });

  if (error) throw error;
}

export async function removeExercise(id) {
  const { error } = await supabase
    .from("routine_exercises")
    .delete()
    .eq("id", id);

  if (error) throw error;
}