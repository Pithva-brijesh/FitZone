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

export default function ProgressTracker() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState("monthly");
  const [isLoading, setIsLoading] = useState(true);

  const [progress, setProgress] = useState(null);

  const mockUser = {
    name: "Alex Chen",
    email: "alex.chen@fitzone.com",
    streak: 12,
    role: "user",
    stats: {
      workouts: 45,
      level: 8,
      points: 2340,
    },
  };

  const overviewData = [
    {
      id: 1,
      label: "Strength Progress",
      value: "85%",
      goal: "100%",
      progress: 85,
      change: "+12%",
      icon: "Dumbbell",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
      progressColor: "bg-primary",
      changeColor: "bg-success/10 text-success",
    },
    {
      id: 2,
      label: "Endurance Level",
      value: "72%",
      goal: "90%",
      progress: 72,
      change: "+8%",
      icon: "Heart",
      bgColor: "bg-success/10",
      iconColor: "text-success",
      progressColor: "bg-success",
      changeColor: "bg-success/10 text-success",
    },
    {
      id: 3,
      label: "Consistency Streak",
      value: "12 Days",
      goal: "30 Days",
      progress: 40,
      change: "+3 Days",
      icon: "Calendar",
      bgColor: "bg-accent/10",
      iconColor: "text-accent",
      progressColor: "bg-accent",
      changeColor: "bg-success/10 text-success",
    },
    {
      id: 4,
      label: "Skill Mastery",
      value: "68%",
      goal: "80%",
      progress: 68,
      change: "+15%",
      icon: "Award",
      bgColor: "bg-secondary/10",
      iconColor: "text-secondary",
      progressColor: "bg-secondary",
      changeColor: "bg-success/10 text-success",
    },
  ];

  const strengthData = [
    { date: "Oct 1", value: 65 },
    { date: "Oct 3", value: 68 },
    { date: "Oct 5", value: 72 },
    { date: "Oct 7", value: 75 },
    { date: "Oct 9", value: 78 },
    { date: "Oct 11", value: 82 },
    { date: "Oct 13", value: 85 },
  ];

  const enduranceData = [
    { date: "Oct 1", value: 45 },
    { date: "Oct 3", value: 52 },
    { date: "Oct 5", value: 58 },
    { date: "Oct 7", value: 63 },
    { date: "Oct 9", value: 67 },
    { date: "Oct 11", value: 70 },
    { date: "Oct 13", value: 72 },
  ];

  const workoutFrequency =
    progress?.workouts?.map((workout, index) => ({
      date: `Workout ${index + 1}`,
      value: workout.calories,
    })) || [];

  const skillsData = [
    {
      id: 1,
      name: "Push-up Form",
      category: "Strength",
      level: 85,
      sessions: 24,
      lastPracticed: "2 days ago",
      icon: "ArrowUp",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
      achievements: ["Perfect Form", "50 Reps"],
    },
    {
      id: 2,
      name: "Running Technique",
      category: "Cardio",
      level: 72,
      sessions: 18,
      lastPracticed: "Yesterday",
      icon: "Zap",
      bgColor: "bg-success/10",
      iconColor: "text-success",
      achievements: ["5K Runner"],
    },
  ];

  const motivationData = {
    weeklyMoods: [
      { date: "8", dayName: "Mon", mood: "good" },
      { date: "9", dayName: "Tue", mood: "excellent" },
      { date: "10", dayName: "Wed", mood: "average" },
      { date: "11", dayName: "Thu", mood: "good" },
      { date: "12", dayName: "Fri", mood: "excellent" },
      { date: "13", dayName: "Sat", mood: "good" },
      { date: "14", dayName: "Sun", mood: null },
    ],
    energyLevels: [
      { date: "Oct 14", time: "9:00 AM", level: 85 },
      { date: "Oct 13", time: "8:30 AM", level: 78 },
      { date: "Oct 12", time: "9:15 AM", level: 92 },
    ],
    goals: [
      {
        id: 1,
        title: "Complete 5 workouts this week",
        dueDate: "Oct 20",
        progress: 80,
        completedTasks: 4,
        totalTasks: 5,
        completed: false,
      },
      {
        id: 2,
        title: "Drink 8 glasses daily",
        dueDate: "Daily",
        progress: 100,
        completedTasks: 8,
        totalTasks: 8,
        completed: true,
      },
    ],
  };

  const achievementsData = [
    {
      id: 1,
      title: "First Workout",
      description: "Complete your first workout",
      category: "strength",
      rarity: "common",
      unlocked: true,
      unlockedDate: "Sep 15",
      isNew: false,
      progress: 100,
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "7-day streak",
      category: "consistency",
      rarity: "rare",
      unlocked: true,
      unlockedDate: "Oct 8",
      isNew: true,
      progress: 100,
    },
    {
      id: 3,
      title: "Strength Master",
      description: "Reach 90%",
      category: "strength",
      rarity: "epic",
      unlocked: false,
      progress: 85,
    },
  ];

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
          user={mockUser}
          onNavigate={(path) => navigate(path)}
        />

        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={mockUser}
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

          <Button>Monthly</Button>
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