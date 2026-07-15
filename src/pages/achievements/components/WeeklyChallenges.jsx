import React from "react";
import Icon from "../../../components/AppIcon";

export default function WeeklyChallenges({ stats = {} }) {
  const workouts = stats.totalWorkouts || 0;
  const calories = stats.totalCalories || 0;
  const hours = stats.totalWorkoutHours || 0;

  const challenges = [
    {
      id: 1,
      title: "Complete 5 Workouts",
      current: workouts,
      goal: 5,
      reward: 500,
      icon: "Dumbbell",
    },
    {
      id: 2,
      title: "Burn 2000 Calories",
      current: calories,
      goal: 2000,
      reward: 400,
      icon: "Flame",
    },
    {
      id: 3,
      title: "Train 10 Hours",
      current: hours,
      goal: 10,
      reward: 350,
      icon: "Clock",
    },
  ];

  return (
    <div className="morphic-card bg-card border border-border rounded-3xl p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold text-foreground">
            Weekly Challenges
          </h2>

          <p className="text-muted-foreground">
            Complete weekly goals for bonus XP.
          </p>

        </div>

        <Icon
          name="CalendarDays"
          size={30}
          className="text-warning"
        />

      </div>

      <div className="space-y-6">

        {challenges.map((challenge) => {
          const progress = Math.min(
            (challenge.current / challenge.goal) * 100,
            100
          );

          const completed = challenge.current >= challenge.goal;

          return (
            <div
              key={challenge.id}
              className="bg-background rounded-2xl p-6"
            >

              <div className="flex justify-between items-center mb-4">

                <div className="flex items-center gap-3">

                  <Icon
                    name={challenge.icon}
                    size={22}
                    className={
                      completed
                        ? "text-success"
                        : "text-warning"
                    }
                  />

                  <div>

                    <h3 className="font-bold text-foreground">
                      {challenge.title}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {challenge.current} / {challenge.goal}
                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <div className="font-bold text-warning">
                    +{challenge.reward} XP
                  </div>

                  <div
                    className={
                      completed
                        ? "text-success text-sm"
                        : "text-primary text-sm"
                    }
                  >
                    {Math.round(progress)}%
                  </div>

                </div>

              </div>

              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">

                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    completed
                      ? "bg-success"
                      : "bg-warning"
                  }`}
                  style={{
                    width: `${progress}%`,
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