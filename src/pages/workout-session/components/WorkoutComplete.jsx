import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

export default function WorkoutComplete({
  calories,
  duration,
  xp,
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-10">

      <div className="max-w-4xl w-full bg-card border border-border rounded-3xl p-10 shadow-2xl">

        {/* Success */}

        <div className="flex flex-col items-center">

          <div className="w-36 h-36 rounded-full bg-success/10 border-4 border-success flex items-center justify-center animate-pulse">

            <Icon
              name="CheckCircle2"
              size={90}
              className="text-success"
            />

          </div>

          <h1 className="text-5xl font-bold mt-8">
            Workout Complete!
          </h1>

          <p className="text-muted-foreground mt-3 text-lg">
            Amazing work! You completed your workout.
          </p>

        </div>

        {/* Summary */}

        <div className="grid md:grid-cols-4 gap-6 mt-12">

          <div className="bg-primary/10 rounded-2xl p-6 text-center">

            <Icon
              name="Flame"
              size={34}
              className="mx-auto text-orange-500 mb-3"
            />

            <p className="text-muted-foreground text-sm">
              Calories
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {calories}
            </h2>

          </div>

          <div className="bg-success/10 rounded-2xl p-6 text-center">

            <Icon
              name="Clock3"
              size={34}
              className="mx-auto text-success mb-3"
            />

            <p className="text-muted-foreground text-sm">
              Duration
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {duration}
            </h2>

          </div>

          <div className="bg-warning/10 rounded-2xl p-6 text-center">

            <Icon
              name="Award"
              size={34}
              className="mx-auto text-warning mb-3"
            />

            <p className="text-muted-foreground text-sm">
              XP Earned
            </p>

            <h2 className="text-3xl font-bold mt-2">
              +{xp}
            </h2>

          </div>

          <div className="bg-secondary/10 rounded-2xl p-6 text-center">

            <Icon
              name="Dumbbell"
              size={34}
              className="mx-auto text-secondary mb-3"
            />

            <p className="text-muted-foreground text-sm">
              Status
            </p>

            <h2 className="text-2xl font-bold mt-2">
              Finished
            </h2>

          </div>

        </div>

        {/* Achievement */}

        <div className="mt-10 rounded-3xl border border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-8">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">

              <Icon
                name="Trophy"
                size={34}
                className="text-yellow-400"
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Achievement Unlocked
              </h2>

              <p className="text-muted-foreground mt-1">
                🏅 Workout Warrior
              </p>

            </div>

          </div>

        </div>

        {/* Motivation */}

        <div className="mt-8 bg-background rounded-2xl p-6 border border-border">

          <h3 className="font-bold text-xl mb-3">

            Today's Progress

          </h3>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Workout Completed</span>

              <Icon
                name="CheckCircle2"
                className="text-success"
              />

            </div>

            <div className="flex justify-between">

              <span>Calories Burned</span>

              <span>{calories}</span>

            </div>

            <div className="flex justify-between">

              <span>XP Earned</span>

              <span>+{xp}</span>

            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="grid md:grid-cols-3 gap-4 mt-10">

          <Button
            iconName="House"
            className="h-14"
            onClick={() => navigate("/dashboard-home")}
          >
            Dashboard
          </Button>

          <Button
            variant="outline"
            iconName="History"
            className="h-14"
            onClick={() => navigate("/workout-history")}
          >
            History
          </Button>

          <Button
            variant="secondary"
            iconName="Share2"
            className="h-14"
            onClick={() => alert("Sharing feature coming soon!")}
          >
            Share
          </Button>

        </div>

      </div>

    </div>
  );
}