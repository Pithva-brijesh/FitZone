import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Icon from "../../AppIcon";

import Logo from "./Logo";
import Navigation from "./Navigation";
import ProfileDropdown from "./ProfileDropdown";
import MobileMenu from "./MobileMenu";
import Button from "../Button";

export default function Header({
  user = null,
  notifications = {},
  onNavigate = () => {},
}) {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const navigationItems = [
    {
      label: "Dashboard",
      path: "/dashboard-home",
      icon: "Home",
      tooltip: "Dashboard",
    },
    {
      label: "Exercises",
      path: "/exercise-catalog",
      icon: "Dumbbell",
      tooltip: "Exercises",
    },
    {
      label: "History",
      path: "/workout-history",
      icon: "History",
      tooltip: "Workout History",
    },
    {
      label: "Nutrition",
      path: "/nutrition",
      icon: "Apple",
      tooltip: "Nutrition",
    },
    {
      label: "Achievements",
      path: "/achievements",
      icon: "Trophy",
      tooltip: "Achievements",
    },
    {
      label: "Progress",
      path: "/progress-tracker",
      icon: "TrendingUp",
      tooltip: "Progress",
    },

    // Hidden from the top navbar.
    // These pages can still be opened from the profile dropdown.
    /*
    {
      label: "Profile",
      path: "/user-profile",
      icon: "User",
      tooltip: "Profile",
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: "Bell",
      tooltip: "Notifications",
    },
    {
      label: "Settings",
      path: "/settings",
      icon: "Settings",
    },
    {
      label: "Routines",
      path: "/workout-routines",
      icon: "ClipboardList",
    },
    */
  ];

  const handleNavigate = (path) => {
    navigate(path);
    onNavigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="w-full max-w-screen-2xl mx-auto h-16 px-6 flex items-center">

          <Logo />

          <Navigation
            items={navigationItems}
            notifications={notifications}
            onNavigate={handleNavigate}
          />

          <div className="ml-auto flex items-center gap-4">

            {!user ? (
              <Button
                iconName="LogIn"
                onClick={() => handleNavigate("/login")}
              >
                Login
              </Button>
            ) : (
              <ProfileDropdown user={user} />
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Icon
                name={mobileOpen ? "X" : "Menu"}
                size={22}
              />
            </button>

          </div>

        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        items={navigationItems}
        notifications={notifications}
        onNavigate={handleNavigate}
        user={user}
      />
    </>
  );
}