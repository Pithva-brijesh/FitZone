import { supabase } from "../lib/supabase";

export async function updateProfile(profile) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not logged in.");

  const { data, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("id", user.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  /* ---------------- Profile ---------------- */

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) throw profileError;

  /* ---------------- Workout History ---------------- */

  const { data: workouts } = await supabase
    .from("workout_history")
    .select("*")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false });


  /* ---------------- Calculations ---------------- */

  const totalCalories =
    workouts?.reduce(
      (sum, workout) => sum + (workout.calories || 0),
      0
    ) || 0;

  const totalWorkoutSeconds =
    workouts?.reduce(
      (sum, workout) => sum + (workout.duration || 0),
      0
    ) || 0;

  const totalWorkoutHours =
    Number((totalWorkoutSeconds / 3600).toFixed(1));

  const achievements = [];

  if ((workouts?.length || 0) >= 1) {
    achievements.push({
      id: 1,
      name: "First Workout",
    });
  }

  if ((workouts?.length || 0) >= 5) {
    achievements.push({
      id: 2,
      name: "5 Workouts",
    });
  }

  if ((workouts?.length || 0) >= 10) {
    achievements.push({
      id: 3,
      name: "10 Workouts",
    });
  }

  if (totalCalories >= 500) {
    achievements.push({
      id: 4,
      name: "500 Calories Burned",
    });
  }

  if (totalWorkoutHours >= 5) {
    achievements.push({
      id: 5,
      name: "5 Workout Hours",
    });
  }

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 6);

  const weeklyWorkouts =
    workouts?.filter(
      (workout) =>
        new Date(workout.completed_at) >= weekAgo
    ) || [];

  return {
    ...profile,

    // Normalize fields used throughout the app
    name: profile.full_name,
    email: profile.email,

    workouts: workouts || [],
    weeklyWorkouts,
    achievements,
    calories: totalCalories,
    workout_hours: totalWorkoutHours,
    achievementCount: achievements.length,
  };
}