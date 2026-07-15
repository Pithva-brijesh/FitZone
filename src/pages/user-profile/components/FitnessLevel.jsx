import React from "react";
import Icon from "../../../components/AppIcon";

export default function FitnessLevel({
  user,
  stats,
}) {
  const workouts = stats?.workouts || 0;
  const calories = stats?.calories || 0;
  const hours = stats?.workoutHours || 0;
  const streak = user?.streak || 0;

  const strength = Math.min(100, workouts * 5);

  const cardio = Math.min(
    100,
    Math.round(calories / 50)
  );

  const endurance = Math.min(
    100,
    Math.round(hours * 8)
  );

  const flexibility = Math.min(
    100,
    40 + streak * 2
  );

  const skills = [
    {
      name: "Consistency",
      value: Math.min(
        (stats.workouts || 0) * 10,
        100
      ),
      icon: "Calendar",
      color: "bg-primary",
    },
    {
      name: "Calories",
      value: Math.min(
        (stats.calories || 0) / 50,
        100
      ),
      icon: "Flame",
      color: "bg-red-500",
    },
    {
      name: "Training",
      value: Math.min(
        (stats.workoutHours || 0) * 20,
        100
      ),
      icon: "Clock3",
      color: "bg-success",
    },
    {
      name: "Progress",
      value: Math.min(
        ((stats.workouts || 0) +
          (stats.workoutHours || 0) * 2),
        100
      ),
      icon: "TrendingUp",
      color: "bg-warning",
    },
  ];

  const overall = Math.round(
    skills.reduce((sum, item) => sum + item.value, 0) /
    skills.length
  );

  let feedback =
    "Keep training consistently to improve every area.";

  if (overall >= 80) {
    feedback =
      "Excellent progress! You're building a strong fitness foundation.";
  } else if (overall >= 60) {
    feedback =
      "Great progress. Stay consistent to reach the next level.";
  } else if (overall >= 40) {
    feedback =
      "You're getting started. Keep completing workouts to improve quickly.";
  }

  return (
    <div className="morphic-card bg-card border border-border rounded-3xl p-8">

      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon
            name="TrendingUp"
            size={24}
            className="text-primary"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Fitness Level
          </h2>

          <p className="text-muted-foreground">
            Based on your workout history
          </p>
        </div>

      </div>

      {/* Overall */}

      <div className="bg-primary/10 rounded-2xl p-6 mb-8 text-center">

        <div className="text-5xl font-bold text-primary">
          {overall}%
        </div>

        <div className="text-muted-foreground mt-2">
          Overall Fitness Score
        </div>

      </div>

      {/* Skills */}

      <div className="space-y-6">

        {skills.map((skill) => (

          <div key={skill.name}>

            <div className="flex justify-between items-center mb-2">

              <div className="flex items-center gap-2">

                <Icon
                  name={skill.icon}
                  size={18}
                  className="text-primary"
                />

                <span className="font-medium text-foreground">
                  {skill.name}
                </span>

              </div>

              <span className="font-bold text-foreground">
                {skill.value}%
              </span>

            </div>

            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">

              <div
                className={`${skill.color} h-3 rounded-full transition-all duration-700`}
                style={{
                  width: `${skill.value}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

      {/* Coach Feedback */}

      <div className="mt-8 bg-success/10 rounded-2xl p-5 border border-success/20">

        <div className="flex gap-3">

          <Icon
            name="Sparkles"
            size={20}
            className="text-success"
          />

          <div>

            <h4 className="font-semibold text-foreground">
              Coach Feedback
            </h4>

            <p className="text-sm text-muted-foreground mt-2">
              {feedback}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}