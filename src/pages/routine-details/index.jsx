import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";
import useAuth from "../../hooks/useAuth";

import AddExerciseModal from "./components/AddExerciseModal";

import {
  getRoutineExercises,
  removeExercise,
} from "../../services/routineExerciseService";

export default function RoutineDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [routineExercises, setRoutineExercises] = useState([]);

  useEffect(() => {
    loadRoutineExercises();
  }, [id]);

  async function loadRoutineExercises() {
    try {
      const data = await getRoutineExercises(id);
      setRoutineExercises(data || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteExercise(exerciseId) {
    const ok = window.confirm(
      "Remove this exercise from the routine?"
    );

    if (!ok) return;

    try {
      await removeExercise(exerciseId);
      await loadRoutineExercises();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />

      <main className="max-w-6xl mx-auto py-12 px-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Routine Details
            </h1>

            <p className="text-muted-foreground mt-2">
              Manage your workout routine
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowModal(true)}
            >
              + Add Exercise
            </Button>

            <Button
              onClick={() => navigate(`/workout-session/${id}`)}
            >
              ▶ Start Workout
            </Button>
          </div>
        </div>

        {/* Exercise List */}
        <div className="space-y-4">
          {routineExercises.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
              No exercises added yet.
            </div>
          ) : (
            routineExercises.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-xl p-5 flex justify-between items-center hover:border-primary transition-all"
              >
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {item.exercises.name}
                  </h3>

                  <p className="text-muted-foreground mt-1">
                    {item.exercises.muscle_group}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-3">
                    {item.sets || 3} Sets • {item.reps || 10} Reps
                  </div>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteExercise(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <AddExerciseModal
          open={showModal}
          routineId={id}
          onClose={() => setShowModal(false)}
          onAdded={loadRoutineExercises}
        />

      </main>
    </div>
  );
}