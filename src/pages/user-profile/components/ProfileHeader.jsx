import React from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

export default function ProfileHeader({ user }) {
  const avatarLetter =
    (user?.name || user?.full_name || "U")
      .charAt(0)
      .toUpperCase();

  return (
    <div className="morphic-card bg-card border border-border rounded-3xl p-8">

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">

        {/* Left Section */}

        <div className="flex flex-col sm:flex-row items-center gap-6">

          {/* Avatar */}

          <div className="relative">

            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-36 h-36 rounded-full object-cover border-4 border-primary shadow-lg"
              />
            ) : (
              <div className="w-36 h-36 rounded-full bg-primary flex items-center justify-center text-5xl font-bold text-white border-4 border-primary shadow-lg">
                {avatarLetter}
              </div>
            )}

            <button
              className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition"
            >
              <Icon
                name="Camera"
                size={18}
                color="white"
              />
            </button>

          </div>

          {/* User Info */}

          <div>

            <h1 className="text-4xl font-bold font-poppins text-foreground">
              {user?.name || user?.full_name}
            </h1>

            <p className="text-lg text-primary mt-2">
              {user?.activity_level || "Beginner"}
            </p>

            <div className="flex flex-wrap gap-4 mt-5">

              <div className="flex items-center gap-2 text-muted-foreground">

                <Icon
                  name="Mail"
                  size={18}
                />

                {user?.email}

              </div>

              <div className="flex items-center gap-2 text-orange-400">

                <Icon
                  name="Flame"
                  size={18}
                />

                {user?.streak ?? 0} Day Streak

              </div>

            </div>

            {/* Quick Stats */}

            <div className="grid grid-cols-3 gap-4 mt-8">

              <div className="bg-primary/10 rounded-xl p-4 text-center">

                <div className="text-2xl font-bold text-primary">
                  {user?.height ?? "-"}
                </div>

                <div className="text-sm text-muted-foreground">
                  Height (cm)
                </div>

              </div>

              <div className="bg-success/10 rounded-xl p-4 text-center">

                <div className="text-2xl font-bold text-success">
                  {user?.weight ?? "-"}
                </div>

                <div className="text-sm text-muted-foreground">
                  Weight (kg)
                </div>

              </div>

              <div className="bg-warning/10 rounded-xl p-4 text-center">

                <div className="text-2xl font-bold text-warning">
                  {user?.goalWeight ?? user?.goal_weight ?? "-"}
                </div>

                <div className="text-sm text-muted-foreground">
                  Goal (kg)
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col gap-4 w-full lg:w-auto">

          <Button
            iconName="Pencil"
            className="w-full lg:w-52"
          >
            Edit Profile
          </Button>

          <Button
            variant="outline"
            iconName="Share2"
            className="w-full lg:w-52"
          >
            Share Profile
          </Button>

        </div>

      </div>

    </div>
  );
}