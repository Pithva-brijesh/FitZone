import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/ui/Header";
import useAuth from "../../hooks/useAuth";

import { getAchievements } from "../../services/achievementService";
import { getProgressData } from "../../services/progressService";

import AchievementHeader from "./components/AchievementHeader";
import XPCard from "./components/XPCard";
import LevelProgress from "./components/LevelProgress";
import BadgeGrid from "./components/BadgeGrid";
import DailyChallenges from "./components/DailyChallenges";
import WeeklyChallenges from "./components/WeeklyChallenges";
import Milestones from "./components/Milestones";
import Leaderboard from "./components/Leaderboard";
import AchievementTimeline from "./components/AchievementTimeline";

export default function Achievements() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [achievements, setAchievements] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [achievementData, progressData] =
          await Promise.all([
            getAchievements(),
            getProgressData(),
          ]);

        setAchievements(achievementData || []);
        setProgress(progressData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading || !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Achievements...
      </div>
    );
  }

  const totalWorkouts = progress.workouts.length;

  const totalCalories = progress.workouts.reduce(
    (sum, workout) => sum + (workout.calories || 0),
    0
  );

  const totalWorkoutHours = Number(
    (
      progress.workouts.reduce(
        (sum, workout) => sum + (workout.duration || 0),
        0
      ) / 3600
    ).toFixed(1)
  );

  const totalMeals = 0; // Update later when meal tracking is connected

  return (
    <div className="min-h-screen bg-background">

      <Header
        user={user}
        onNavigate={(path) => navigate(path)}
      />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        <AchievementHeader />

        <div className="grid xl:grid-cols-2 gap-8">

          <XPCard achievements={achievements} />

          <LevelProgress achievements={achievements} />

        </div>

        <DailyChallenges
          stats={{
            totalWorkouts,
            totalCalories,
            totalMeals,
          }}
        />

        <WeeklyChallenges
          stats={{
            totalWorkouts,
            totalCalories,
            totalWorkoutHours,
          }}
        />

        <BadgeGrid
          achievements={achievements}
        />

        <div className="grid xl:grid-cols-2 gap-8">

          <Milestones
            stats={{
              totalWorkouts,
              totalCalories,
              totalWorkoutHours,
            }}
          />

          <Leaderboard
            profile={progress.profile}
            stats={{
              totalWorkouts,
              totalCalories,
              totalAchievements:
                achievements.length,
            }}
          />

        </div>

        <AchievementTimeline
          achievements={achievements}
        />

      </main>

    </div>
  );
}