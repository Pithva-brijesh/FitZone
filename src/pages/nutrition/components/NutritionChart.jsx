import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function NutritionChart({
  meals = [],
}) {
  const chart = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date();

    day.setDate(day.getDate() - i);

    const key = day.toISOString().split("T")[0];

    const calories = meals
      .filter(
        (meal) =>
          meal.created_at.split("T")[0] === key
      )
      .reduce(
        (sum, meal) =>
          sum + (meal.calories || 0),
        0
      );

    chart.push({
      day: day.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      calories,
    });
  }

  return (
    <div className="morphic-card bg-card border border-border rounded-3xl p-8">

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-foreground">
          Weekly Nutrition
        </h2>

        <p className="text-muted-foreground">
          Calories consumed during the last 7 days
        </p>

      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={chart}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#30345A"
            />

            <XAxis
              dataKey="day"
              stroke="#94A3B8"
            />

            <YAxis
              stroke="#94A3B8"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="calories"
              stroke="#6366F1"
              strokeWidth={4}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}