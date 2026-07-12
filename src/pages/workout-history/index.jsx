import { useEffect, useMemo, useState } from "react";
import Header from "../../components/ui/Header";
import useAuth from "../../hooks/useAuth";
import { getWorkoutHistory } from "../../services/workoutHistoryService";

export default function WorkoutHistory() {
  const { user } = useAuth();

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
    const totalCalories = history.reduce(
      (sum, workout) => sum + (workout.calories || 0),
      0
    );

    const totalDuration = history.reduce(
      (sum, workout) => sum + (workout.duration || 0),
      0
    );

    return {
      workouts: history.length,
      calories: totalCalories,
      duration: totalDuration,
      averageCalories:
        history.length > 0
          ? Math.round(totalCalories / history.length)
          : 0,
      averageDuration:
        history.length > 0
          ? Math.round(totalDuration / history.length)
          : 0,
    };
  }, [history]);

  function formatDuration(seconds) {
    if (!seconds) return "0 min";

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${hrs}h ${mins}m`;
  }

  function getWorkoutLevel(calories) {
    if (calories >= 500)
      return "🔥 Intense";

    if (calories >= 250)
      return "💪 Moderate";

    return "⚡ Light";
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading Workout History...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      <Header user={user} />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            Workout History
          </h1>

          <p className="text-muted-foreground mt-2">
            Track every workout you've completed.
          </p>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground">
              Total Workouts
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {stats.workouts}
            </h2>

          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground">
              Calories Burned
            </p>

            <h2 className="text-4xl font-bold mt-2 text-orange-400">
              🔥 {stats.calories}
            </h2>

          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground">
              Total Time
            </p>

            <h2 className="text-3xl font-bold mt-2 text-blue-400">
              ⏱ {formatDuration(stats.duration)}
            </h2>

          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground">
              Avg Calories
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-400">
              {stats.averageCalories}
            </h2>

          </div>

        </div>

        {/* Empty */}

        {history.length === 0 ? (

          <div className="bg-card border border-border rounded-xl p-16 text-center">

            <h2 className="text-3xl font-bold mb-3">
              💪 No Workout History
            </h2>

            <p className="text-muted-foreground">
              Complete your first workout and it will appear here.
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

                    <p className="text-muted-foreground mt-2">

                      {new Date(
                        workout.completed_at
                      ).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}

                      {" • "}

                      {new Date(
                        workout.completed_at
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}

                    </p>

                    <span className="inline-block mt-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">

                      {getWorkoutLevel(workout.calories)}

                    </span>

                  </div>

                  <div className="text-right space-y-2">

                    <div className="text-orange-400 font-semibold">
                      🔥 {workout.calories} kcal
                    </div>

                    <div className="text-blue-400">
                      ⏱ {formatDuration(workout.duration)}
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