import React from "react";
import Icon from "../../../components/AppIcon";

export default function AchievementHeader({
  achievements = [],
  profile = {},
}) {
  const badgeCount = achievements.length;
  const level = profile.level || 1;

  return (
    <div className="morphic-card bg-card border border-border rounded-3xl p-8">

      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

        {/* Left */}

        <div>

          <div className="flex items-center gap-4 mb-4">

            <div className="w-16 h-16 rounded-2xl bg-warning/10 flex items-center justify-center">

              <Icon
                name="Trophy"
                size={34}
                className="text-warning"
              />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-foreground">
                Achievements
              </h1>

              <p className="text-muted-foreground">
                Unlock badges, earn XP, and reach new fitness milestones.
              </p>

            </div>

          </div>

          <p className="text-lg text-muted-foreground max-w-2xl">
            Every workout gets you closer to your next achievement.
            Stay consistent, complete challenges, and level up!
          </p>

        </div>

        {/* Right */}

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-background rounded-2xl p-5 text-center">

            <div className="text-3xl font-bold text-warning">
              {badgeCount}
            </div>

            <div className="text-sm text-muted-foreground">
              Badges Earned
            </div>

          </div>

          <div className="bg-background rounded-2xl p-5 text-center">

            <div className="text-3xl font-bold text-primary">
              Level {level}
            </div>

            <div className="text-sm text-muted-foreground">
              Current Level
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}