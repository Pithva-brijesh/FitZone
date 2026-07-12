import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function NutritionSummaryCard({ stats }) {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-3xl border border-border p-8 morphic-card">

      <div className="flex items-center justify-between mb-8">

        <div>

          <p className="text-primary font-semibold">
            TODAY'S NUTRITION
          </p>

          <h2 className="text-3xl font-bold mt-2">
            Nutrition Summary
          </h2>

        </div>

        <Icon
          name="Apple"
          size={44}
          className="text-green-500"
        />

      </div>

      <div className="space-y-5">

        <NutritionRow
          icon="Beef"
          title="Protein"
          value={`${stats.totalProtein} g`}
          color="text-red-500"
        />

        <NutritionRow
          icon="Wheat"
          title="Carbs"
          value={`${stats.totalCarbs} g`}
          color="text-yellow-500"
        />

        <NutritionRow
          icon="Droplets"
          title="Fat"
          value={`${stats.totalFat} g`}
          color="text-blue-500"
        />

        <NutritionRow
          icon="Flame"
          title="Calories"
          value={`${stats.totalCalories}`}
          color="text-orange-500"
        />

      </div>

      <Button
        className="w-full mt-8"
        iconName="Utensils"
        onClick={() => navigate("/nutrition")}
      >
        Open Nutrition
      </Button>

    </div>
  );
}

function NutritionRow({
  icon,
  title,
  value,
  color,
}) {
  return (
    <div className="flex items-center justify-between bg-background rounded-xl p-4">

      <div className="flex items-center gap-3">

        <Icon
          name={icon}
          size={22}
          className={color}
        />

        <span>{title}</span>

      </div>

      <span className="font-bold">
        {value}
      </span>

    </div>
  );
}