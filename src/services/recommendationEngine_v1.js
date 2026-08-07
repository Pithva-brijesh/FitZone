export function generateRecommendation(profileAnalysis) {
  const workouts = [
    {
      name: "Full Body Workout",
      duration: 45,
      calories: 420,
      difficulty: "Intermediate",
      score: 0,
    },
    {
      name: "Upper Body Strength",
      duration: 50,
      calories: 450,
      difficulty: "Intermediate",
      score: 0,
    },
    {
      name: "Lower Body Strength",
      duration: 45,
      calories: 430,
      difficulty: "Intermediate",
      score: 0,
    },
    {
      name: "HIIT Fat Burner",
      duration: 30,
      calories: 520,
      difficulty: "Advanced",
      score: 0,
    },
    {
      name: "Beginner Mobility",
      duration: 25,
      calories: 180,
      difficulty: "Beginner",
      score: 0,
    },
    {
      name: "Core & Cardio",
      duration: 35,
      calories: 360,
      difficulty: "Intermediate",
      score: 0,
    },
  ];

  workouts.forEach((workout) => {
    // Goal scoring
    if (
      profileAnalysis.goal === "Build Muscle" &&
      workout.name.includes("Strength")
    ) {
      workout.score += 40;
    }

    if (
      profileAnalysis.goal === "Weight Loss" &&
      workout.name.includes("HIIT")
    ) {
      workout.score += 40;
    }

    if (
      profileAnalysis.goal === "Stay Fit" &&
      workout.name.includes("Full Body")
    ) {
      workout.score += 35;
    }

    // BMI scoring
    if (
      profileAnalysis.bmiCategory === "Overweight" &&
      workout.name.includes("HIIT")
    ) {
      workout.score += 20;
    }

    if (
      profileAnalysis.bmiCategory === "Underweight" &&
      workout.name.includes("Strength")
    ) {
      workout.score += 20;
    }

    // Experience scoring
    if (
      profileAnalysis.activity === "Beginner" &&
      workout.difficulty === "Beginner"
    ) {
      workout.score += 30;
    }

    if (
      profileAnalysis.activity === "Intermediate" &&
      workout.difficulty === "Intermediate"
    ) {
      workout.score += 25;
    }

    if (
      profileAnalysis.activity === "Advanced" &&
      workout.difficulty === "Advanced"
    ) {
      workout.score += 30;
    }

    // Small random variation
    workout.score += Math.floor(Math.random() * 8);
  });

  workouts.sort((a, b) => b.score - a.score);

  return workouts[0];
}