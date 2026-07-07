import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        setChecking(false);
        return;
      }

      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setChecking(false);
      }
    }

    loadProfile();
  }, [user, location.pathname]);

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  console.log("PROFILE:", profile);
  // Profile incomplete → force profile setup
  if (
    profile &&
    (
      profile.age === null ||
      profile.gender === null ||
      profile.height === null ||
      profile.weight === null ||
      profile.goal_weight === null
    ) &&
    window.location.pathname !== "/profile-setup"
  ) {
    return <Navigate to="/profile-setup" replace />;
  }

  return children;
}