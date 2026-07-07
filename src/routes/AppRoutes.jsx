import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import ProtectedRoute from "./ProtectedRoute";

import DashboardHome from "../pages/dashboard-home";
import ExerciseCatalog from "../pages/exercise-catalog";
import ExerciseDetailsPage from "../pages/exercise-details";
import ProgressTracker from "../pages/progress-tracker";
import WorkoutSession from "../pages/workout-session";
import LoginAndRegistration from "../pages/login-and-registration";
import UserProfile from "../pages/user-profile";
import Nutrition from "../pages/nutrition";
import WorkoutHistory from "../pages/workout-history";
import Achievements from "../pages/achievements";
import Notifications from "../pages/notifications";
import Settings from "../pages/settings";
import ProfileSetup from "../pages/profile-setup/index.jsx";
function PublicRoute() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? (
    <Navigate to="/dashboard-home" replace />
  ) : (
    <LoginAndRegistration />
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<PublicRoute />}
        />

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard-home"
          element={
            <ProtectedRoute>
              <DashboardHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exercise-catalog"
          element={
            <ProtectedRoute>
              <ExerciseCatalog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exercise-details"
          element={
            <ProtectedRoute>
              <ExerciseDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/progress-tracker"
          element={
            <ProtectedRoute>
              <ProgressTracker />
            </ProtectedRoute>
          }
        />

        <Route
          path="/workout-session"
          element={
            <ProtectedRoute>
              <WorkoutSession />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nutrition"
          element={
            <ProtectedRoute>
              <Nutrition />
            </ProtectedRoute>
          }
        />

        <Route
          path="/workout-history"
          element={
            <ProtectedRoute>
              <WorkoutHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/achievements"
          element={
            <ProtectedRoute>
              <Achievements />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile-setup"
          element={
            <ProtectedRoute>
              <ProfileSetup />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}