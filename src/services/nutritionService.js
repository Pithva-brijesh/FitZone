import { supabase } from "../lib/supabase";
import { getCurrentUser } from "./authService";

// ---------------- ADD MEAL ----------------

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

// ---------------- GET MEALS ----------------

export async function getMeals() {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("meal_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data || [];
}

// ---------------- DELETE MEAL ----------------

export async function deleteMeal(id) {
  const { error } = await supabase
    .from("meal_logs")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// ---------------- SUMMARY ----------------

export async function getNutritionSummary() {
  const meals = await getMeals();

  console.log("ALL MEALS:", meals);

  const today = new Date().toLocaleDateString("sv-SE");

  const todaysMeals = meals.filter(
    (meal) =>
      meal.created_at &&
      meal.created_at.split("T")[0] === today
  );

  console.log("TODAY:", today);
  console.log("TODAY'S MEALS:", todaysMeals);

  const calories = todaysMeals.reduce(
    (sum, meal) => sum + Number(meal.calories || 0),
    0
  );

  const protein = todaysMeals.reduce(
    (sum, meal) => sum + Number(meal.protein || 0),
    0
  );

  const carbs = todaysMeals.reduce(
    (sum, meal) => sum + Number(meal.carbs || 0),
    0
  );

  const fat = todaysMeals.reduce(
    (sum, meal) => sum + Number(meal.fat || 0),
    0
  );

  return {
    meals,
    todaysMeals,
    calories,
    protein,
    carbs,
    fat,
  };
}