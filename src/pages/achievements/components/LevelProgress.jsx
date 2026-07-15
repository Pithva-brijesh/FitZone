import React from "react";
import Icon from "../../../components/AppIcon";

export default function LevelProgress({ achievements = [] }) {
  const badgeCount = achievements.length;

  // 100 XP per achievement
  const totalXP = badgeCount * 100;

  const currentLevel = Math.floor(totalXP / 1000) + 1;

  const currentLevelXP = (currentLevel - 1) * 1000;
  const nextLevelXP = currentLevel * 1000;

  const progress =
    ((totalXP - currentLevelXP) /
      (nextLevelXP - currentLevelXP)) *
      100 || 0;

  const rewards = [
    {
      level: currentLevel + 1,
      reward: "Fitness Badge",
    },
    {
      level: currentLevel + 2,
      reward: "Workout Master",
    },
    {
      level: currentLevel + 3,
      reward: "Elite Athlete",
    },
  ];

  return (
    <div className="morphic-card bg-card border border-border rounded-3xl p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold text-foreground">
            Level Progress
          </h2>

          <p className="text-muted-foreground">
            Keep earning XP to unlock rewards.
          </p>

        </div>

        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">

          <Icon
            name="TrendingUp"
            size={30}
            className="text-primary"
          />

        </div>

      </div>

      {/* Current Level */}

      <div className="bg-background rounded-2xl p-6 mb-8 text-center">

        <div className="text-5xl font-bold text-primary">
          Level {currentLevel}
        </div>

        <div className="text-muted-foreground mt-2">
          {totalXP} / {nextLevelXP} XP
        </div>

      </div>

      {/* Progress */}

      <div className="mb-8">

        <div className="flex justify-between mb-3">

          <span className="font-semibold text-foreground">
            Progress
          </span>

          <span className="text-primary font-semibold">
            {Math.round(progress)}%
          </span>

        </div>

        <div className="w-full h-4 bg-background rounded-full overflow-hidden">

          <div
            className="h-full bg-primary rounded-full transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Upcoming Rewards */}

      <div>

        <h3 className="text-lg font-bold text-foreground mb-5">
          Upcoming Rewards
        </h3>

        <div className="space-y-4">

          {rewards.map((reward) => (

            <div
              key={reward.level}
              className="bg-background rounded-xl p-4 flex justify-between items-center"
            >

              <div>

                <div className="font-semibold text-foreground">
                  Level {reward.level}
                </div>

                <div className="text-sm text-muted-foreground">
                  {reward.reward}
                </div>

              </div>

              <Icon
                name="Gift"
                size={24}
                className="text-warning"
              />

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}