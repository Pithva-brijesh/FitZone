import React from "react";

export default function WorkoutCalendar({ workouts = [] }) {
  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Upcoming workouts
      </h2>

      <div className="space-y-4">
        {workouts.length === 0 ? (
          <p className="text-muted-foreground">
            No workouts scheduled
          </p>
        ) : (
          workouts.map((workout) => (
            <div
              key={workout.id}
              className="flex items-center justify-between p-4 rounded-xl bg-background border border-border"
            >
              <div>
                <h3 className="font-semibold">
                  {workout.routines?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(workout.scheduled_date).toLocaleDateString()}
                </p>
              </div>

              <span className="text-primary text-sm font-medium">
                Scheduled
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}