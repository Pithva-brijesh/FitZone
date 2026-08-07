import { generateCandidates } from "./candidateGenerator";
import { scoreCandidate } from "./scoringEngine";

export function generateRecommendation(profileAnalysis) {
  const candidates = generateCandidates(profileAnalysis);

  const scoredCandidates = candidates.map((candidate) =>
    scoreCandidate(candidate, profileAnalysis)
  );

  scoredCandidates.sort((a, b) => b.score - a.score);

  const best = scoredCandidates[0];

  return {
    title: "Today's AI Recommendation",

    workout: best.candidate,

    confidence: Math.min(best.score, 99),

    score: best.score,

    duration: estimateDuration(best.candidate),

    calories: estimateCalories(best.candidate),

    reasons: best.reasons,

    alternatives: scoredCandidates
      .slice(1, 3)
      .map((item) => item.candidate),

    tips: generateTips(profileAnalysis),

    recovery: "Recovered",
  };
}

function estimateDuration(workout) {
  const durations = {
    "Push Day": 60,
    "Pull Day": 60,
    "Leg Day": 60,
    "Upper Body": 50,
    "Lower Body": 50,
    "Full Body": 45,
    "Full Body Workout": 45,
    HIIT: 30,
    Cardio: 40,
    "Upper Body Strength": 60,
    "Lower Body Strength": 60,
    "Compound Lifts": 70,
  };

  return durations[workout] ?? 45;
}

function estimateCalories(workout) {
  const calories = {
    "Push Day": 480,
    "Pull Day": 470,
    "Leg Day": 520,
    "Upper Body": 430,
    "Lower Body": 450,
    "Full Body": 420,
    "Full Body Workout": 420,
    HIIT: 550,
    Cardio: 450,
    "Upper Body Strength": 500,
    "Lower Body Strength": 520,
    "Compound Lifts": 540,
  };

  return calories[workout] ?? 400;
}

function generateTips(profile) {
  const tips = [];

  switch (profile.goal) {
    case "Build Muscle":
      tips.push("Consume protein within 60 minutes after training.");
      break;

    case "Lose Weight":
      tips.push("Maintain a moderate calorie deficit.");
      break;

    case "Gain Strength":
      tips.push("Increase weight gradually while maintaining proper form.");
      break;

    default:
      tips.push("Stay consistent with your workouts.");
  }

  if (profile.location === "Gym") {
    tips.push("Prioritize compound exercises.");
  }

  if (profile.location === "Home") {
    tips.push("Focus on controlled bodyweight movements.");
  }

  tips.push("Warm up for at least 5–10 minutes.");
  tips.push("Stay hydrated throughout your workout.");

  return tips;
}