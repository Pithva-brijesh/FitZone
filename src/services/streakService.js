import { supabase } from "../lib/supabase";
import { getCurrentUser } from "./authService";

export async function updateWorkoutStreak() {
  const user = await getCurrentUser();

  if (!user) {
    console.log("No logged in user");
    return;
  }

  const { data: workouts, error } = await supabase
    .from("workout_history")
    .select("completed_at")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false });

  if (error) {
    console.error("Workout fetch error:", error);
    return;
  }

  console.log("Workouts:", workouts);

  if (!workouts || workouts.length === 0) return;

  const dates = [
    ...new Set(
      workouts.map((w) =>
        new Date(w.completed_at).toISOString().split("T")[0]
      ),
    ),
  ];

  console.log("Dates:", dates);

  let streak = 1;

  for (let i = 0; i < dates.length - 1; i++) {
    const current = new Date(dates[i]);
    const previous = new Date(dates[i + 1]);

    const diff =
      (current - previous) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  console.log("Calculated streak:", streak);

  const { data, error: updateError } = await supabase
    .from("profiles")
    .update({ streak })
    .eq("id", user.id)
    .select();

  console.log("Update result:", data);

  if (updateError) {
    console.error("Profile update failed:", updateError);
  } else {
    console.log("Profile updated successfully");
  }
}