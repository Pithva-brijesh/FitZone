import { supabase } from "../lib/supabase";

export async function scheduleWorkout(routineId, date) {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from("scheduled_workouts")
        .insert({
            user_id: user.id,
            routine_id: routineId,
            scheduled_date: date,
        })
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function getUpcomingWorkouts(days = 7) {
    const today = new Date();
    const end = new Date();
    end.setDate(today.getDate() + days);

    const startDate = today.toISOString().split("T")[0];
    const endDate = end.toISOString().split("T")[0];

    const { data, error } = await supabase
        .from("scheduled_workouts")
        .select(`
      *,
      routines (
        id,
        name
      )
    `)
        .gte("scheduled_date", startDate)
        .lte("scheduled_date", endDate)
        .order("scheduled_date", { ascending: true });

    if (error) throw error;

    return data;
}

export async function rescheduleWorkout(scheduleId, newDate) {
    const { data, error } = await supabase
        .from("scheduled_workouts")
        .update({
            scheduled_date: newDate,
            status: "scheduled",
        })
        .eq("id", scheduleId)
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function completeScheduledWorkout(routineId) {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const today = new Date().toISOString().split("T")[0];

    const { error } = await supabase
        .from("scheduled_workouts")
        .update({
            status: "completed",
            completed_at: new Date().toISOString(),
        })
        .eq("user_id", user.id)
        .eq("routine_id", routineId)
        .eq("scheduled_date", today);

    if (error) throw error;
}

export async function getTodaysWorkout() {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
        .from("scheduled_workouts")
        .select(`
      *,
      routines (*)
    `)
        .eq("user_id", user.id)
        .eq("scheduled_date", today)
        .eq("status", "scheduled")
        .maybeSingle();

    if (error) throw error;

    return data;
}

export async function getScheduledWorkouts() {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from("scheduled_workouts")
        .select(`
      *,
      routines (*)
    `)
        .eq("user_id", user.id)
        .order("scheduled_date", { ascending: true });

    if (error) throw error;

    return data;
}