import React, { useEffect, useState } from "react";

import Header from "../../components/ui/Header";
import useAuth from "../../hooks/useAuth";

import { getProfile } from "../../services/profileService";
import { getDashboardStats } from "../../services/dashboardService";

import PersonalizedGreeting from "./components/PersonalizedGreeting";
import QuickStatsCard from "./components/QuickStatsCard";
import TrendingContentCard from "./components/TrendingContentCard";
import RecentAchievements from "./components/RecentAchievements";
import QuickActions from "./components/QuickActions";
import LatestWorkoutCard from "./components/LatestWorkoutCard";
import NutritionSummaryCard from "./components/NutritionSummaryCard";
import WeeklyActivityChart from "./components/WeeklyActivityChart";
import AIRecommendationCard from "../../components/ai/AIRecommendationCard";
import { generateAIWorkout } from "../../services/aiRecommendationService";
import { useNavigate } from "react-router-dom";

const quote = {
  text: "Stay strong!",
  author: "FitZone",
};

export default function DashboardHome() {
  const { loading } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [profileData, dashboardStats] = await Promise.all([
          getProfile(),
          getDashboardStats(),
        ]);

        setProfile(profileData);
        setStats(dashboardStats);

        const aiWorkout = await generateAIWorkout(profileData);
        setRecommendation(aiWorkout.recommendation);
      } catch (err) {
        console.error(err);
      }
    }

    loadDashboard();
  }, []);

  const handleStartAIWorkout = async () => {
    try {
      const aiWorkout = await generateAIWorkout(profile);

      console.log("========== AI WORKOUT ==========");
      console.log(JSON.stringify(aiWorkout, null, 2));
      navigate("/ai-workout-preview", {
        state: {
          aiWorkout,
        },
      });

    } catch (error) {
      console.error(error);
      alert("Failed to generate AI workout.");
    }
  };

  if (loading || !profile || !stats || !recommendation) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  const quickStats = {
    weeklyWorkouts: stats.totalWorkouts,
    weeklyTarget: 5,

    totalMinutes: stats.totalMinutes,
    minutesTarget: 300,

    caloriesBurned: stats.totalCalories,
    caloriesTarget: 2000,

    level: profile.level ?? 1,
  };

  const aiRecommendation = {
    title: "Today's AI Recommendation",

    workout:
      profile.goal === "Build Muscle"
        ? "Upper Body Strength"
        : profile.goal === "Weight Loss"
          ? "HIIT Fat Burner"
          : "Full Body Workout",

    reason: `Based on your goal (${profile.goal}), activity level (${profile.activity_level}), and workout history.`,

    confidence: 94,

    duration: 45,

    calories: 420,

    tips: [
      "Warm up for 5 minutes.",
      "Stay hydrated throughout the workout.",
      "Maintain proper form.",
      "Stretch after finishing.",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={profile} />

      <main className="max-w-screen-2xl mx-auto px-6 py-6 space-y-6">

        {/* Greeting */}
        <PersonalizedGreeting
          user={profile}
          streak={profile.streak ?? 0}
          motivationalQuote={quote}
        />

        <AIRecommendationCard
          recommendation={recommendation}
          onStartAIWorkout={handleStartAIWorkout}
          onBuildOwnWorkout={() => navigate("/exercise-catalog")}
        />

        {/* Stats */}
        <QuickStatsCard stats={quickStats} />

        {/* Continue Workout + Latest Workout */}
        <div className="grid lg:grid-cols-2 gap-6">

          <TrendingContentCard
            routine={stats.activeRoutine}
          />

          <LatestWorkoutCard
            workout={stats.latestWorkout}
          />

        </div>

        {/* Achievements + Nutrition */}
        <div className="grid lg:grid-cols-2 gap-6">

          <RecentAchievements
            achievements={stats.achievements.map((a) => ({
              id: a.id,
              title: a.achievement_name,
              description: "Achievement unlocked!",
              type: "workout",
              earnedAt: a.unlocked_at,
              points: 100,
            }))}
          />

          <NutritionSummaryCard
            stats={stats}
          />

        </div>

        {/* Weekly Activity */}
        <WeeklyActivityChart
          data={stats.weeklyActivity}
        />

        {/* Quick Actions */}
        <QuickActions
          user={profile}
          onQuickStart={() => alert("Workout Started")}
        />

        <AIRecommendationCard
          recommendation={recommendation}
          onStartAIWorkout={handleStartAIWorkout}
          onBuildOwnWorkout={() => navigate("/routines")}
        />

      </main>
    </div>
  );
}