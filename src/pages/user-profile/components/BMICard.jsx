import React from "react";
import Icon from "../../../components/AppIcon";

export default function BMICard({ user }) {
  const height = Number(user?.height);
  const weight = Number(user?.weight);

  let bmi = "--";
  let status = "Not Available";
  let color = "text-muted-foreground";
  let bg = "bg-muted";
  let advice =
    "Complete your profile to receive your BMI analysis.";

  if (height > 0 && weight > 0) {
    bmi = (
      weight /
      Math.pow(height / 100, 2)
    ).toFixed(1);

    if (bmi < 18.5) {
      status = "Underweight";
      color = "text-warning";
      bg = "bg-warning/10";
      advice =
        "Increase your calorie and protein intake while following a strength program.";
    } else if (bmi < 25) {
      status = "Healthy";
      color = "text-success";
      bg = "bg-success/10";
      advice =
        "Great job! Maintain your current routine and balanced nutrition.";
    } else if (bmi < 30) {
      status = "Overweight";
      color = "text-warning";
      bg = "bg-warning/10";
      advice =
        "Focus on cardio, strength training, and maintaining a calorie deficit.";
    } else {
      status = "Obese";
      color = "text-red-500";
      bg = "bg-red-500/10";
      advice =
        "Consult a healthcare professional and begin a gradual fitness plan.";
    }
  }

  return (
    <div className="morphic-card bg-card border border-border rounded-3xl p-8">

      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon
            name="HeartPulse"
            size={24}
            className="text-primary"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground">
            BMI Overview
          </h2>

          <p className="text-muted-foreground">
            Body Mass Index Analysis
          </p>
        </div>

      </div>

      <div className="text-center py-6">

        <div className="text-6xl font-bold text-primary">
          {bmi}
        </div>

        <div
          className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full ${bg}`}
        >
          <Icon
            name="BadgeCheck"
            size={18}
            className={color}
          />

          <span className={`${color} font-semibold`}>
            {status}
          </span>

        </div>

      </div>

      <div className="bg-muted rounded-2xl p-5 mt-6">

        <div className="flex justify-between mb-3">

          <span className="text-muted-foreground">
            Healthy BMI Range
          </span>

          <span className="font-semibold text-foreground">
            18.5 – 24.9
          </span>

        </div>

        <div className="w-full bg-background rounded-full h-3 overflow-hidden">
          <div className="w-3/4 bg-success h-3 rounded-full"></div>
        </div>

      </div>

      <div className="mt-6 bg-primary/5 rounded-2xl p-5 border border-primary/20">

        <div className="flex items-start gap-3">

          <Icon
            name="Lightbulb"
            size={20}
            className="text-primary mt-1"
          />

          <div>

            <h4 className="font-semibold text-foreground">
              Recommendation
            </h4>

            <p className="text-sm text-muted-foreground mt-2">
              {advice}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}