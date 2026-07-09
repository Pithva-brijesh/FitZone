import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import AddExerciseModal from "./components/AddExerciseModal";
import {
  getRoutineExercises,
  removeExercise,
} from "../../services/routineExerciseService";

export default function RoutineDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

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
  async function handleDeleteExercise(id) {
    const ok = window.confirm(
      "Remove this exercise from the routine?"
    );

    if (!ok) return;

    try {
      await removeExercise(id);

      await loadRoutineExercises();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="max-w-6xl mx-auto py-12 px-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">
            Routine Details
          </h1>

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
            <div className="bg-card border border-border rounded-xl p-8 text-center text-gray-400">
              No exercises yet.
            </div>
          ) : (
            routineExercises.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-xl p-5 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold">
                    {item.exercises.name}
                  </h3>

                  <p className="text-gray-400">
                    {item.exercises.muscle_group}
                  </p>
                </div>

                <div className="text-right">

                  <div className="text-sm text-gray-400 mb-3">
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

        {/* Modal */}
        <AddExerciseModal
          open={showModal}
          routineId={id}
          onClose={() => setShowModal(false)}
          onAdded={loadRoutineExercises}
        />
      </div>
    </div>
  );
}