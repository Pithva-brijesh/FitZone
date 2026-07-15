import React from "react";
import Icon from "../../../components/AppIcon";

export default function Leaderboard({ stats = {}, profile = {} }) {
  const level = profile.level || 1;
  const streak = profile.streak || 0;

  const workouts = stats.totalWorkouts || 0;
  const calories = stats.totalCalories || 0;
  const achievements = stats.totalAchievements || 0;

  const xp = achievements * 100;

  const items = [
    {
      label: "Current Level",
      value: `Level ${level}`,
      icon: "TrendingUp",
      color: "text-primary",
    },
    {
      label: "Achievements",
      value: achievements,
      icon: "Award",
      color: "text-warning",
    },
    {
      label: "Total Workouts",
      value: workouts,
      icon: "Dumbbell",
      color: "text-success",
    },
    {
      label: "Calories Burned",
      value: calories,
      icon: "Flame",
      color: "text-orange-500",
    },
    {
      label: "Current XP",
      value: xp,
      icon: "Star",
      color: "text-yellow-500",
    },
    {
      label: "Workout Streak",
      value: `${streak} Days`,
      icon: "Calendar",
      color: "text-red-500",
    },
  ];

  return (
    <div className="morphic-card bg-card border border-border rounded-3xl p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Your Fitness Summary
          </h2>

          <p className="text-muted-foreground">
            A snapshot of your progress.
          </p>
        </div>

        <Icon
          name="Trophy"
          size={30}
          className="text-warning"
        />

      </div>

      <div className="space-y-4">

        {items.map((item) => (

          <div
            key={item.label}
            className="bg-background rounded-2xl p-5 flex justify-between items-center"
          >

            <div className="flex items-center gap-4">

              <Icon
                name={item.icon}
                size={24}
                className={item.color}
              />

              <span className="font-semibold text-foreground">
                {item.label}
              </span>

            </div>

            <span className="font-bold text-primary">
              {item.value}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}