import React, { useEffect, useState } from "react";

import Header from "../../components/ui/Header";
import useAuth from "../../hooks/useAuth";

import { getProfile } from "../../services/profileService";
import { getDashboardStats } from "../../services/dashboardService";

import PersonalizedGreeting from "./components/PersonalizedGreeting";
import QuickStatsCard from "./components/QuickStatsCard";
import TrendingContentCard from "./components/TrendingContentCard";
import RecentAchievements from "./components/RecentAchievements";
import UpcomingChallenges from "./components/UpcomingChallenges";
import QuickActions from "./components/QuickActions";
import PersonalBadges from "./components/PersonalBadges";

const quote = {
  text: "Stay strong!",
  author: "FitZone",
};

const content = {
  id: 1,
  type: "exercise",
  title: "HIIT Workout",
  description: "20-minute fat-burning HIIT session",
  image:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600",
  imageAlt: "Workout",
  likes: 1200,
  views: 5500,
  difficulty: 2,
  author: "FitZone",
};


const upcomingChallenges = [
  {
    id: 1,
    title: "30-Day Plank Challenge",
    description: "Build core strength with daily planks.",
    currentProgress: 15,
    target: 30,
    unit: "days",
    difficulty: "intermediate",
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    participants: 2500,
    reward: "500 pts",
  },
];

const personalBadges = [
  {
    id: 1,
    name: "Streak Master",
    description: "10+ day streak",
    category: "streak",
    rarity: "rare",
  },
  {
    id: 2,
    name: "HIIT Champion",
    description: "Completed 25 HIIT workouts",
    category: "fitness",
    rarity: "epic",
  },
];

const currentGoals = [
  {
    id: 1,
    title: "Lose Weight",
    description: "Target by next month",
    type: "weight",
    current: 6,
    target: 10,
    unit: "kg",
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
  },
];

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

  console.log(profile);

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

      <main className="w-full max-w-screen-2xl mx-auto px-6 py-6 space-y-6">
        <PersonalizedGreeting
          user={profile}
          streak={profile.streak ?? 0}
          motivationalQuote={quote}
        />

        <QuickStatsCard stats={quickStats} />

        <TrendingContentCard
          content={content}
          type="exercise"
        />

        <RecentAchievements
          achievements={stats.achievements.map((a) => ({
            id: a.id,
            title: a.achievement_name,
            description: "Achievement unlocked!",
            type: "workout",
            earnedAt: a.created_at,
            points: 100,
          }))}
        />

        <UpcomingChallenges
          challenges={upcomingChallenges}
        />

        <QuickActions
          user={profile}
          onQuickStart={() => alert("Workout Started")}
        />

        <PersonalBadges
          badges={personalBadges}
          currentGoals={currentGoals}
        />
      </main>
    </div>
  );
}