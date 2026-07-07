import React from "react";
import Icon from "../../../components/AppIcon";

export default function ProfileStats({ user }) {
  const stats = [
    {
      title: "Level",
      value: user?.level ?? 1,
      icon: "TrendingUp",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Calories",
      value: user?.calories ?? 0,
      icon: "Flame",
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      title: "Workout Hours",
      value: user?.workout_hours ?? 0,
      icon: "Clock3",
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      title: "Achievements",
      value: user?.achievements ?? 0,
      icon: "Award",
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

      {stats.map((stat) => (

        <div
          key={stat.title}
          className="morphic-card bg-card border border-border rounded-2xl p-6 hover:scale-105 transition-all duration-300"
        >

          <div
            className={`w-14 h-14 rounded-xl ${stat.bg} flex items-center justify-center mb-5`}
          >

            <Icon
              name={stat.icon}
              size={28}
              className={stat.color}
            />

          </div>

          <p className="text-sm text-muted-foreground">
            {stat.title}
          </p>

          <h2 className="text-3xl font-bold text-foreground mt-2">
            {stat.value}
          </h2>

        </div>

      ))}

    </div>
  );
}