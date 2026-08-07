import { supabase } from "../lib/supabase";

export async function getExercises(filters = {}) {
  let query = supabase
    .from("exercises")
    .select("*");

  if (filters.muscleGroup) {
    query = query.eq(
      "muscle_group",
      filters.muscleGroup
    );
  }

  if (filters.difficulty) {
    query = query.eq(
      "difficulty",
      filters.difficulty
    );
  }

  if (filters.equipment) {
    query = query.eq(
      "equipment",
      filters.equipment
    );
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
}