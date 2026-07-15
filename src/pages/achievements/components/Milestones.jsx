import React from "react";
import Icon from "../../../components/AppIcon";

export default function Milestones({ stats = {} }) {
  const workouts = stats.totalWorkouts || 0;
  const calories = stats.totalCalories || 0;
  const hours = stats.totalWorkoutHours || 0;

  const milestones = [
    {
      id: 1,
      title: "First Workout",
      completed: workouts >= 1,
      progress: Math.min(workouts, 1),
      goal: 1,
      xp: 100,
    },
    {
      id: 2,
      title: "5 Workouts",
      completed: workouts >= 5,
      progress: Math.min(workouts, 5),
      goal: 5,
      xp: 300,
    },
    {
      id: 3,
      title: "10 Workouts",
      completed: workouts >= 10,
      progress: Math.min(workouts, 10),
      goal: 10,
      xp: 500,
    },
    {
      id: 4,
      title: "500 Calories Burned",
      completed: calories >= 500,
      progress: Math.min(calories, 500),
      goal: 500,
      xp: 400,
    },
    {
      id: 5,
      title: "5 Workout Hours",
      completed: hours >= 5,
      progress: Math.min(hours, 5),
      goal: 5,
      xp: 500,
    },
  ];

  return (
    <div className="morphic-card bg-card border border-border rounded-3xl p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold text-foreground">
            Milestones
          </h2>

          <p className="text-muted-foreground">
            Your fitness milestones.
          </p>

        </div>

        <Icon
          name="Flag"
          size={30}
          className="text-success"
        />

      </div>

      <div className="space-y-5">

        {milestones.map((milestone) => {

          const percentage =
            (milestone.progress / milestone.goal) * 100;

          return (

            <div
              key={milestone.id}
              className="bg-background rounded-2xl p-5"
            >

              <div className="flex justify-between items-center mb-3">

                <div className="flex items-center gap-3">

                  <Icon
                    name={
                      milestone.completed
                        ? "CheckCircle2"
                        : "Circle"
                    }
                    size={24}
                    className={
                      milestone.completed
                        ? "text-success"
                        : "text-muted-foreground"
                    }
                  />

                  <div>

                    <h3 className="font-semibold text-foreground">
                      {milestone.title}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {milestone.progress} / {milestone.goal}
                    </p>

                  </div>

                </div>

                <span className="font-bold text-warning">
                  +{milestone.xp} XP
                </span>

              </div>

              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">

                <div
                  className={`h-full rounded-full ${
                    milestone.completed
                      ? "bg-success"
                      : "bg-primary"
                  }`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}