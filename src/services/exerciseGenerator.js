import { getExercises } from "./exerciseService";

const WORKOUT_MAP = {
    "Push Day": ["Chest", "Shoulders", "Triceps"],

    "Pull Day": ["Back", "Biceps"],

    "Leg Day": ["Legs", "Glutes", "Calves"],

    "Full Body": [
        "Chest",
        "Back",
        "Legs",
        "Shoulders",
        "Core",
    ],

    "Full Body Workout": [
        "Chest",
        "Back",
        "Legs",
        "Shoulders",
        "Core",
    ],

    HIIT: ["Full Body"],

    Cardio: ["Full Body"],
};

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

export async function generateWorkout(recommendation, profile) {
    console.log("Recommendation:", recommendation.workout);

    const workoutName = recommendation.workout.trim();

    console.log("Workout Name:", `"${workoutName}"`);

    const muscles =
        WORKOUT_MAP[workoutName] || [];

    console.log("Muscles:", muscles);
    console.log("Muscles:", muscles);

    const workout = [];

    for (const muscle of muscles) {
        console.log("Searching muscle:", muscle);

        let exercises = await getExercises({
            muscleGroup: muscle,
        });

        console.log("Found", exercises.length, "exercises");
        console.log(exercises);

        if (profile.experience) {
            const filtered = exercises.filter(
                (exercise) =>
                    exercise.difficulty === profile.experience
            );

            console.log("After difficulty filter:", filtered.length);

            if (filtered.length > 0) {
                exercises = filtered;
            }
        }

        exercises = shuffle(exercises);

        workout.push(...exercises.slice(0, 2));
    }

    console.log("Final workout:", workout);

    return {
        title: recommendation.workout,

        exercises: workout,

        estimatedDuration:
            recommendation.duration,

        estimatedCalories:
            recommendation.calories,
    };
}