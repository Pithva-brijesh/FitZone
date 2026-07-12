import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";

import Header from "../../components/ui/Header";
import ExerciseVideoPlayer from "./components/ExerciseVideoPlayer";
import ExerciseInformation from "./components/ExerciseInformation";
import ExerciseActions from "./components/ExerciseActions";
import useAuth from "../../hooks/useAuth";

export default function ExerciseDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [exercise, setExercise] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    async function loadExercise() {
      setLoading(true);

      const { data, error } = await supabase
        .from("exercises")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setExercise(data);
      }

      setLoading(false);
    }

    if (id) {
      loadExercise();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="animate-pulse text-2xl">
        Loading Exercise...
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        The exercise may have been removed.
      </div>
    );
  }

  const exerciseData = {
    ...exercise,

    thumbnail:
      exercise.image_url ||
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200",

    thumbnailAlt: exercise.name,

    videoUrl: "",

    duration: `${exercise.calories_per_min} Cal/min`,

    instructions: exercise.instructions
      ? exercise.instructions
        .split(".")
        .map((step) => step.trim())
        .filter(Boolean)
      : [],

    primaryMuscles: exercise.muscle_group
      ? [exercise.muscle_group]
      : [],

    secondaryMuscles: [],

    equipment:
      exercise.equipment && exercise.equipment !== "None"
        ? [{ name: exercise.equipment }]
        : [],

    safetyTips: [
      "Warm up before starting.",
      "Maintain proper posture.",
      "Avoid sudden movements.",
      "Stop immediately if you feel pain.",
    ],
  };

  function handleBookmark(id, bookmarked) {
    console.log(id, bookmarked);
  }

  function handleShare(id, platform) {
    console.log(id, platform);
  }

  function handleStartWorkout(exercise) {
    console.log(exercise);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={user}
        onNavigate={(path) => navigate(path)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}

        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">

          <button
            onClick={() => navigate("/dashboard-home")}
            className="hover:text-foreground"
          >
            Dashboard
          </button>

          <span>/</span>

          <button
            onClick={() => navigate("/exercise-catalog")}
            className="hover:text-foreground"
          >
            Exercises
          </button>

          <span>/</span>

          <span className="text-foreground font-medium">
            {exerciseData.name}
          </span>

        </nav>

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">

          <div>

            <h1 className="text-4xl font-bold text-foreground">
              {exerciseData.name}
            </h1>

            <div className="flex gap-6 mt-3 text-sm text-muted-foreground">

              <span>🏋 {exerciseData.category}</span>

              <span>📈 {exerciseData.difficulty}</span>

              <span>🔥 {exerciseData.calories_per_min} Cal/min</span>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8">

            <ExerciseVideoPlayer
              exercise={exerciseData}
            />

            <ExerciseInformation
              exercise={exerciseData}
            />

          </div>

          <div className="space-y-8">

            <ExerciseActions
              exercise={exerciseData}
              onBookmark={handleBookmark}
              onShare={handleShare}
              onStartWorkout={handleStartWorkout}
            />

          </div>

        </div>

      </main>

    </div>
  );
}