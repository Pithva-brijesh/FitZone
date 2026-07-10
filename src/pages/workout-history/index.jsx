import { useEffect, useMemo, useState } from "react";
import Header from "../../components/ui/Header";
import { getWorkoutHistory } from "../../services/workoutHistoryService";

export default function WorkoutHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const data = await getWorkoutHistory();
      setHistory(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const stats = useMemo(() => {
    return {
      workouts: history.length,
      calories: history.reduce(
        (sum, workout) => sum + (workout.calories || 0),
        0
      ),
      duration: history.reduce(
        (sum, workout) => sum + (workout.duration || 0),
        0
      ),
    };
  }, [history]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading Workout History...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Page Header */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-white">
            Workout History
          </h1>

          <p className="text-gray-400 mt-2">
            Review all your completed workout sessions.
          </p>

        </div>

        {/* Summary Cards */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-gray-400 text-sm">
              Total Workouts
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {stats.workouts}
            </h2>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-gray-400 text-sm">
              Total Calories
            </p>

            <h2 className="text-4xl font-bold mt-2">
              🔥 {stats.calories}
            </h2>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-gray-400 text-sm">
              Total Duration
            </p>

            <h2 className="text-4xl font-bold mt-2">
              ⏱ {stats.duration}s
            </h2>
          </div>

        </div>

        {/* History */}

        {history.length === 0 ? (

          <div className="bg-card border border-border rounded-xl p-12 text-center">

            <h2 className="text-2xl font-bold">
              No Workouts Yet 💪
            </h2>

            <p className="text-gray-400 mt-3">
              Complete your first workout to start building your history.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {history.map((workout) => (

              <div
                key={workout.id}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-bold">

                      {workout.routines?.name || "Workout"}

                    </h2>

                    <p className="text-gray-400 mt-2">

                      {new Date(workout.completed_at).toLocaleString()}

                    </p>

                  </div>

                  <div className="text-right">

                    <div className="text-orange-400 font-semibold">
                      🔥 {workout.calories} Calories
                    </div>

                    <div className="text-blue-400 mt-2">
                      ⏱ {workout.duration} Seconds
                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}