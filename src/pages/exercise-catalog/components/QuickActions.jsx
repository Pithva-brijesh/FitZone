import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Icon from "../../../components/AppIcon";

const QuickActions = ({ bookmarkCount = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const quickActions = [
    {
      id: "create-routine",
      label: "Create Routine",
      icon: "Plus",
      description: "Build a custom workout",
      color: "bg-primary text-primary-foreground",
      action: () => navigate("/workout-routines"),
    },
    {
      id: "view-bookmarks",
      label: "My Bookmarks",
      icon: "Bookmark",
      description: `${bookmarkCount} saved exercises`,
      color: "bg-accent text-accent-foreground",
      action: () => alert("Bookmarks coming soon!"),
      badge: bookmarkCount > 0 ? bookmarkCount : null,
    },
    {
      id: "random-workout",
      label: "Random Workout",
      icon: "Shuffle",
      description: "Start a surprise workout",
      color: "bg-secondary text-secondary-foreground",
      action: () => navigate("/workout-routines"),
    },
  ];

  return (
    <div className="w-full">
      {/* Mobile Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Icon
              name="Zap"
              size={20}
              className="text-primary"
            />
            <span className="font-medium">
              Quick Actions
            </span>
          </div>

          <Icon
            name={isExpanded ? "ChevronUp" : "ChevronDown"}
            size={20}
          />
        </button>
      </div>

      {/* Action Cards */}
      <div
        className={`
          grid gap-3
          grid-cols-1 lg:grid-cols-3
          transition-all duration-300
          ${isExpanded ? "block" : "hidden lg:grid"}
        `}
      >
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className={`
              relative
              p-4
              rounded-xl
              text-left
              transition-all
              duration-200
              hover:scale-105
              hover:shadow-lg
              ${action.color}
            `}
          >
            {action.badge && (
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-gray-900 text-xs font-bold flex items-center justify-center">
                {action.badge > 9 ? "9+" : action.badge}
              </span>
            )}

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <Icon
                  name={action.icon}
                  size={20}
                />
              </div>

              <div>
                <h3 className="font-semibold">
                  {action.label}
                </h3>

                <p className="text-xs opacity-80">
                  {action.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Quote */}
      <div className="mt-6 p-4 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Icon
              name="Quote"
              size={16}
              className="text-primary"
            />
          </div>

          <div>
            <p className="italic font-medium">
              "The only bad workout is the one that didn't happen."
            </p>

            <p className="text-xs text-muted-foreground mt-1">
              — Fitness Motivation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;