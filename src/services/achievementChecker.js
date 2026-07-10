import { getWorkoutHistory } from "./workoutHistoryService";
import { unlockAchievement } from "./achievementService";

export async function checkAchievements() {

    const history = await getWorkoutHistory();

    const totalWorkouts = history.length;

    const totalCalories = history.reduce(
        (sum, workout) => sum + workout.calories,
        0
    );

    if (totalWorkouts >= 1)
        await unlockAchievement("🏅 First Workout");

    if (totalWorkouts >= 5)
        await unlockAchievement("💪 Consistent");

    if (totalWorkouts >= 10)
        await unlockAchievement("🏋️ Workout Warrior");

    if (totalCalories >= 1000)
        await unlockAchievement("🔥 Calorie Burner");
}