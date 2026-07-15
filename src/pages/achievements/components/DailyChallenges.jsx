import React from "react";
import Icon from "../../../components/AppIcon";

export default function DailyChallenges({ stats = {} }) {
  const workouts = stats.totalWorkouts || 0;
  const calories = stats.totalCalories || 0;
  const meals = stats.totalMeals || 0;

  const challenges = [
    {
      id: 1,
      title: "Complete 1 Workout",
      progress: Math.min(workouts, 1),
      goal: 1,
      xp: 100,
      icon: "Dumbbell",
    },
    {
      id: 2,
      title: "Burn 300 Calories",
      progress: Math.min(calories, 300),
      goal: 300,
      xp: 150,
      icon: "Flame",
    },
    {
      id: 3,
      title: "Log 3 Meals",
      progress: Math.min(meals, 3),
      goal: 3,
      xp: 100,
      icon: "Utensils",
    },
  ];

  return (
    <div className="morphic-card bg-card border border-border rounded-3xl p-8">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Daily Challenges
          </h2>

          <p className="text-muted-foreground">
            Complete today's goals to earn bonus XP.
          </p>
        </div>

        <Icon
          name="Target"
          size={30}
          className="text-primary"
        />

      </div>

      <div className="space-y-6">

        {challenges.map((challenge) => {
          const completed = challenge.progress >= challenge.goal;

          const percentage =
            (challenge.progress / challenge.goal) * 100;

          return (
            <div
              key={challenge.id}
              className="bg-background rounded-2xl p-5"
            >

              <div className="flex justify-between items-center mb-4">

                <div className="flex items-center gap-3">

                  <Icon
                    name={challenge.icon}
                    size={22}
                    className={
                      completed
                        ? "text-success"
                        : "text-primary"
                    }
                  />

                  <div>

                    <h3 className="font-semibold text-foreground">
                      {challenge.title}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      +{challenge.xp} XP
                    </p>

                  </div>

                </div>

                <span
                  className={`font-bold ${
                    completed
                      ? "text-success"
                      : "text-primary"
                  }`}
                >
                  {challenge.progress}/{challenge.goal}
                </span>

              </div>

              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">

                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    completed
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