import React from "react";
import Icon from "../../../components/AppIcon";

export default function WeeklyActivity({ data = [] }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const weekData = days.map((day) => {
    const item = data.find((workout) => {
      const d = new Date(workout.completed_at).toLocaleDateString(
        "en-US",
        { weekday: "short" }
      );
      return d === day;
    });

    return {
      day,
      workouts: item ? 1 : 0,
      calories: item?.calories || 0,
      duration: item?.duration || 0,
    };
  });

  const maxCalories =
    Math.max(...weekData.map((d) => d.calories), 1);

  const totalWorkouts = weekData.reduce(
    (sum, d) => sum + d.workouts,
    0
  );

  const totalCalories = weekData.reduce(
    (sum, d) => sum + d.calories,
    0
  );

  const totalHours = (
    weekData.reduce((sum, d) => sum + d.duration, 0) / 3600
  ).toFixed(1);

  return (
    <div className="morphic-card bg-card border border-border rounded-3xl p-8">

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon
            name="BarChart3"
            size={24}
            className="text-primary"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Weekly Activity
          </h2>

          <p className="text-muted-foreground">
            Workout summary for this week
          </p>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 h-64">

        {weekData.map((item) => {

          const height =
            (item.calories / maxCalories) * 180;

          return (
            <div
              key={item.day}
              className="flex flex-col items-center flex-1"
            >
              <div className="text-xs text-muted-foreground mb-3">
                {item.calories}
              </div>

              <div
                className="w-full max-w-[45px] rounded-t-xl bg-primary"
                style={{
                  height: `${height}px`,
                  minHeight: item.calories ? "25px" : "8px",
                }}
              />

              <div className="mt-4 font-semibold">
                {item.day}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-10">

        <div className="bg-success/10 rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold text-success">
            {totalWorkouts}
          </div>
          <div className="text-sm text-muted-foreground">
            Workouts
          </div>
        </div>

        <div className="bg-warning/10 rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold text-warning">
            {totalCalories}
          </div>
          <div className="text-sm text-muted-foreground">
            Calories
          </div>
        </div>

        <div className="bg-primary/10 rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {totalHours}h
          </div>
          <div className="text-sm text-muted-foreground">
            Total Time
          </div>
        </div>

      </div>
    </div>
  );
}