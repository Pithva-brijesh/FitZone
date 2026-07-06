import { supabase } from "../lib/supabase";

export async function signUp(fullName, email, password) {
  // Create Auth User
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw error;

  console.log("SIGNUP DATA:", data);

  if (!data.user) {
    throw new Error("User was not created.");
  }

  // Check Session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("SESSION:", session);
  console.log("USER:", data.user);

  // Profile object
  const profile = {
    id: data.user.id,
    full_name: fullName,
    email: data.user.email,

    age: null,
    gender: null,

    height: null,
    weight: null,
    goal_weight: null,

    activity_level: "Beginner",
    fitness_goal: "Stay Fit",

    streak: 0,
    level: 1,
  };

  console.log("PROFILE TO INSERT:", profile);

  // Insert Profile
  const {
    data: profileData,
    error: profileError,
  } = await supabase
    .from("profiles")
    .insert(profile)
    .select();

  console.log("PROFILE INSERT RESULT:", profileData);
  console.log("PROFILE INSERT ERROR:", profileError);

  if (profileError) {
    throw profileError;
  }

  return data;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) throw error;
}