import { supabase } from "../lib/supabase";
import { getCurrentUser } from "./authService";

export async function addMeal(meal) {
  const user = await getCurrentUser();

  const { error } = await supabase
    .from("meal_logs")
    .insert({
      user_id: user.id,
      meal_type: meal.mealType,
      food_name: meal.food,
      calories: Number(meal.calories) || 0,
      protein: Number(meal.protein) || 0,
      carbs: Number(meal.carbs) || 0,
      fat: Number(meal.fat) || 0,
      notes: meal.notes,
    });

  if (error) throw error;
}

export async function getMeals() {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("meal_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function deleteMeal(id) {
  const { error } = await supabase
    .from("meal_logs")
    .delete()
    .eq("id", id);

  if (error) throw error;
}