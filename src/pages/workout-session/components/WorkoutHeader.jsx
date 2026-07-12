import React from "react";
import Icon from "../../../components/AppIcon";

export default function WorkoutHeader({
  routine,
  exercise,
  current,
  total,
  currentSet,
}) {
  const progress = (current / total) * 100;

  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">

      {/* Top */}
      <div className="flex flex-col lg:flex-row justify-between gap-8">

        <div className="flex-1">

          <p className="text-primary font-semibold mb-2">
            Workout Session
          </p>

          <h1 className="text-4xl font-bold">
            {exercise.name}
          </h1>

          <p className="text-muted-foreground mt-2">
            {exercise.description}
          </p>

          <p className="text-primary font-semibold mt-2">
            Set {currentSet} / {exercise.sets}
          </p>

        </div>

        <div className="lg:w-96">

          <div className="flex justify-between mb-2 text-sm">
            <span>
              Exercise {current} of {total}
            </span>

            <span>
              {Math.round(progress)}%
            </span>

          </div>

          <div className="h-3 bg-muted rounded-full overflow-hidden">

            <div
              className="bg-primary h-full transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      </div>

      {/* Exercise Info */}

      <div className="grid md:grid-cols-4 gap-4 mt-8">

        <div className="bg-background rounded-xl p-4">

          <div className="flex items-center gap-2 text-primary mb-2">
            <Icon name="Target" size={18} />
            Muscle
          </div>

          <div className="font-semibold">
            {exercise.muscle_group}
          </div>

        </div>

        <div className="bg-background rounded-xl p-4">

          <div className="flex items-center gap-2 text-primary mb-2">
            <Icon name="BarChart3" size={18} />
            Difficulty
          </div>

          <div className="font-semibold">
            {exercise.difficulty}
          </div>

        </div>

        <div className="bg-background rounded-xl p-4">

          <div className="flex items-center gap-2 text-primary mb-2">
            <Icon name="Dumbbell" size={18} />
            Equipment
          </div>

          <div className="font-semibold">
            {exercise.equipment}
          </div>

        </div>

        <div className="bg-background rounded-xl p-4">

          <div className="flex items-center gap-2 text-primary mb-2">
            <Icon name="Flame" size={18} />
            Calories
          </div>

          <div className="font-semibold">
            {exercise.caloriesPerMinute} cal/min
          </div>

        </div>

      </div>

      {/* Instructions */}

      <div className="mt-8">

        <h3 className="font-bold text-xl mb-3">
          Instructions
        </h3>

        <div className="bg-background rounded-xl p-5 text-muted-foreground leading-8">

          {exercise.instructions}

        </div>

      </div>

    </div>
  );
}