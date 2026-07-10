import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/ui/Header";
import WorkoutHeader from "./components/WorkoutHeader";
import WorkoutVideo from "./components/WorkoutVideo";
import WorkoutStats from "./components/WorkoutStats";
import WorkoutControls from "./components/WorkoutControls";
import ExerciseQueue from "./components/ExerciseQueue";
import WorkoutComplete from "./components/WorkoutComplete";

import { getRoutineExercises } from "../../services/routineExerciseService";
import { saveWorkout } from "../../services/workoutHistoryService";
import { checkAchievements } from "../../services/achievementChecker";

export default function WorkoutSession() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);

  const [isCompleted, setIsCompleted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [timeLeft, setTimeLeft] = useState(30);
  const [isPaused, setIsPaused] = useState(false);

  const [calories, setCalories] = useState(0);
  const [heartRate, setHeartRate] = useState(95);
  const [repsCompleted, setRepsCompleted] = useState(0);

  const user = {
    name: "Alex Chen",
    streak: 12,
  };

  useEffect(() => {
    loadExercises();
  }, []);

  async function loadExercises() {
    try {
      const data = await getRoutineExercises(id);

      const formatted = (data || []).map((item) => ({
        id: item.exercises.id,
        name: item.exercises.name,
        duration: 30,
        reps: item.reps || 10,
        image:
          item.exercises.image_url ||
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200",
      }));

      setExercises(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const currentExercise = exercises[currentIndex] || {
    duration: 30,
    reps: 10,
    name: "",
    image: "",
  };

  useEffect(() => {
    if (!currentExercise) return;

    setTimeLeft(currentExercise.duration);
    setIsPaused(false);
    setRepsCompleted(0);
  }, [currentExercise]);

  const nextExercise = async () => {
    setIsPaused(false);

    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      try {
        console.log("Saving workout...");

        await saveWorkout({
          routineId: id,
          calories,
          duration: exercises.length * 30,
        });

        await checkAchievements();

        console.log("✅ Workout saved successfully");
      } catch (err) {
        console.error("❌ SAVE ERROR:", err);
        alert(err.message);
      }

      setIsCompleted(true);
    }
  };

  const skipExercise = () => {
    nextExercise();
  };

  useEffect(() => {
    if (loading) return;
    if (isPaused || isCompleted) return;

    if (timeLeft <= 0) {
      nextExercise();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isPaused, isCompleted, loading]);

  useEffect(() => {
    if (loading) return;
    if (isPaused || isCompleted) return;

    const metrics = setInterval(() => {
      setCalories((prev) => prev + 1);

      setHeartRate((prev) => {
        const random = Math.floor(Math.random() * 5) - 2;
        return Math.max(90, Math.min(150, prev + random));
      });

      setRepsCompleted((prev) => {
        if (prev < currentExercise.reps) {
          return prev + 1;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(metrics);
  }, [currentExercise, isPaused, isCompleted, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        No exercises in this routine.
      </div>
    );
  }

  if (isCompleted) {
    return (
      <WorkoutComplete
        calories={calories}
        duration={`${exercises.length * 30} sec`}
        xp={350}
        onBack={() => navigate("/dashboard-home")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onNavigate={(path) => navigate(path)} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <WorkoutHeader
          current={currentIndex + 1}
          total={exercises.length}
          exercise={currentExercise}
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <WorkoutVideo exercise={currentExercise} />

            <WorkoutStats
              timer={`00:${String(timeLeft).padStart(2, "0")}`}
              reps={`${repsCompleted} / ${currentExercise.reps}`}
              calories={calories}
              heartRate={heartRate}
            />

            <WorkoutControls
              onPause={() => setIsPaused(true)}
              onResume={() => setIsPaused(false)}
              onSkip={skipExercise}
              onFinish={nextExercise}
            />
          </div>

          <div>
            <ExerciseQueue
              exercises={exercises.map((exercise, index) => ({
                ...exercise,
                completed: index < currentIndex,
                current: index === currentIndex,
              }))}
              currentIndex={currentIndex}
            />
          </div>
        </div>
      </main>
    </div>
  );
}