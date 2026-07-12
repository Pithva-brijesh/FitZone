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

const quote = {
  text: "Stay strong!",
  author: "FitZone",
};

export default function DashboardHome() {
  const { loading } = useAuth();

  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [profileData, dashboardStats] = await Promise.all([
          getProfile(),
          getDashboardStats(),
        ]);

        setProfile(profileData);
        setStats(dashboardStats);
      } catch (err) {
        console.error(err);
      }
    }

    loadDashboard();
  }, []);

  if (loading || !profile || !stats) {
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

      </main>
    </div>
  );
}