import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import Button from "../../../components/ui/Button";

export default function AddExerciseModal({
  open,
  onClose,
  routineId,
  onAdded,
}) {
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (open) {
      loadExercises();
    }
  }, [open]);

  async function loadExercises() {
    setLoading(true);

    const { data, error } = await supabase
      .from("exercises")
      .select("*")
      .order("name");

    if (!error) {
      setExercises(data || []);
    }

    setLoading(false);
  }

  async function addExercise(exerciseId) {
    const { error } = await supabase
      .from("routine_exercises")
      .insert({
        routine_id: routineId,
        exercise_id: exerciseId,
      });

    if (!error) {
      onAdded();
      onClose();
    } else {
      console.error(error);
    }
  }

  if (!open) return null;

  const filtered = exercises.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-card rounded-xl p-6 w-full max-w-2xl">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Add Exercise
          </h2>

          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>

        </div>

        <input
          className="w-full mb-5 p-3 rounded-lg bg-background border border-border"
          placeholder="Search exercise..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (

          <div>Loading...</div>

        ) : (

          <div className="space-y-3 max-h-[450px] overflow-y-auto">

            {filtered.map((exercise) => (

              <div
                key={exercise.id}
                className="border border-border rounded-lg p-4 flex justify-between items-center"
              >

                <div>

                  <h3 className="font-semibold">
                    {exercise.name}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {exercise.muscle_group}
                  </p>

                </div>

                <Button
                  onClick={() => addExercise(exercise.id)}
                >
                  Add
                </Button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}