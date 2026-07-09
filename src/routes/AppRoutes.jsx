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
import ProfileSetup from "../pages/profile-setup";
import WorkoutRoutines from "../pages/workout-routines";
import RoutineDetails from "../pages/routine-details";

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
  console.log("✅ APP ROUTES LOADED");

  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
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

        {/* Exercises */}
        <Route
          path="/exercise-catalog"
          element={
            <ProtectedRoute>
              <ExerciseCatalog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exercise-details/:id"
          element={
            <ProtectedRoute>
              <ExerciseDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* Workout Session */}
        <Route
          path="/workout-session"
          element={
            <ProtectedRoute>
              <WorkoutSession />
            </ProtectedRoute>
          }
        />

        <Route
          path="/workout-session/:id"
          element={
            <ProtectedRoute>
              <WorkoutSession />
            </ProtectedRoute>
          }
        />

        {/* Workout Routines */}
        <Route
          path="/workout-routines"
          element={
            <ProtectedRoute>
              <WorkoutRoutines />
            </ProtectedRoute>
          }
        />

        <Route
          path="/routine/:id"
          element={
            <ProtectedRoute>
              <RoutineDetails />
            </ProtectedRoute>
          }
        />

        {/* Progress */}
        <Route
          path="/progress-tracker"
          element={
            <ProtectedRoute>
              <ProgressTracker />
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <UserProfile />
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

        {/* Nutrition */}
        <Route
          path="/nutrition"
          element={
            <ProtectedRoute>
              <Nutrition />
            </ProtectedRoute>
          }
        />

        {/* History */}
        <Route
          path="/workout-history"
          element={
            <ProtectedRoute>
              <WorkoutHistory />
            </ProtectedRoute>
          }
        />

        {/* Achievements */}
        <Route
          path="/achievements"
          element={
            <ProtectedRoute>
              <Achievements />
            </ProtectedRoute>
          }
        />

        {/* Notifications */}
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div
              className="min-h-screen bg-background text-white flex items-center justify-center text-4xl"
            >
              ❌ 404 ROUTE
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}