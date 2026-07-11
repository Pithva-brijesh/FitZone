import React from "react";
import Icon from "../../../components/AppIcon";

export default function MealCard({
  mealName,
  icon,
  calories,
  protein,
  carbs,
  fat,
  completed = false,
}) {
  return (
    <div
      className={`morphic-card rounded-2xl border p-6 transition-all duration-300 ${
        completed
          ? "bg-card border-success/40"
          : "bg-card border-border"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">

          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              completed
                ? "bg-success/10"
                : "bg-primary/10"
            }`}
          >
            <Icon
              name={icon}
              size={24}
              className={
                completed
                  ? "text-success"
                  : "text-primary"
              }
            />
          </div>

          <div>
            <h3 className="font-bold text-lg text-foreground">
              {mealName}
            </h3>

            <p className="text-sm text-muted-foreground">
              {calories} kcal
            </p>
          </div>

        </div>

        {completed && (
          <Icon
            name="CheckCircle2"
            size={24}
            className="text-success"
          />
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-background rounded-xl p-3 text-center">
          <div className="font-bold text-success">
            {protein}g
          </div>
          <div className="text-xs text-muted-foreground">
            Protein
          </div>
        </div>

        <div className="bg-background rounded-xl p-3 text-center">
          <div className="font-bold text-warning">
            {carbs}g
          </div>
          <div className="text-xs text-muted-foreground">
            Carbs
          </div>
        </div>

        <div className="bg-background rounded-xl p-3 text-center">
          <div className="font-bold text-red-400">
            {fat}g
          </div>
          <div className="text-xs text-muted-foreground">
            Fat
          </div>
        </div>

      </div>
    </div>
  );
}