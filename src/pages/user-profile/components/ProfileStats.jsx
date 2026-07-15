import React from "react";
import Icon from "../../../components/AppIcon";

export default function ProfileStats({ user, stats }) {
  const cards = [
    {
      title: "Level",
      value: user?.level ?? 1,
      icon: "TrendingUp",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Calories Burned",
      value: stats?.totalCalories ?? 0,
      icon: "Flame",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      title: "Workout Hours",
      value: (
        (stats?.totalMinutes ?? 0) / 60
      ).toFixed(1),
      icon: "Clock3",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Achievements",
      value: stats?.achievements?.length ?? 0,
      icon: "Award",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="morphic-card bg-card border border-border rounded-2xl p-6 hover:scale-105 transition-all duration-300"
        >
          <div
            className={`w-14 h-14 rounded-xl ${card.bg} flex items-center justify-center mb-5`}
          >
            <Icon
              name={card.icon}
              size={28}
              className={card.color}
            />
          </div>

          <p className="text-sm text-muted-foreground">
            {card.title}
          </p>

          <h2 className="text-3xl font-bold text-foreground mt-2">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}