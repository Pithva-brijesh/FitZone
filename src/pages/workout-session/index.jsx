import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import Header from "../../components/ui/Header";
import WorkoutHeader from "./components/WorkoutHeader";
import WorkoutVideo from "./components/WorkoutVideo";
import WorkoutStats from "./components/WorkoutStats";
import WorkoutControls from "./components/WorkoutControls";
import ExerciseQueue from "./components/ExerciseQueue";
import WorkoutComplete from "./components/WorkoutComplete";
import { getRoutine } from "../../services/routineService";
import ExerciseInfo from "./components/ExerciseInfo";


import { getRoutineExercises } from "../../services/routineExerciseService";
import {
  finishWorkout,
  calculateXP,
} from "../../services/workoutService";
import useAuth from "../../hooks/useAuth";

export default function WorkoutSession() {
  const navigate = useNavigate();
  const { id } = useParams();

  const location = useLocation();

  const aiWorkout = location.state?.aiWorkout;

  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);

  const [isCompleted, setIsCompleted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [timeLeft, setTimeLeft] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);

  const [calories, setCalories] = useState(0);
  const [heartRate, setHeartRate] = useState(95);
  const [repsCompleted, setRepsCompleted] = useState(0);

  const [routine, setRoutine] = useState(null);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(60);

  const { user, refreshUser } = useAuth();

  useEffect(() => {
    if (aiWorkout) {
      loadAIWorkout();
    } else {
      loadWorkout();
    }
  }, [id]);

  async function loadAIWorkout() {
    try {
      setRoutine({
        name: aiWorkout.workout.title,
      });

      const formatted = aiWorkout.workout.exercises.map((item) => ({
        id: item.exercise.id,

        name: item.exercise.name,

        description: item.exercise.description,

        instructions: item.exercise.instructions,

        difficulty: item.exercise.difficulty,

        muscle_group: item.exercise.muscle_group,

        equipment: item.exercise.equipment,

        caloriesPerMinute: item.exercise.calories_per_min,

        duration: 30,

        reps: item.reps,

        sets: item.sets,

        rest: item.rest,

        image:
          item.exercise.image_url ||
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200",
      }));

      console.log("========== AI WORKOUT ==========");
      console.log(aiWorkout);

      console.log("========== FORMATTED ==========");
      console.log(formatted);

      setExercises(formatted);
    } catch (err) {
      console.error("AI Workout Error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function loadWorkout() {
    try {
      const routineData = await getRoutine(id);

      setRoutine(routineData);

      await loadExercises();
    } catch (err) {
      console.error(err);
    }
  }



  async function loadExercises() {
    try {
      const data = await getRoutineExercises(id);

      const formatted = (data || []).map((item) => ({
        id: item.exercises.id,

        name: item.exercises.name,

        description: item.exercises.description,

        instructions: item.exercises.instructions,

        difficulty: item.exercises.difficulty,

        muscle_group: item.exercises.muscle_group,

        equipment: item.exercises.equipment,

        caloriesPerMinute: item.exercises.calories_per_min,

        duration: 30,

        reps: item.reps || 10,

        sets: item.sets || 3,

        rest: item.rest_time || 60,

        image:
          item.exercises.image_url ||
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200",
      }));
      console.log("Formatted exercises:");
      console.log(formatted);

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

    setTimeLeft(currentExercise.duration || 30);
    setIsPaused(false);
    setRepsCompleted(0);
    setCurrentSet(1);

  }, [currentIndex]);

  const nextExercise = async () => {
    setIsPaused(false);

    // Start rest after finishing current exercise
    if (!isResting) {
      setRestTime(currentExercise.rest || 60);
      setIsResting(true);
      return;
    }

    // Move to next exercise
    setIsResting(false);
    setRestTime(60);

    if (currentSet < currentExercise.sets) {
      setCurrentSet((prev) => prev + 1);
      setTimeLeft(currentExercise.duration || 30);
      setRepsCompleted(0);
      return;
    }

    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    try {
      const result = await finishWorkout({
        routineId: id,
        exercises,
        calories,
      });

      // Refresh the logged-in user's profile
      // so the latest streak/xp/level are loaded
      await refreshUser();

      console.log("Workout Finished", result);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    setIsCompleted(true);
  };

  const skipExercise = () => {
    nextExercise();
  };

  useEffect(() => {
    if (loading) return;
    if (isPaused) return;
    if (isCompleted) return;
    if (isResting) return;

    if (timeLeft <= 0) {
      nextExercise();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    timeLeft,
    isPaused,
    isCompleted,
    isResting,
    loading,
  ]);

  useEffect(() => {
    if (!isResting) return;

    if (restTime <= 0) {
      nextExercise();
      return;
    }

    const timer = setTimeout(() => {
      setRestTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [restTime, isResting]);



  useEffect(() => {
    if (loading) return;
    if (isPaused || isCompleted || isResting) return;

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
  }, [
    currentExercise,
    isPaused,
    isCompleted,
    isResting,
    loading,
  ]);

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

  if (isResting) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} />

        <main className="max-w-3xl mx-auto py-20 px-6">

          <div className="bg-card rounded-3xl border border-border p-10 text-center">

            <h1 className="text-5xl font-bold mb-4">
              💪 Rest Time
            </h1>

            <p className="text-muted-foreground text-lg mb-8">
              Recover before your next exercise
            </p>

            <div className="text-8xl font-bold text-primary mb-10">
              {restTime}
            </div>

            <div className="bg-background rounded-2xl p-8 mb-8 border border-border">

              <p className="text-primary font-semibold mb-4">
                NEXT EXERCISE
              </p>

              {exercises[currentIndex + 1] ? (

                <>

                  <img
                    src={exercises[currentIndex + 1].image}
                    alt={exercises[currentIndex + 1].name}
                    className="w-full h-52 object-cover rounded-xl mb-6"
                  />

                  <h2 className="text-3xl font-bold mb-4">
                    {exercises[currentIndex + 1].name}
                  </h2>

                  <div className="grid grid-cols-2 gap-4">

                    <div className="bg-card rounded-xl p-4">

                      <p className="text-sm text-muted-foreground">
                        Muscle
                      </p>

                      <p className="font-semibold">
                        {exercises[currentIndex + 1].muscle_group}
                      </p>

                    </div>

                    <div className="bg-card rounded-xl p-4">

                      <p className="text-sm text-muted-foreground">
                        Sets × Reps
                      </p>

                      <p className="font-semibold">
                        {exercises[currentIndex + 1].sets} × {exercises[currentIndex + 1].reps}
                      </p>

                    </div>

                  </div>

                </>

              ) : (

                <h2 className="text-3xl font-bold">
                  Workout Complete 🎉
                </h2>

              )}

            </div>

            <button
              onClick={() => {
                setRestTime(0);
              }}
              className="px-8 py-4 rounded-xl bg-primary text-white hover:scale-105 transition"
            >
              Skip Rest
            </button>

          </div>

        </main>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <WorkoutComplete
        calories={calories}
        duration={`${exercises.length * 30} sec`}
        xp={calculateXP(exercises)}
        onBack={() => navigate("/dashboard-home")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onNavigate={(path) => navigate(path)} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <WorkoutHeader
          routine={routine}
          current={currentIndex + 1}
          total={exercises.length}
          currentSet={currentSet}
          exercise={currentExercise}
        />
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <ExerciseInfo exercise={currentExercise} />

            <WorkoutVideo exercise={currentExercise} />

            <WorkoutStats
              reps={`${repsCompleted} / ${currentExercise.reps}`}
              calories={calories}
              heartRate={heartRate}
              timeLeft={timeLeft}
              totalTime={currentExercise.duration}
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