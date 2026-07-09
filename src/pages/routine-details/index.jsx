import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../components/ui/Button";
import AddExerciseModal from "./components/AddExerciseModal";
import { getRoutineExercises } from "../../services/routineExerciseService";

export default function RoutineDetails() {
  const { id } = useParams();

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

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="max-w-6xl mx-auto py-12 px-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">
            Routine Details
          </h1>

          <Button onClick={() => setShowModal(true)}>
            + Add Exercise
          </Button>
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

                <div className="text-sm text-gray-400">
                  {item.sets || 3} Sets • {item.reps || 10} Reps
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