"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Session, WeakPassword, SupabaseClient } from "@supabase/supabase-js";
import { data } from "autoprefixer";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

async function CheckIfUser (formData: { user: any; session?: Session; weakPassword?: WeakPassword | undefined; }, supabase: SupabaseClient<any, "public", any>) {
  // Check to see if the user exists
  const { data, error } = await supabase
    .from('users') // Use the 'users' table
    .select('isSetup') // Select the 'isSetup' column
    .eq('id', formData.user.id) // Filter by the specific user ID
    .single(); // Use .single() to get a single row

  if (error) {
    console.error('Error fetching data:', error);
    return false; // Return false or handle error as needed
  }

  // Check if data is not null and return the boolean value
  return data ? data.isSetup : false; // Return false if no data found
  
  
}

export const setupUserAction = async (formData: FormData) => {
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;
  const gender = formData.get("gender") as string;
  const address = formData.get("address") as string;
  const postcode = formData.get("postcode") as string;
  const phoneNumber = formData.get("phone_number") as string;
  const tutorGroup = formData.get("tutor_group") as string;

  const supabase = await createClient();

  // Get the logged in user
  const { data: { user } } = await supabase.auth.getUser()


  var userId = user?.id;

  // Update values
  const { error } = await supabase
  .from('users')
  .insert({ id: userId, first_name: firstName, last_name: lastName, gender: gender, address: address, postcode: postcode, phone_number: phoneNumber, tutor_group: tutorGroup})
   
  
  if (error) {
    return encodedRedirect("error", "/account-setup", error.message);
  }
 
};


export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  // Check to see if there is a matching user

  if (await CheckIfUser(data, supabase) == true) {
    // User is setup
    return redirect("/protected");
  } else {
    return redirect("/account-setup")
  }

 
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
