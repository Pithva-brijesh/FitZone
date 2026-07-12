import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ExerciseActions = ({
  exercise,
  onBookmark,
  onShare,
  onStartWorkout,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    const updated = !isBookmarked;
    setIsBookmarked(updated);

    if (onBookmark) {
      onBookmark(exercise?.id, updated);
    }

    alert(
      updated
        ? "Exercise bookmarked!"
        : "Bookmark removed."
    );
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      alert("Exercise link copied to clipboard!");
    } catch {
      alert("Unable to copy link.");
    }

    if (onShare) {
      onShare(exercise?.id);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 morphic-card">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <h3 className="font-semibold text-xl text-foreground">
          Workout Actions
        </h3>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">

          <Icon
            name="Dumbbell"
            size={16}
          />

          <span>
            Ready to Train
          </span>

        </div>

      </div>

      {/* Primary Buttons */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

        <Button
          variant="default"
          size="lg"
          fullWidth
          iconName="Play"
          iconPosition="left"
          onClick={() => {
            if (onStartWorkout) {
              onStartWorkout(exercise);
            }
          }}
        >
          Start Workout
        </Button>

        <Button
          variant="outline"
          size="lg"
          fullWidth
          iconName={
            isBookmarked
              ? "BookmarkCheck"
              : "Bookmark"
          }
          iconPosition="left"
          onClick={handleBookmark}
        >
          {isBookmarked
            ? "Bookmarked"
            : "Bookmark"}
        </Button>

      </div>

      {/* Secondary Buttons */}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">

        <button
          onClick={() =>
            alert(
              "Add to Routine feature coming soon."
            )
          }
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition"
        >

          <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">

            <Icon
              name="Plus"
              size={20}
              className="text-success"
            />

          </div>

          <span className="text-xs">
            Add Routine
          </span>

        </button>

        <button
          onClick={() =>
            alert(
              "Workout scheduling will be available soon."
            )
          }
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition"
        >

          <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">

            <Icon
              name="Calendar"
              size={20}
              className="text-warning"
            />

          </div>

          <span className="text-xs">
            Schedule
          </span>

        </button>

        <button
          onClick={() =>
            alert(
              "Detailed exercise statistics coming soon."
            )
          }
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition"
        >

          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">

            <Icon
              name="BarChart3"
              size={20}
              className="text-primary"
            />

          </div>

          <span className="text-xs">
            Statistics
          </span>

        </button>

        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition"
        >

          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">

            <Icon
              name="Share"
              size={20}
              className="text-accent"
            />

          </div>

          <span className="text-xs">
            Share
          </span>

        </button>

      </div>

      {/* Exercise Status */}

      <div className="border-t border-border pt-6">

        <h4 className="font-semibold mb-4">
          Exercise Status
        </h4>

        <div className="grid grid-cols-3 gap-4">

          <div className="text-center bg-muted rounded-lg p-4">

            <div className="text-2xl font-bold text-primary">
              --
            </div>

            <p className="text-xs text-muted-foreground mt-1">
              Completed
            </p>

          </div>

          <div className="text-center bg-muted rounded-lg p-4">

            <div className="text-2xl font-bold text-success">
              --
            </div>

            <p className="text-xs text-muted-foreground mt-1">
              Best Score
            </p>

          </div>

          <div className="text-center bg-muted rounded-lg p-4">

            <div className="text-2xl font-bold text-warning">
              --
            </div>

            <p className="text-xs text-muted-foreground mt-1">
              Last Workout
            </p>

          </div>

        </div>

      </div>

      {/* XP Card */}

      <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">

            <Icon
              name="Award"
              size={24}
              color="white"
            />

          </div>

          <div>

            <h4 className="font-semibold text-lg">
              Earn Workout XP
            </h4>

            <p className="text-sm text-muted-foreground mt-1">
              Complete this exercise as part of a workout routine to
              earn experience points and unlock achievements.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ExerciseActions;