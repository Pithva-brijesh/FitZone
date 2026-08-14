const API_URL =
  import.meta.env.VITE_ML_API_URL ||
  "https://fitzone-ai-qryu.onrender.com";

export async function getMLRecommendation(profile) {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      age: profile.age ?? 21,
      gender: profile.gender ?? "Male",
      height_cm: profile.height_cm ?? 180,
      weight_kg: profile.weight_kg ?? 75,
      bmi: profile.bmi ?? 23,
      goal: profile.goal ?? "Build Muscle",
      activity_level: profile.activity_level ?? "Intermediate",
      equipment_access: profile.equipment_access ?? "Gym",
      sleep_hours: profile.sleep_hours ?? 7.5,
      days_since_last_workout: profile.days_since_last_workout ?? 1,
      weekly_workouts: profile.weekly_workouts ?? 4,
      estimated_calories: profile.estimated_calories ?? 450,
      recovery_score: profile.recovery_score ?? 8,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get ML recommendation");
  }

  return response.json();
}