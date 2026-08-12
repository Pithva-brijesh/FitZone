import React from "react";

export default function ScheduledWorkoutCard({
    workout,
    onStart,
    onReschedule,
}) {
    if (!workout) return null;

    return (
        <div className="bg-card border border-border rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-primary font-medium">
                        Today's scheduled workout
                    </p>
                    <h2 className="text-2xl font-bold mt-1">
                        {workout.routines.name}
                    </h2>
                </div>

                <div className="text-right text-sm text-muted-foreground">
                    {new Date(workout.scheduled_date).toLocaleDateString()}
                </div>
            </div>

            <div className="flex gap-4 text-sm text-muted-foreground mb-6">
                <span>Scheduled for today</span>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onStart();
                    }}
                    className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold"
                >
                    Start workout
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onReschedule();
                    }}
                    className="px-5 py-3 rounded-xl border border-border"
                >
                    Reschedule
                </button>
            </div>
        </div>
    );
}