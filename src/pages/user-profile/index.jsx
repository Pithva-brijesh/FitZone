import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/ui/Header";
import ProfileHeader from "./components/ProfileHeader";
import ProfileStats from "./components/ProfileStats";
import PersonalInfo from "./components/PersonalInfo";
import BMICard from "./components/BMICard";
import GoalCard from "./components/GoalCard";
import WeeklyActivity from "./components/WeeklyActivity";
import FitnessLevel from "./components/FitnessLevel";
import AchievementPreview from "./components/AchievementPreview";

import { getProfile } from "../../services/profileService";

export default function UserProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getProfile();

        setUser({
          ...profile,

          name: profile.full_name,
          goalWeight: profile.goal_weight,

          level: profile.level ?? 1,
          streak: profile.streak ?? 0,

          avatar: profile.avatar_url || null,

          calories: profile.calories,
          workout_hours: profile.workout_hours,
          achievements: profile.achievementCount,
        });

        setStats({
          totalWorkouts: profile.workouts.length,
          totalCalories: profile.calories,
          workoutHours: profile.workout_hours,

          weeklyActivity: profile.weeklyWorkouts,

          achievements: profile.achievements,
        });

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Profile not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={user}
        onNavigate={(path) => navigate(path)}
      />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        <ProfileHeader user={user} />

        <ProfileStats
          user={user}
          stats={stats}
        />

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8">

            <PersonalInfo user={user} />

            <WeeklyActivity
              data={stats?.weeklyActivity || []}
            />

            <AchievementPreview
              user={user}
              achievements={stats?.achievements || []}
            />

          </div>

          <div className="space-y-8">

            <BMICard user={user} />

            <GoalCard user={user} />

            <FitnessLevel
              user={user}
              stats={{
                workouts: stats?.totalWorkouts || 0,
                calories: stats?.totalCalories || 0,
                workoutHours: stats?.workoutHours || 0,
              }}
            />

          </div>

        </div>

      </main>
    </div>
  );
}