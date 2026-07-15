import React from "react";
import Icon from "../../../components/AppIcon";

export default function AchievementTimeline({
  achievements = [],
}) {
  if (achievements.length === 0) {
    return (
      <div className="morphic-card bg-card border border-border rounded-3xl p-8">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl font-bold text-foreground">
              Achievement Timeline
            </h2>

            <p className="text-muted-foreground">
              Your fitness journey will appear here.
            </p>

          </div>

          <Icon
            name="History"
            size={30}
            className="text-primary"
          />

        </div>

        <div className="text-center py-16">

          <Icon
            name="Award"
            size={55}
            className="mx-auto text-muted-foreground mb-4"
          />

          <h3 className="text-xl font-bold">
            No Achievements Yet
          </h3>

          <p className="text-muted-foreground mt-2">
            Complete workouts to start building your timeline.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="morphic-card bg-card border border-border rounded-3xl p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold text-foreground">
            Achievement Timeline
          </h2>

          <p className="text-muted-foreground">
            Every achievement you've unlocked.
          </p>

        </div>

        <Icon
          name="History"
          size={30}
          className="text-primary"
        />

      </div>

      <div className="space-y-8">

        {achievements.map((achievement, index) => (

          <div
            key={achievement.id}
            className="flex gap-5"
          >

            {/* Icon */}

            <div className="flex flex-col items-center">

              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">

                <Icon
                  name="Award"
                  size={24}
                  className="text-primary"
                />

              </div>

              {index !== achievements.length - 1 && (

                <div className="w-1 h-16 bg-border mt-2 rounded-full" />

              )}

            </div>

            {/* Content */}

            <div className="flex-1 bg-background rounded-2xl p-5">

              <div className="flex justify-between items-center">

                <h3 className="font-bold text-lg text-foreground">

                  {achievement.achievement_name}

                </h3>

                <span className="text-sm text-muted-foreground">

                  {achievement.unlocked_at
                    ? new Date(
                        achievement.unlocked_at
                      ).toLocaleDateString()
                    : ""}

                </span>

              </div>

              <p className="mt-2 text-muted-foreground">

                Achievement unlocked successfully.

              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}