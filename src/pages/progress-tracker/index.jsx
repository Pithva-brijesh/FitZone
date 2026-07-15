import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

import MetricsOverview from "./components/MetricsOverview";
import ProgressChart from "./components/ProgressChart";
import SkillTree from "./components/SkillTree";
import MotivationTracker from "./components/MotivationTracker";
import AchievementBadges from "./components/AchievementBadges";
import ExportProgress from "./components/ExportProgress";
import { getProgressData } from "../../services/progressService";
import useAuth from "../../hooks/useAuth";

export default function ProgressTracker() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState("monthly");
  const [isLoading, setIsLoading] = useState(true);

  const [progress, setProgress] = useState(null);

  const { user } = useAuth();

  const totalWorkouts = progress?.workouts?.length || 0;

  const totalCalories =
    progress?.workouts?.reduce(
      (sum, workout) => sum + (workout.calories || 0),
      0
    ) || 0;

  const totalMinutes = Math.floor(
    (progress?.workouts?.reduce(
      (sum, workout) => sum + (workout.duration || 0),
      0
    ) || 0) / 60
  );

  const streak = progress?.profile?.streak || 0;

  const latestWeight =
    progress?.weights?.length > 0
      ? progress.weights.at(-1).weight
      : progress?.profile?.weight ?? "--";

  const overviewData = [
    {
      id: 1,
      label: "Workouts",
      value: totalWorkouts,
      goal: "100",
      progress: Math.min(totalWorkouts, 100),
      change: "+",
      icon: "Dumbbell",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
      progressColor: "bg-primary",
      changeColor: "bg-success/10 text-success",
    },
    {
      id: 2,
      label: "Calories",
      value: totalCalories,
      goal: "5000",
      progress: Math.min((totalCalories / 5000) * 100, 100),
      change: "+",
      icon: "Flame",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-500",
      progressColor: "bg-orange-500",
      changeColor: "bg-success/10 text-success",
    },
    {
      id: 3,
      label: "Minutes",
      value: totalMinutes,
      goal: "300",
      progress: Math.min((totalMinutes / 300) * 100, 100),
      change: "+",
      icon: "Clock",
      bgColor: "bg-green-500/10",
      iconColor: "text-green-500",
      progressColor: "bg-green-500",
      changeColor: "bg-success/10 text-success",
    },
    {
      id: 4,
      label: "Streak",
      value: `${streak} Days`,
      goal: "30 Days",
      progress: Math.min((streak / 30) * 100, 100),
      change: "+",
      icon: "Award",
      bgColor: "bg-yellow-500/10",
      iconColor: "text-yellow-500",
      progressColor: "bg-yellow-500",
      changeColor: "bg-success/10 text-success",
    },
    {
      id: 5,
      label: "Current Weight",
      value:
        latestWeight === "--"
          ? "--"
          : `${latestWeight} kg`,
      goal: "",
      progress: 100,
      change: "",
      icon: "Scale",
      bgColor: "bg-cyan-500/10",
      iconColor: "text-cyan-500",
      progressColor: "bg-cyan-500",
      changeColor: "",
    }
  ];

  const strengthData =
    progress?.weights?.map((weight) => ({
      date: new Date(weight.logged_at).toLocaleDateString(),
      value: weight.weight,
    })) || [];

  const enduranceData =
    progress?.workouts?.map((workout, index) => ({
      date: `Workout ${index + 1}`,
      value: Math.floor((workout.duration || 0) / 60),
    })) || [];

  const workoutFrequency =
    progress?.workouts?.map((workout, index) => ({
      date: `Workout ${index + 1}`,
      value: workout.calories || 0,
    })) || [];

  /* ---------- Temporary Skills ---------- */

  const skillsData = [
    {
      id: 1,
      name: "Workout Consistency",
      category: "Fitness",
      level: Math.min(totalWorkouts * 10, 100),
      sessions: totalWorkouts,
      lastPracticed:
        progress?.workouts?.length > 0
          ? "Recently"
          : "Never",
      icon: "Dumbbell",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
      achievements: [],
    },
  ];

  /* ---------- Temporary Motivation ---------- */

  const motivationData = {
    weeklyMoods: [],
    energyLevels: [],
    goals: [
      {
        id: 1,
        title: "Complete 5 workouts this week",
        dueDate: "This Week",
        progress: Math.min(totalWorkouts * 20, 100),
        completedTasks: totalWorkouts,
        totalTasks: 5,
        completed: totalWorkouts >= 5,
      },
    ],
  };

  /* ---------- Dynamic Achievements ---------- */

  const achievementsData =
    progress?.achievements?.map((achievement) => ({
      id: achievement.id,
      title:
        achievement.achievement_name ||
        achievement.name,
      description: "Achievement unlocked",
      category: "fitness",
      rarity: "common",
      unlocked: true,
      unlockedDate: achievement.unlocked_at
        ? new Date(
          achievement.unlocked_at
        ).toLocaleDateString()
        : "",
      isNew: false,
      progress: 100,
    })) || [];

  const tabs = [
    { id: "overview", label: "Overview", icon: "BarChart3" },
    { id: "physical", label: "Physical", icon: "Activity" },
    { id: "skills", label: "Skills", icon: "Target" },
    { id: "motivation", label: "Motivation", icon: "Heart" },
    { id: "achievements", label: "Achievements", icon: "Award" },
    { id: "export", label: "Export", icon: "Download" },
  ];

  useEffect(() => {

    async function load() {

      try {

        const data = await getProgressData();

        setProgress(data);

      } catch (err) {

        console.error(err);

      } finally {

        setIsLoading(false);

      }

    }

    load();

  }, []);

  const handleExport = (data) => {
    console.log(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          user={user}
          onNavigate={(path) => navigate(path)}
        />

        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (
    progress &&
    progress.workouts.length === 0 &&
    progress.weights.length === 0
  ) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          user={user}
          onNavigate={(path) => navigate(path)}
        />

        <main className="flex items-center justify-center h-[70vh]">
          <div className="bg-card border border-border rounded-3xl p-12 text-center max-w-lg">
            <div className="text-6xl mb-6">📈</div>

            <h2 className="text-3xl font-bold">
              No Progress Yet
            </h2>

            <p className="text-muted-foreground mt-4">
              Complete workouts and log your weight to start tracking your fitness journey.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={user}
        onNavigate={(path) => navigate(path)}
      />

      <main className="container mx-auto max-w-7xl px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Progress Tracker
            </h1>

            <p className="text-muted-foreground mt-2">
              Track your fitness journey
            </p>
          </div>

          <Button
            onClick={() =>
              setViewMode(
                viewMode === "monthly"
                  ? "weekly"
                  : "monthly"
              )
            }
          >
            {viewMode === "monthly"
              ? "Monthly"
              : "Weekly"}
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg ${activeTab === tab.id
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground"
                }`}
            >
              <div className="flex items-center gap-2">
                <Icon name={tab.icon} size={16} />
                {tab.label}
              </div>
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <>
            <MetricsOverview overviewData={overviewData} />

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <ProgressChart
                data={strengthData}
                title="Strength Progress"
                color="#4F46E5"
              />

              <ProgressChart
                data={enduranceData}
                title="Endurance Progress"
                color="#10B981"
              />
            </div>

            <ProgressChart
              type="bar"
              data={workoutFrequency}
              title="Workout Frequency"
              color="#8B5CF6"
            />
          </>
        )}

        {activeTab === "physical" && (
          <ProgressChart
            type="bar"
            data={workoutFrequency}
            title="Workout Frequency"
            color="#F97316"
          />
        )}

        {activeTab === "skills" && (
          <SkillTree skills={skillsData} />
        )}

        {activeTab === "motivation" && (
          <MotivationTracker motivationData={motivationData} />
        )}

        {activeTab === "achievements" && (
          <AchievementBadges achievements={achievementsData} />
        )}

        {activeTab === "export" && (
          <ExportProgress onExport={handleExport} />
        )}
      </main>
    </div>
  );
}