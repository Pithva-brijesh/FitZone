import React from "react";
import Button from "../ui/Button";
import Icon from "../AppIcon";

export default function AIRecommendationCard({
  recommendation,
  onStartAIWorkout,
  onBuildOwnWorkout,
}) {
  if (!recommendation) return null;

  return (
    <div className="morphic-card bg-card border border-border rounded-3xl p-8">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon
            name="Bot"
            size={24}
            className="text-primary"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {recommendation.title}
          </h2>

          <p className="text-muted-foreground">
            Personalized just for you
          </p>
        </div>

      </div>

      {/* Workout */}

      <div className="bg-background rounded-2xl p-6 mb-6">

        <h3 className="text-3xl font-bold">
          {recommendation.workout}
        </h3>

        <p className="text-muted-foreground mt-2">
          {recommendation.reason}
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-primary/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {recommendation.confidence}%
          </div>
          <div className="text-sm text-muted-foreground">
            Confidence
          </div>
        </div>

        <div className="bg-success/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-success">
            {recommendation.duration}
          </div>
          <div className="text-sm text-muted-foreground">
            Minutes
          </div>
        </div>

        <div className="bg-warning/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-warning">
            {recommendation.calories}
          </div>
          <div className="text-sm text-muted-foreground">
            kcal
          </div>
        </div>

      </div>

      {/* Tips */}

      <div className="mb-8">

        <h4 className="font-semibold mb-3">
          AI Tips
        </h4>

        <div className="space-y-2">

          {recommendation.tips.map((tip, index) => (

            <div
              key={index}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <Icon
                name="CheckCircle2"
                size={16}
                className="text-success"
              />

              {tip}

            </div>

          ))}

        </div>

      </div>

      {/* Buttons */}

      <div className="flex gap-4">

        <Button
          iconName="Sparkles"
          fullWidth
          onClick={onStartAIWorkout}
        >
          Start AI Workout
        </Button>

        <Button
          variant="outline"
          fullWidth
          onClick={onBuildOwnWorkout}
        >
          Build My Own
        </Button>

      </div>

    </div>
  );
}