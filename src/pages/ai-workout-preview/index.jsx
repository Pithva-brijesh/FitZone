import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import useAuth from "../../hooks/useAuth";
import { createRoutine } from "../../services/routineService";
import { addExerciseToRoutine } from "../../services/routineExerciseService";
import { scheduleWorkout } from "../../services/scheduleService";
import { getMLRecommendation } from '../../services/mlRecommendationService';
import {
  Dumbbell,
  Flame,
  Timer,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { generateAIWorkout } from "../../services/aiRecommendationService";

export default function WorkoutPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const aiWorkout = location.state?.aiWorkout;
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedFocus, setSelectedFocus] = useState("Strength");

  const [scheduleDate, setScheduleDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  if (!aiWorkout) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">
            No AI workout found
          </h2>
          <p className="text-muted-foreground mb-6">
            Generate a workout recommendation first.
          </p>
          <button
            onClick={() => navigate("/dashboard-home")}
            className="px-6 py-3 rounded-xl bg-primary text-white"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { recommendation, workout } = aiWorkout;

  const totalExercises = workout.exercises.length;
  const totalSets = workout.exercises.reduce(
    (sum, ex) => sum + (ex.sets || 3),
    0
  );

  const muscleCount = {};
  workout.exercises.forEach((item) => {
    const muscle = item.exercise.muscle_group;
    muscleCount[muscle] = (muscleCount[muscle] || 0) + 1;
  });

  // Difficulty calculation
  const difficultyWeights = {
    Beginner: 1,
    Intermediate: 2,
    Advanced: 3,
  };

  const averageDifficulty =
    workout.exercises.reduce(
      (sum, item) =>
        sum + (difficultyWeights[item.exercise.difficulty] || 1),
      0
    ) / totalExercises;

  const difficultyScore = Math.min(
    10,
    (averageDifficulty / 3) * 10
  ).toFixed(1);

  const totalVolume = workout.exercises.reduce(
    (sum, item) => sum + (item.sets || 3),
    0
  );

  const primaryFocus = Object.entries(muscleCount).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0] || "Full Body";

  const muscleDistribution = Object.entries(muscleCount).map(
    ([muscle, count]) => ({
      muscle,
      count,
      percentage: Math.round((count / totalExercises) * 100),
    })
  );
  const startWorkout = () => {
    navigate("/workout-session", {
      state: { aiWorkout },
    });
  };

  const saveAIRoutine = async () => {
    try {
      const routine = await createRoutine(
        `${workout.title} (AI)`,
        `AI-generated ${workout.title} workout`
      );

      for (let i = 0; i < workout.exercises.length; i++) {
        const item = workout.exercises[i];

        const reps =
          typeof item.reps === "string"
            ? parseInt(item.reps.split("-")[0], 10)
            : item.reps;

        await addExerciseToRoutine(
          routine.id,
          item.exercise.id,
          item.sets,
          reps,
          item.rest,
          i + 1
        );
      }

      alert("AI workout saved successfully!");

      navigate(`/routine/${routine.id}`);
    } catch (err) {
      console.error("SAVE AI ROUTINE ERROR:", err);
      alert(err.message || "Failed to save AI routine");
    }
  };

  const scheduleAIWorkout = async () => {
    try {
      const routine = await createRoutine(
        `${workout.title} (AI)`,
        `AI-generated ${workout.title} workout`
      );

      for (let i = 0; i < workout.exercises.length; i++) {
        const item = workout.exercises[i];

        const reps =
          typeof item.reps === "string"
            ? parseInt(item.reps.split("-")[0], 10)
            : item.reps;

        await addExerciseToRoutine(
          routine.id,
          item.exercise.id,
          item.sets,
          reps,
          item.rest,
          i + 1
        );
      }

      await scheduleWorkout(routine.id, scheduleDate);

      alert(`Workout scheduled for ${scheduleDate}!`);

      navigate("/dashboard-home");
    } catch (err) {
      console.error("SCHEDULE ERROR:", err);
      alert(err.message || "Failed to schedule workout");
    }
  };

  const regenerateWorkout = async () => {
    try {
      const profile = {
        ...user,
        goal:
          selectedFocus === "Strength"
            ? "Gain Strength"
            : selectedFocus === "Fat Loss"
              ? "Lose Weight"
              : selectedFocus === "Endurance"
                ? "Improve Endurance"
                : user.goal,
      };

      const newWorkout = await generateAIWorkout(profile);

      navigate("/ai-workout-preview", {
        replace: true,
        state: {
          aiWorkout: newWorkout,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to regenerate workout");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate("/dashboard-home")}
          className="flex items-center gap-2 text-muted-foreground hover:text-white transition mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="bg-card rounded-3xl border border-border p-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary mb-3">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">AI generated workout</span>
              </div>

              <h1 className="text-5xl font-bold mb-3">
                {workout.title}
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl">
                This workout is personalized using your fitness profile,
                goals, and activity level.
              </p>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl px-5 py-4 text-right">
              <p className="text-sm text-muted-foreground">
                AI confidence
              </p>
              <p className="text-3xl font-bold text-primary">
                {recommendation.confidence}%
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-8">
          <div className="bg-background rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3 text-muted-foreground mb-3">
              <Timer className="w-5 h-5" />
              Duration
            </div>
            <div className="text-3xl font-bold">
              {workout.duration} min
            </div>
          </div>

          <div className="bg-background rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3 text-muted-foreground mb-3">
              <Flame className="w-5 h-5" />
              Calories
            </div>
            <div className="text-3xl font-bold">
              {workout.calories}
            </div>
          </div>

          <div className="bg-background rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3 text-muted-foreground mb-3">
              <Dumbbell className="w-5 h-5" />
              Exercises
            </div>
            <div className="text-3xl font-bold">
              {totalExercises}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-6">
          <div className="bg-background rounded-2xl border border-border p-5">
            <p className="text-sm text-muted-foreground mb-2">
              Total sets
            </p>
            <p className="text-2xl font-bold">
              {totalSets}
            </p>
          </div>

          <div className="bg-background rounded-2xl border border-border p-5">
            <p className="text-sm text-muted-foreground mb-2">
              Muscle groups
            </p>
            <p className="text-2xl font-bold">
              {Object.keys(muscleCount).length}
            </p>
          </div>

          <div className="bg-background rounded-2xl border border-border p-5">
            <p className="text-sm text-muted-foreground mb-2">
              Recovery
            </p>
            <p className="text-2xl font-bold text-green-400">
              {recommendation.recovery}
            </p>
          </div>
        </div>

        <div className="mt-8 bg-background rounded-3xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              Workout difficulty
            </h2>

            <span className="text-2xl font-bold text-primary">
              {difficultyScore}/10
            </span>
          </div>

          <div className="w-full h-3 bg-border rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700"
              style={{ width: `${difficultyScore * 10}%` }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-card rounded-2xl p-5">
              <p className="text-sm text-muted-foreground">
                Total volume
              </p>
              <p className="text-2xl font-bold mt-2">
                {totalVolume} sets
              </p>
            </div>

            <div className="bg-card rounded-2xl p-5">
              <p className="text-sm text-muted-foreground">
                Estimated work time
              </p>
              <p className="text-2xl font-bold mt-2">
                {workout.duration} min
              </p>
            </div>

            <div className="bg-card rounded-2xl p-5">
              <p className="text-sm text-muted-foreground">
                Primary focus
              </p>
              <p className="text-2xl font-bold mt-2">
                {primaryFocus}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">
            Why this workout?
          </h2>

          <div className="space-y-3">
            {recommendation.reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-background rounded-xl border border-border p-4 flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5 text-primary" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Regenerate with focus
          </h2>

          <div className="flex flex-wrap gap-3">
            {["Strength", "Fat Loss", "Endurance", "Quick Workout"].map(
              (focus) => (
                <button
                  key={focus}
                  onClick={() => setSelectedFocus(focus)}
                  className={`px-5 py-3 rounded-xl border transition ${selectedFocus === focus
                    ? "border-primary bg-primary text-white"
                    : "border-border hover:border-primary/40 hover:bg-primary/5"
                    }`}
                >
                  {focus}
                </button>
              )
            )}
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">
            Exercise plan
          </h2>

          <div className="space-y-4">
            {workout.exercises.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSelectedExercise(item)}
                className="bg-background rounded-2xl border border-border p-5 flex items-center justify-between gap-4 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.exercise.image_url}
                    alt={item.exercise.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Exercise {index + 1}
                    </p>
                    <h3 className="font-semibold text-lg">
                      {item.exercise.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.exercise.muscle_group} • {item.exercise.equipment}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    {item.sets} sets
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.reps} reps
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Rest {item.rest}s
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">
            Muscle group distribution
          </h2>

          <div className="bg-background rounded-2xl border border-border p-6 space-y-5">
            {muscleDistribution.map((item) => (
              <div key={item.muscle}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{item.muscle}</span>
                  <span className="text-muted-foreground">
                    {item.count} exercises
                  </span>
                </div>

                <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-700"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>

                <p className="text-sm text-muted-foreground mt-1">
                  {item.percentage}% focus
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 bg-background rounded-2xl border border-border p-6">
          <h2 className="text-xl font-bold mb-4">
            AI coaching tips
          </h2>

          <ul className="space-y-3">
            {recommendation.tips.map((tip, index) => (
              <li
                key={index}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 bg-background rounded-2xl border border-border p-6">
          <h2 className="text-xl font-bold mb-4">
            Schedule this workout
          </h2>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="px-4 py-3 rounded-xl bg-card border border-border text-white w-full md:w-auto"
            />

            <button
              onClick={scheduleAIWorkout}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
            >
              Schedule Workout
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-10">
          <button
            onClick={regenerateWorkout}
            className="flex-1 py-4 rounded-2xl border border-border hover:bg-white/5 transition font-semibold"
          >
            Regenerate Workout
          </button>

          <button
            onClick={saveAIRoutine}
            className="flex-1 py-4 rounded-2xl bg-green-600 text-white hover:scale-[1.02] transition font-semibold"
          >
            Save AI Routine
          </button>

          <button
            onClick={startWorkout}
            className="flex-1 py-4 rounded-2xl bg-primary text-white hover:scale-[1.02] transition font-semibold text-lg"
          >
            Start Workout
          </button>
        </div>

        {selectedExercise && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="bg-card border border-border rounded-3xl max-w-2xl w-full overflow-hidden">
              <img
                src={selectedExercise.exercise.image_url}
                alt={selectedExercise.exercise.name}
                className="w-full h-72 object-cover"
              />

              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold">
                      {selectedExercise.exercise.name}
                    </h2>
                    <p className="text-muted-foreground mt-2">
                      {selectedExercise.exercise.description}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedExercise(null)}
                    className="text-muted-foreground hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-background rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">Muscle group</p>
                    <p className="font-semibold">
                      {selectedExercise.exercise.muscle_group}
                    </p>
                  </div>

                  <div className="bg-background rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">Equipment</p>
                    <p className="font-semibold">
                      {selectedExercise.exercise.equipment}
                    </p>
                  </div>

                  <div className="bg-background rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">Difficulty</p>
                    <p className="font-semibold">
                      {selectedExercise.exercise.difficulty}
                    </p>
                  </div>

                  <div className="bg-background rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">Prescription</p>
                    <p className="font-semibold">
                      {selectedExercise.sets} × {selectedExercise.reps}
                    </p>
                  </div>
                </div>

                <div className="bg-background rounded-2xl p-5 mb-6">
                  <h3 className="font-semibold mb-3">Instructions</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedExercise.exercise.instructions}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedExercise(null)}
                  className="w-full py-4 rounded-2xl bg-primary text-white font-semibold hover:scale-[1.02] transition"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}