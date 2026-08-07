import { calculateBMI, getBMICategory } from "./bmiService";

export function analyzeProfile(profile) {
  const bmi = calculateBMI(
    profile.height,
    profile.weight
  );

  return {
    bmi,

    bmiCategory: getBMICategory(bmi),

    goal: profile.goal,

    activity: profile.activity_level,

    experience: profile.experience_level,

    workoutDays: profile.workout_days,

    location: profile.workout_location,

    equipment: profile.equipment,
  };
}