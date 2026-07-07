import React from "react";
import Icon from "../../../components/AppIcon";

export default function PersonalInfo({ user }) {
  const details = [
    {
      icon: "User",
      label: "Full Name",
      value: user?.name || user?.full_name || "-",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: "Mail",
      label: "Email",
      value: user?.email || "-",
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      icon: "Calendar",
      label: "Age",
      value: user?.age ? `${user.age} Years` : "-",
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      icon: "Users",
      label: "Gender",
      value: user?.gender || "-",
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      icon: "Ruler",
      label: "Height",
      value: user?.height ? `${user.height} cm` : "-",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: "Weight",
      label: "Weight",
      value: user?.weight ? `${user.weight} kg` : "-",
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      icon: "Target",
      label: "Goal Weight",
      value: user?.goalWeight
        ? `${user.goalWeight} kg`
        : user?.goal_weight
        ? `${user.goal_weight} kg`
        : "-",
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      icon: "BadgeCheck",
      label: "Fitness Level",
      value: user?.activity_level || "Beginner",
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <div className="morphic-card bg-card border border-border rounded-3xl p-8">

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon
            name="UserCircle"
            size={24}
            className="text-primary"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Personal Information
          </h2>

          <p className="text-muted-foreground">
            Your personal fitness profile
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {details.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 p-5 rounded-2xl bg-muted hover:bg-muted/70 transition"
          >

            <div
              className={`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center`}
            >
              <Icon
                name={item.icon}
                size={24}
                className={item.color}
              />
            </div>

            <div>

              <div className="text-sm text-muted-foreground">
                {item.label}
              </div>

              <div className="text-lg font-semibold text-foreground mt-1">
                {item.value}
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}