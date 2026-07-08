import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

export default function ExerciseCard({
  exercise = {},
  onBookmark = () => { },
  onAddToRoutine = () => { },
  isBookmarked = false,
}) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  function getDifficultyColor(level) {
    switch (level) {
      case "Beginner":
        return "bg-success text-success-foreground";

      case "Intermediate":
        return "bg-warning text-warning-foreground";

      case "Advanced":
        return "bg-destructive text-white";

      default:
        return "bg-muted text-muted-foreground";
    }
  }

  function handleCardClick() {
    console.log("Clicked exercise:", exercise);
    console.log("Exercise ID:", exercise.id);

    navigate(`/exercise-details/${exercise.id}`);
  }

  return (
    <div
      onClick={handleCardClick}
      className="group morphic-card bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300"
    >
      {/* IMAGE */}

      <div className="relative h-48 bg-muted">

        <Image
          src={
            exercise.image_url ||
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600"
          }
          alt={exercise.name}
          className={`w-full h-full object-cover ${imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          onLoad={() => setImageLoaded(true)}
        />

        <div className="absolute top-3 left-3">

          <span
            className={`px-2 py-1 rounded-lg text-xs font-semibold ${getDifficultyColor(
              exercise.difficulty
            )}`}
          >
            {exercise.difficulty}
          </span>

        </div>

      </div>

      {/* BODY */}

      <div className="p-4">

        <h3 className="font-bold text-lg">
          {exercise.name}
        </h3>

        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {exercise.description}
        </p>

        <div className="mt-4 space-y-2 text-sm">

          <div className="flex items-center gap-2">

            <Icon name="Target" size={14} />

            <span>{exercise.muscle_group}</span>

          </div>

          <div className="flex items-center gap-2">

            <Icon name="Dumbbell" size={14} />

            <span>{exercise.equipment}</span>

          </div>

          <div className="flex items-center gap-2">

            <Icon name="Flame" size={14} />

            <span>{exercise.calories_per_min} cal/min</span>

          </div>

        </div>

        <div className="flex gap-2 mt-5">

          <Button
            className="flex-1"
            iconName="Play"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            Start
          </Button>

          <Button
            variant="outline"
            iconName={isBookmarked ? "Bookmark" : "BookmarkPlus"}
            onClick={(e) => {
              e.stopPropagation();
              onBookmark(exercise.id);
            }}
          />

        </div>

      </div>

    </div>
  );
}