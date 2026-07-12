import React from "react";
import Icon from "../../../components/AppIcon";
import CircularTimer from "../../../components/ui/CircularTimer";

export default function WorkoutStats({
  exercise,
  reps,
  calories,
  heartRate,
  timeLeft,
  totalTime,
}) {
  const stats = [
    {
      title: "Repetitions",
      value: reps,
      icon: "Repeat",
      color: "text-success",
      bg: "bg-success/10",
      glow: "shadow-green-500/20",
    },
    {
      title: "Calories Burned",
      value: `${calories} kcal`,
      icon: "Flame",
      color: "text-warning",
      bg: "bg-warning/10",
      glow: "shadow-yellow-500/20",
    },
    {
      title: "Heart Rate",
      value: `${heartRate} BPM`,
      icon: "Heart",
      color: "text-red-500",
      bg: "bg-red-500/10",
      glow: "shadow-red-500/20",
      heartbeat: true,
    },
  ];

  return (
    <div className="space-y-8">

      {/* Timer */}

      <div className="morphic-card bg-card border border-border rounded-3xl p-10 flex justify-center items-center shadow-2xl">

        <CircularTimer
          timeLeft={timeLeft}
          totalTime={totalTime}
        />

      </div>

      {/* Stats */}

      <div className="morphic-card bg-card border border-border rounded-3xl p-6">

        <h2 className="text-xl font-bold mb-5">
          Current Exercise
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-background rounded-xl p-4 text-center">
            <p className="text-sm text-muted-foreground">Sets</p>
            <h3 className="text-2xl font-bold">
              {exercise?.sets || "-"}
            </h3>
          </div>

          <div className="bg-background rounded-xl p-4 text-center">
            <p className="text-sm text-muted-foreground">Reps</p>
            <h3 className="text-2xl font-bold">
              {exercise?.reps || "-"}
            </h3>
          </div>

          <div className="bg-background rounded-xl p-4 text-center">
            <p className="text-sm text-muted-foreground">Rest</p>
            <h3 className="text-2xl font-bold">
              {exercise?.rest || 60}s
            </h3>
          </div>

          <div className="bg-background rounded-xl p-4 text-center">
            <p className="text-sm text-muted-foreground">Calories/min</p>
            <h3 className="text-2xl font-bold">
              {exercise?.caloriesPerMinute || 0}
            </h3>
          </div>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {stats.map((stat) => (

          <div
            key={stat.title}
            className={`morphic-card bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl ${stat.glow}`}
          >

            <div
              className={`w-16 h-16 rounded-2xl ${stat.bg} flex items-center justify-center mb-5`}
            >
              <Icon
                name={stat.icon}
                size={30}
                className={`${stat.color} ${stat.heartbeat ? "animate-pulse" : ""
                  }`}
              />
            </div>

            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              {stat.title}
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-2">
              {stat.value}
            </h2>

          </div>

        ))}

      </div>

    </div>
  );
}