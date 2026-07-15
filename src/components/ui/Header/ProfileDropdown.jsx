import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../AppIcon";
import useAuth from "../../../hooks/useAuth";

export default function ProfileDropdown({ user }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  }

  const menuItems = [
    {
      title: "My Profile",
      icon: "User",
      path: "/user-profile",
    },
    {
      title: "Notifications",
      icon: "Bell",
      path: "/notifications",
    },
    {
      title: "Settings",
      icon: "Settings",
      path: "/settings",
    },
    {
      title: "Help & Support",
      icon: "HelpCircle",
      path: "/help",
    },
  ];

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-xl p-2 hover:bg-muted transition"
      >
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
          {(
            user?.username ||
            user?.full_name ||
            user?.name ||
            user?.user_metadata?.full_name ||
            user?.email ||
            "U"
          )
            .charAt(0)
            .toUpperCase()}
        </div>

        <div className="hidden lg:block text-left">
          <h4 className="font-semibold text-foreground">
            {user?.username ||
              user?.full_name ||
              user?.name ||
              user?.user_metadata?.full_name ||
              "User"}
          </h4>

          <p className="text-xs text-muted-foreground">
            🔥 {user?.streak || 0} Day Streak
          </p>
        </div>

        <Icon
          name={open ? "ChevronUp" : "ChevronDown"}
          size={18}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-border bg-card shadow-xl overflow-hidden">

          <div className="p-5 border-b border-border">

            <h3 className="font-bold text-lg">
              {user?.name ||
                user?.user_metadata?.full_name ||
                "User"}
            </h3>

            <p className="text-sm text-muted-foreground">
              {user?.email}
            </p>

          </div>

          {menuItems.map((item) => (

            <button
              key={item.title}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-5 py-4 hover:bg-muted transition"
            >
              <Icon
                name={item.icon}
                size={18}
              />

              <span>{item.title}</span>

            </button>

          ))}

          <div className="border-t border-border">

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-red-500/10 transition"
            >
              <Icon
                name="LogOut"
                size={18}
              />

              Logout

            </button>

          </div>

        </div>
      )}
    </div>
  );
}