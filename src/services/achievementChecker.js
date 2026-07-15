import { getWorkoutHistory } from "./workoutHistoryService";
import { unlockAchievement } from "./achievementService";

export async function checkAchievements() {
  const history = await getWorkoutHistory();

  const totalWorkouts = history.length;

  const totalCalories = history.reduce(
    (sum, workout) => sum + (workout.calories || 0),
    0
  );

  const totalDuration = history.reduce(
    (sum, workout) => sum + (workout.duration || 0),
    0
  );

  const totalHours = totalDuration / 3600;

  if (totalWorkouts >= 1)
    await unlockAchievement("First Workout");

  if (totalWorkouts >= 5)
    await unlockAchievement("5 Workouts");

  if (totalWorkouts >= 10)
    await unlockAchievement("10 Workouts");

  if (totalCalories >= 500)
    await unlockAchievement("500 Calories Burned");

  if (totalHours >= 5)
    await unlockAchievement("5 Workout Hours");

  // Uncomment later when streak tracking is implemented
  // if (profile.streak >= 30)
  //   await unlockAchievement("30 Day Streak");
}