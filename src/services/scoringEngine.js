export function scoreCandidate(candidate, profile) {
  let score = 0;

  const reasons = [];

  // =========================
  // Goal Match
  // =========================

  if (
    profile.goal === "Build Muscle" &&
    ["Push Day", "Pull Day", "Leg Day", "Upper Body"].includes(candidate)
  ) {
    score += 30;
    reasons.push("Matches your muscle-building goal.");
  }

  if (
    profile.goal === "Lose Weight" &&
    ["HIIT", "Cardio", "Full Body"].includes(candidate)
  ) {
    score += 30;
    reasons.push("Supports calorie burning and fat loss.");
  }

  if (
    profile.goal === "Gain Strength" &&
    ["Upper Body Strength", "Lower Body Strength", "Compound Lifts"].includes(candidate)
  ) {
    score += 30;
    reasons.push("Designed to improve strength.");
  }

  // =========================
  // BMI
  // =========================

  if (profile.bmiCategory === "Overweight") {
    if (candidate === "HIIT" || candidate === "Cardio") {
      score += 15;
      reasons.push("Suitable for your BMI.");
    }
  }

  if (profile.bmiCategory === "Underweight") {
    if (
      candidate.includes("Strength") ||
      candidate === "Push Day" ||
      candidate === "Pull Day" ||
      candidate === "Leg Day"
    ) {
      score += 15;
      reasons.push("Helps increase lean muscle.");
    }
  }

  if (profile.bmiCategory === "Normal") {
    score += 10;
    reasons.push("Your BMI supports balanced training.");
  }

  // =========================
  // Experience
  // =========================

  if (profile.experience === "Beginner") {
    if (
      candidate === "Full Body Workout" ||
      candidate === "Full Body"
    ) {
      score += 20;
      reasons.push("Suitable for beginners.");
    }
  }

  if (profile.experience === "Intermediate") {
    score += 15;
    reasons.push("Matches your experience level.");
  }

  if (profile.experience === "Advanced") {
    score += 20;
    reasons.push("Suitable for advanced training.");
  }

  // =========================
  // Equipment
  // =========================

  if (profile.location === "Gym") {
    score += 10;
    reasons.push("Gym equipment is available.");
  }

  if (profile.location === "Home") {
    if (
      candidate === "HIIT" ||
      candidate === "Full Body Workout"
    ) {
      score += 10;
      reasons.push("Can be performed at home.");
    }
  }

  return {
    candidate,
    score,
    reasons,
  };
}