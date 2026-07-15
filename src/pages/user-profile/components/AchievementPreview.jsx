import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

export default function AchievementPreview({
  achievements = [],
  user,
}) {
  const level = user?.level || 1;
  const xp = user?.xp || level * 250;

  return (
    <div className="morphic-card bg-card border border-border rounded-3xl p-8">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon
              name="Trophy"
              size={24}
              className="text-primary"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Achievements
            </h2>

            <p className="text-muted-foreground">
              Your unlocked achievements
            </p>
          </div>

        </div>

        <Button
          variant="outline"
          size="sm"
        >
          View All
        </Button>

      </div>

      {/* XP */}

      <div className="bg-primary/10 rounded-2xl p-6 mb-8">

        <div className="flex justify-between mb-3">

          <span className="font-semibold text-foreground">
            Level {level}
          </span>

          <span className="font-bold text-primary">
            {xp} XP
          </span>

        </div>

        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">

          <div
            className="bg-primary h-3 rounded-full"
            style={{
              width: `${Math.min(
                (xp % 1000) / 10,
                100
              )}%`,
            }}
          />

        </div>

        <div className="text-xs text-muted-foreground mt-2">
          Progress to next level
        </div>

      </div>

      {/* Achievement Grid */}

      {achievements.length === 0 ? (

        <div className="text-center py-12">

          <Icon
            name="Award"
            size={50}
            className="mx-auto text-muted-foreground mb-4"
          />

          <h3 className="text-xl font-bold">
            No Achievements Yet
          </h3>

          <p className="text-muted-foreground mt-2">
            Complete workouts to unlock achievements.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

          {achievements.map((achievement) => (

            <div
              key={achievement.id}
              className="rounded-2xl p-5 border border-primary bg-card hover:scale-105 transition"
            >

              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">

                <Icon
                  name="Award"
                  size={28}
                  className="text-primary"
                />

              </div>

              <h4 className="text-center mt-4 font-semibold text-foreground">

                {achievement.achievement_name ||
                  achievement.name}

              </h4>

              <div className="text-center mt-3">

                <span className="text-success text-sm font-medium">
                  Unlocked
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}