import { useEffect, useState } from "react";
import { getWorkoutHistory } from "../../services/workoutHistoryService";
import Header from "../../components/ui/Header";

export default function WorkoutHistory() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {

    try {

      const data = await getWorkoutHistory();

      setHistory(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-background">

      <Header />

      <div className="max-w-6xl mx-auto py-12 px-6">

        <h1 className="text-4xl font-bold mb-8">
          Workout History
        </h1>

        {history.length === 0 ? (

          <div className="text-gray-400">
            No workouts completed yet.
          </div>

        ) : (

          <div className="space-y-5">

            {history.map((workout) => (

              <div
                key={workout.id}
                className="bg-card border border-border rounded-xl p-6"
              >

                <h2 className="text-2xl font-semibold">

                  {workout.routines?.name}

                </h2>

                <p className="text-gray-400 mt-2">

                  🔥 {workout.calories} Calories

                </p>

                <p className="text-gray-400">

                  ⏱ {workout.duration} Seconds

                </p>

                <p className="text-gray-500 mt-2">

                  {new Date(workout.completed_at).toLocaleString()}

                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}