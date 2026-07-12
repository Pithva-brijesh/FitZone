import { supabase } from "../lib/supabase";

export async function getRoutines() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not logged in.");

  const { data, error } = await supabase
    .from("routines")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getRoutine(id) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not logged in.");

  const { data, error } = await supabase
    .from("routines")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) throw error;

  return data;
}

export async function createRoutine(name, description) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not logged in.");

  const { data, error } = await supabase
    .from("routines")
    .insert({
      user_id: user.id,
      name,
      description,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteRoutine(id) {
  const { error } = await supabase
    .from("routines")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function updateRoutine(id, name, description) {
  const { data, error } = await supabase
    .from("routines")
    .update({
      name,
      description,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}