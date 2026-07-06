import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";

import { updateProfile } from "../../services/profileService";

export default function ProfileSetup() {
  const navigate = useNavigate();

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");

  const [activityLevel, setActivityLevel] = useState("Beginner");
  const [fitnessGoal, setFitnessGoal] = useState("Stay Fit");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    try {
      setLoading(true);
      setError("");

      await updateProfile({
        age: Number(age),
        gender,
        height: Number(height),
        weight: Number(weight),
        goal_weight: Number(goalWeight),
        activity_level: activityLevel,
        fitness_goal: fitnessGoal,
      });

      navigate("/dashboard-home");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto py-12 px-4 flex justify-center">

        <div className="w-full max-w-3xl rounded-3xl bg-card border border-border p-8 shadow-xl">

          <h1 className="text-4xl font-bold text-white">
            Complete Your Profile
          </h1>

          <p className="text-muted-foreground mt-2">
            Tell us about yourself to personalize your fitness journey.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div>
              <label className="block mb-2">
                Age
              </label>

              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-xl border border-border bg-background p-3"
              />
            </div>

            <div>
              <label className="block mb-2">
                Gender
              </label>

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full rounded-xl border border-border bg-background p-3"
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">
                Height (cm)
              </label>

              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full rounded-xl border border-border bg-background p-3"
              />
            </div>

            <div>
              <label className="block mb-2">
                Weight (kg)
              </label>

              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full rounded-xl border border-border bg-background p-3"
              />
            </div>

            <div>
              <label className="block mb-2">
                Goal Weight (kg)
              </label>

              <input
                type="number"
                value={goalWeight}
                onChange={(e) => setGoalWeight(e.target.value)}
                className="w-full rounded-xl border border-border bg-background p-3"
              />
            </div>

            <div>
              <label className="block mb-2">
                Activity Level
              </label>

              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full rounded-xl border border-border bg-background p-3"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2">
                Fitness Goal
              </label>

              <select
                value={fitnessGoal}
                onChange={(e) => setFitnessGoal(e.target.value)}
                className="w-full rounded-xl border border-border bg-background p-3"
              >
                <option>Stay Fit</option>
                <option>Lose Weight</option>
                <option>Build Muscle</option>
                <option>Gain Weight</option>
                <option>Improve Endurance</option>
              </select>
            </div>

          </div>

          {error && (
            <div className="text-red-500 mt-6">
              {error}
            </div>
          )}

          <Button
            onClick={handleSave}
            disabled={loading}
            className="mt-8 w-full h-12 rounded-xl"
          >
            {loading
              ? "Saving..."
              : "Save & Continue"}
          </Button>

        </div>

      </div>
    </div>
  );
}