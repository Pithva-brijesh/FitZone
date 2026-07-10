import { supabase } from "../lib/supabase";
import { getCurrentUser } from "./authService";

export async function addWeight(weight) {
  const user = await getCurrentUser();

  const { error } = await supabase
    .from("weight_logs")
    .insert({
      user_id: user.id,
      weight,
    });

  if (error) throw error;
}

export async function getWeightHistory() {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("weight_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("logged_at", { ascending: true });

  if (error) throw error;

  return data;
}