import React from "react";
import BadgeCard from "./BadgeCard";

export default function BadgeGrid({ achievements = [] }) {
  const badgeTemplates = [
    {
      id: 1,
      name: "First Workout",
      description: "Complete your first workout.",
      icon: "Award",
      xp: 100,
    },
    {
      id: 2,
      name: "5 Workouts",
      description: "Complete five workouts.",
      icon: "Flame",
      xp: 300,
    },
    {
      id: 3,
      name: "10 Workouts",
      description: "Complete ten workouts.",
      icon: "Dumbbell",
      xp: 500,
    },
    {
      id: 4,
      name: "500 Calories Burned",
      description: "Burn 500 calories.",
      icon: "Flame",
      xp: 400,
    },
    {
      id: 5,
      name: "5 Workout Hours",
      description: "Train for five total hours.",
      icon: "Clock",
      xp: 500,
    },
    {
      id: 6,
      name: "30 Day Streak",
      description: "Maintain a 30-day streak.",
      icon: "Calendar",
      xp: 1000,
    },
  ];

  const badges = badgeTemplates.map((badge) => ({
    ...badge,
    unlocked: achievements.some(
      (a) => a.achievement_name === badge.name
    ),
  }));

  return (
    <div className="morphic-card bg-card border border-border rounded-3xl p-8">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold text-foreground">
            Achievement Badges
          </h2>

          <p className="text-muted-foreground">
            Unlock badges by completing challenges and milestones.
          </p>

        </div>

      </div>

      {/* Grid */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {badges.map((badge) => (

          <BadgeCard
            key={badge.id}
            badge={badge}
          />

        ))}

      </div>

    </div>
  );
}