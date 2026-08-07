import { analyzeProfile } from "./profileAnalyzer";
import { generateRecommendation } from "./recommendationEngine";
import { generateWorkout } from "./exerciseGenerator";
import { buildWorkout } from "./workoutBuilder";

export async function generateAIWorkout(profile) {
  if (!profile) return null;

  // Step 1
  const analysis = analyzeProfile(profile);

  // Step 2
  const recommendation = generateRecommendation(analysis);

  // Step 3
  const exercises = await generateWorkout(
    recommendation,
    analysis
  );

  // Step 4
  const workout = buildWorkout(
    exercises.exercises,
    recommendation
  );

  return {
    analysis,
    recommendation,
    workout,
  };
}