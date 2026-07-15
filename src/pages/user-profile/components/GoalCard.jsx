import React from "react";
import Icon from "../../../components/AppIcon";

export default function GoalCard({ user }) {
  const currentWeight = Number(user?.weight || 0);
  const goalWeight = Number(
    user?.goalWeight ?? user?.goal_weight ?? 0
  );

  const fitnessGoal =
    user?.fitness_goal || "Stay Fit";

  let remaining = "--";
  let progress = 0;

  if (currentWeight > 0 && goalWeight > 0) {
    remaining = Math.abs(
      currentWeight - goalWeight
    ).toFixed(1);

    const difference = Math.abs(
      currentWeight - goalWeight
    );

    progress = Math.round(
      ((currentWeight - difference) / currentWeight) *
        100
    );

    progress = Math.max(
      0,
      Math.min(progress, 100)
    );
  }

  return (
    <div className="morphic-card bg-card border border-border rounded-3xl p-8">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon
            name="Target"
            size={24}
            className="text-primary"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Fitness Goal
          </h2>

          <p className="text-muted-foreground">
            Stay focused every day
          </p>
        </div>

      </div>

      {/* Progress */}

      <div className="mb-8">

        <div className="flex justify-between mb-3">

          <span className="text-muted-foreground">
            Goal Progress
          </span>

          <span className="font-bold text-primary">
            {progress}%
          </span>

        </div>

        <div className="w-full h-4 rounded-full bg-muted overflow-hidden">

          <div
            className="h-4 rounded-full bg-primary transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Weight Cards */}

      <div className="grid grid-cols-2 gap-4 mb-8">

        <div className="bg-success/10 rounded-2xl p-5 text-center">

          <div className="text-sm text-muted-foreground">
            Current
          </div>

          <div className="text-3xl font-bold text-success mt-2">
            {currentWeight || "--"}
          </div>

          <div className="text-xs text-muted-foreground mt-1">
            kg
          </div>

        </div>

        <div className="bg-warning/10 rounded-2xl p-5 text-center">

          <div className="text-sm text-muted-foreground">
            Target
          </div>

          <div className="text-3xl font-bold text-warning mt-2">
            {goalWeight || "--"}
          </div>

          <div className="text-xs text-muted-foreground mt-1">
            kg
          </div>

        </div>

      </div>

      {/* Goal Details */}

      <div className="space-y-4">

        <div className="flex justify-between">

          <span className="text-muted-foreground">
            Remaining
          </span>

          <span className="font-semibold text-foreground">
            {remaining} kg
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-muted-foreground">
            Goal
          </span>

          <span className="font-semibold text-foreground">
            {fitnessGoal}
          </span>

        </div>

      </div>

      {/* Motivation */}

      <div className="mt-8 rounded-2xl bg-primary/5 border border-primary/20 p-5">

        <div className="flex gap-3">

          <Icon
            name="Sparkles"
            size={22}
            className="text-primary mt-1"
          />

          <div>

            <h4 className="font-semibold text-foreground">
              Daily Motivation
            </h4>

            <p className="text-sm text-muted-foreground mt-2">
              Every workout brings you one step closer to your goal.
              Stay consistent and trust the process!
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}