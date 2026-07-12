import React from "react";
import Icon from "../../../components/AppIcon";

export default function ExerciseInfo({ exercise }) {
  if (!exercise) return null;

  const instructions =
    exercise.description?.split(".").filter(Boolean) || [];

  return (
    <div className="bg-card border border-border rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Exercise Details
      </h2>

      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div className="bg-background rounded-xl p-4">

          <div className="flex items-center gap-2 mb-2">

            <Icon
              name="Target"
              size={18}
              className="text-primary"
            />

            <span className="font-medium">
              Muscle
            </span>

          </div>

          <p>{exercise.muscle_group}</p>

        </div>

        <div className="bg-background rounded-xl p-4">

          <div className="flex items-center gap-2 mb-2">

            <Icon
              name="BarChart3"
              size={18}
              className="text-warning"
            />

            <span className="font-medium">
              Difficulty
            </span>

          </div>

          <p>{exercise.difficulty}</p>

        </div>

        <div className="bg-background rounded-xl p-4">

          <div className="flex items-center gap-2 mb-2">

            <Icon
              name="Dumbbell"
              size={18}
              className="text-success"
            />

            <span className="font-medium">
              Equipment
            </span>

          </div>

          <p>{exercise.equipment}</p>

        </div>

      </div>

      <h3 className="text-xl font-semibold mb-4">
        Instructions
      </h3>

      <div className="space-y-3">

        {instructions.length > 0 ? (
          instructions.map((step, index) => (
            <div
              key={index}
              className="flex gap-3"
            >
              <Icon
                name="CheckCircle2"
                className="text-success mt-1"
                size={18}
              />

              <p>{step.trim()}</p>

            </div>
          ))
        ) : (
          <p className="text-muted-foreground">
            No instructions available.
          </p>
        )}

      </div>

    </div>
  );
}