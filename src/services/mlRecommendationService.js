export async function getMLRecommendation(profile) {
  const response = await fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      age: profile.age,
      gender: profile.gender,
      height_cm: profile.height_cm,
      weight_kg: profile.weight_kg,
      bmi: profile.bmi,
      goal: profile.goal,
      activity_level: profile.activity_level,
      equipment_access: profile.equipment_access,
      sleep_hours: profile.sleep_hours,
      days_since_last_workout: profile.days_since_last_workout,
      weekly_workouts: profile.weekly_workouts,
      estimated_calories: profile.estimated_calories,
      recovery_score: profile.recovery_score,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get ML recommendation");
  }

  return response.json();
}