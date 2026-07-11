import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/ui/Header";
import useAuth from "../../hooks/useAuth";

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

  return (
    <div className="min-h-screen bg-background">

      <Header
        user={user}
        onNavigate={(path) => navigate(path)}
      />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        <AchievementHeader />

        <div className="grid xl:grid-cols-2 gap-8">

          <XPCard />

          <LevelProgress />

        </div>

        <DailyChallenges />

        <WeeklyChallenges />

        <BadgeGrid />

        <div className="grid xl:grid-cols-2 gap-8">

          <Milestones />

          <Leaderboard />

        </div>

        <AchievementTimeline />

      </main>

    </div>
  );
}