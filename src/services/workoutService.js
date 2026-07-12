import { saveWorkout } from "./workoutHistoryService";
import { checkAchievements } from "./achievementChecker";

export function calculateWorkoutDuration(exercises) {
  return exercises.reduce(
    (total, exercise) => total + (exercise.duration || 30),
    0
  );
}

export function calculateWorkoutCalories(exercises) {
  return exercises.reduce(
    (total, exercise) => total + (exercise.calories_per_min || 8),
    0
  );
}

export function calculateXP(exercises) {
  return exercises.length * 50;
}

export async function finishWorkout({
  routineId,
  exercises,
  calories,
}) {
  const duration = calculateWorkoutDuration(exercises);

  await saveWorkout({
    routineId,
    calories,
    duration,
  });

  await checkAchievements();

  return {
    duration,
    xp: calculateXP(exercises),
  };
}