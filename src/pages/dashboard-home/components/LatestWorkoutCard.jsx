import React from "react";
import { useNavigate } from "react-router-dom";

import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

export default function LatestWorkoutCard({ workout }) {
  const navigate = useNavigate();

  if (!workout) {
    return (
      <div className="bg-card rounded-2xl border border-border p-8 text-center">

        <Icon
          name="History"
          size={48}
          className="mx-auto text-primary mb-4"
        />

        <h2 className="text-2xl font-bold">
          No Workout Yet
        </h2>

        <p className="text-muted-foreground mt-2">
          Complete your first workout to build your history.
        </p>

        <Button
          className="mt-6"
          onClick={() => navigate("/workout-routines")}
        >
          Start Training
        </Button>

      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl border border-border p-8 morphic-card">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-primary font-semibold">
            LATEST WORKOUT
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {workout.routines?.name || "Workout"}
          </h2>

          <p className="text-muted-foreground mt-2">
            {new Date(workout.completed_at).toLocaleString()}
          </p>

        </div>

        <Icon
          name="Flame"
          size={50}
          className="text-orange-500"
        />

      </div>

      <div className="grid grid-cols-2 gap-5 mt-8">

        <div className="bg-background rounded-xl p-5">

          <p className="text-sm text-muted-foreground">
            Calories
          </p>

          <h3 className="text-3xl font-bold mt-2">
            🔥 {workout.calories}
          </h3>

        </div>

        <div className="bg-background rounded-xl p-5">

          <p className="text-sm text-muted-foreground">
            Duration
          </p>

          <h3 className="text-3xl font-bold mt-2">
            ⏱ {Math.floor(workout.duration / 60)} min
          </h3>

        </div>

      </div>

      <Button
        className="w-full mt-8"
        iconName="History"
        onClick={() => navigate("/workout-history")}
      >
        View History
      </Button>

    </div>
  );
}