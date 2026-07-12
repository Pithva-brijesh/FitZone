import { supabase } from "../lib/supabase";
import { getCurrentUser } from "./authService";

export async function getDashboardStats() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const [
    { data: workouts, error: workoutError },
    { data: routines, error: routineError },
    { data: achievements, error: achievementError },
    { data: meals, error: mealError },
  ] = await Promise.all([
    supabase
      .from("workout_history")
      .select(`
        *,
        routines (
          name
        )
      `)
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false }),

    supabase
      .from("routines")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),

    supabase
      .from("achievements")
      .select("*")
      .eq("user_id", user.id)
      .order("unlocked_at", { ascending: false }),

    supabase
      .from("meal_logs")
      .select("*")
      .eq("user_id", user.id),
  ]);

  if (workoutError) throw workoutError;
  if (routineError) throw routineError;
  if (achievementError) throw achievementError;
  if (mealError) throw mealError;

  // ================================
  // Workout Statistics
  // ================================

  const totalCalories = (workouts || []).reduce(
    (sum, workout) => sum + (workout.calories || 0),
    0
  );

  const totalMinutes = Math.floor(
    (workouts || []).reduce(
      (sum, workout) => sum + (workout.duration || 0),
      0
    ) / 60
  );

  // ================================
  // Nutrition Statistics
  // ================================

  const totalProtein = (meals || []).reduce(
    (sum, meal) => sum + (meal.protein || 0),
    0
  );

  const totalCarbs = (meals || []).reduce(
    (sum, meal) => sum + (meal.carbs || 0),
    0
  );

  const totalFat = (meals || []).reduce(
    (sum, meal) => sum + (meal.fat || 0),
    0
  );

  // ================================
  // Latest Workout
  // ================================

  const latestWorkout =
    workouts && workouts.length > 0
      ? workouts[0]
      : null;

  // ================================
  // Active Routine
  // ================================

  const activeRoutine =
    routines && routines.length > 0
      ? routines[0]
      : null;

  // ================================
  // Weekly Activity
  // ================================

  const weeklyActivity = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date();
    day.setDate(day.getDate() - i);

    const dateKey = day.toISOString().split("T")[0];

    const dayWorkouts = (workouts || []).filter((w) => {
      if (!w.completed_at) return false;

      const completed = new Date(w.completed_at)
        .toISOString()
        .split("T")[0];

      return completed === dateKey;
    });

    weeklyActivity.push({
      day: day.toLocaleDateString("en-US", {
        weekday: "short",
      }),

      workouts: dayWorkouts.length,

      calories: dayWorkouts.reduce(
        (sum, w) => sum + (w.calories || 0),
        0
      ),

      minutes: Math.floor(
        dayWorkouts.reduce(
          (sum, w) => sum + (w.duration || 0),
          0
        ) / 60
      ),
    });
  }

  // ================================
  // Averages
  // ================================

  const averageCalories =
    workouts && workouts.length > 0
      ? Math.round(totalCalories / workouts.length)
      : 0;

  const averageWorkoutTime =
    workouts && workouts.length > 0
      ? Math.round(totalMinutes / workouts.length)
      : 0;

  // ================================
  // Return Dashboard Data
  // ================================

  return {
    totalWorkouts: workouts?.length || 0,
    totalCalories,
    totalMinutes,

    totalRoutines: routines?.length || 0,

    latestWorkout,

    activeRoutine,

    totalProtein,
    totalCarbs,
    totalFat,

    weeklyActivity,

    averageCalories,
    averageWorkoutTime,

    achievements: achievements || [],
  };
}