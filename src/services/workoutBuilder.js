export function buildWorkout(exercises, recommendation) {
  const workoutExercises = exercises.map((exercise, index) => ({
    id: exercise.id,
    order: index + 1,
    exercise,
    sets: getSets(exercise.difficulty),
    reps: getReps(exercise.difficulty),
    rest: getRest(exercise.difficulty),
  }));

  return {
    title: recommendation.workout,
    duration: recommendation.duration,
    calories: recommendation.calories,
    confidence: recommendation.confidence,
    exercises: workoutExercises,
  };
}

function getSets(level) {
  switch (level) {
    case "Beginner":
      return 3;
    case "Intermediate":
      return 4;
    case "Advanced":
      return 5;
    default:
      return 3;
  }
}

function getReps(level) {
  switch (level) {
    case "Beginner":
      return "12-15";
    case "Intermediate":
      return "10-12";
    case "Advanced":
      return "6-8";
    default:
      return "10-12";
  }
}

function getRest(level) {
  switch (level) {
    case "Beginner":
      return 45;
    case "Intermediate":
      return 60;
    case "Advanced":
      return 90;
    default:
      return 60;
  }
}