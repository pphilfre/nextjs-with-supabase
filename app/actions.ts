"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Session, WeakPassword, SupabaseClient } from "@supabase/supabase-js";

export const assignStudentAction = async (formData: FormData) => {
  const id = formData.get("student_id") as string;
  const action_type = formData.get("action_type") as string;
  let points = 0;
  // Check the action type
  if (!(action_type === "note")) {

    try {
      points = parseInt(formData.get("points") as string);
    } catch (error) {
      encodedRedirect("error", "/protected", "Points must be a number");
    }



  }

  const message = formData.get("message") as string;
  const date_assigned = formData.get("date_assigned") as string;

  if (message == null || date_assigned == null || id == null || points == null) {
    return encodedRedirect("error", "/protected", "All fields are required");
  }

  const supabase = await createClient();
  const { data: data, error: _err } = await supabase
    .from("students")
    .select()
    .eq('id', id)
    .single();
  if (data == null || _err) {
    return encodedRedirect("error", "/protected", "Student not found");
  }

  // Insert the data into the table

  switch (action_type) {
    case "note":
      const { error: err1 } = await supabase
        .from("student")
        .insert([
          {
            notes: [{
              message: message,
              date_assigned: date_assigned,
            }]
          }])
        .eq('id', id);
      if (err1) {
        return encodedRedirect("error", "/protected", err1.message);
      } else {
        return encodedRedirect("success", "/protected", "Note added successfully");
      }
    case "behaviour":
      const { error: err2 } = await supabase
        .from("student")
        .insert([
          {
            negatives: [{
              points: points,
              message: message,
              date_assigned: date_assigned,
            }]
          }])
        .eq('id', id);
      if (err2) {
        return encodedRedirect("error", "/protected", err2.message);
      } else {
        return encodedRedirect("success", "/protected", "Behaviour added successfully");
      }
    case "achievement":

      let previousPositives = data.positives;

      

      const jsonData = {
        points: points,
        message: message,
        date_assigned: date_assigned,
      };
      if (previousPositives == null) {
        previousPositives = [jsonData];
      }
      else
        previousPositives.push(jsonData);

      const { error: err3 } = await supabase
        .from("students")
        .update({positives: previousPositives})
        .eq('id', id);
      if (err3) {
        return encodedRedirect("error", "/protected", err3.message);
      } else {
        return encodedRedirect("success", "/protected", "Positive added successfully " + JSON.stringify(previousPositives));
      }

    default:
      return encodedRedirect("error", "/protected", "Invalid action type");
  }

}

export const updateStudentAction = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const password = formData.get("password") as string;
  const date_of_birth = formData.get("date_of_birth") as string;
  const gender = formData.get("gender") as string;
  const address = formData.get("address") as string;
  const phone_number = formData.get("parent_phone") as string;
  const tutor_group = formData.get("tutor_group") as string;

  const supabase = await createClient();

  const { error } = await supabase
    .from("students")
    .update({ first_name: first_name, last_name: last_name, password: password, date_of_birth: date_of_birth, address: address, phone_number: phone_number, gender: gender, tutor_group: tutor_group })
    .eq('id', id);

  if (error) {
    return encodedRedirect("error", "/protected", error.message);
  } else {
    return encodedRedirect("success", "/protected", "Student updated successfully");
  }

};

export const getUsersAction = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('students')
    .select();

  if (error)
    return { error: error.message }
  else
    return { props: { data } };

}

export const deleteStudent = async (data: FormData) => {
  const supabase = await createClient();
  const id = data.get("itemId");
  const { error } = await supabase
    .from('students')
    .delete()
    .eq('id', id);

  if (error) {
    encodedRedirect("error", "/protected", error.message);
  } else {
    encodedRedirect("success", "/protected", "Student deleted successfully");
  }
}


export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  if (password !== confirmPassword) {
    return encodedRedirect("error", "/sign-up", "Passwords do not match");
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

async function CheckIfUser(formData: { user: any; session?: Session; weakPassword?: WeakPassword | undefined; }, supabase: SupabaseClient<any, "public", any>) {
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

export const createStudentAction = async (formData: FormData) => {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const password = formData.get("password") as string;
  const date_of_birth = formData.get("dob") as string;
  const address = formData.get("address") as string;
  const phone_number = formData.get("parentPhone") as string;
  const gender = formData.get("gender") as string;
  const tutor_group = formData.get("tutorGroup") as string;

  if (firstName == null || lastName == null || password == null || date_of_birth == null || address == null || phone_number == null) {
    return encodedRedirect("error", "/create-student", "All fields are required");
  }


  const supabase = await createClient();

  // generate an email for them

  const lastNameShort = lastName.substring(0, 4) as string;
  const firstNameShort = firstName.substring(0, 4) as string;

  var email = (tutor_group + lastNameShort + firstNameShort + "@student.com").toLowerCase() as string;

  // check if the email already exists

  const { data: users, error: err } = await supabase
    .from("students")
    .select("email")
    .eq("email", email);

  if (users?.length != 0 || err) {
    // email already exists
    email = (tutor_group + lastNameShort + firstNameShort + "1" + "@student.com").toLowerCase();
  }

  // create the user

  /*
   email text null,
    password text null,
    first_name text null,
    last_name text null,
    date_of_birth text null,
    address text null,
    phone_number text null,
    gender text null,
    tutor_group text null,
  */

  const { error } = await supabase
    .from("students")
    .insert([
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        date_of_birth: date_of_birth,
        address: address,
        phone_number: phone_number,
        tutor_group: tutor_group,
        gender: gender
      }
    ]);

  if (error) {
    console.error("Error inserting student:", error);
    return encodedRedirect("error", "/create-student", error.message);
  } else {
    return encodedRedirect("success", "/create-student", "Student created successfully");
  }

}

export const setupUserAction = async (formData: FormData) => {

  // Getting all the fields
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


  // Update the value
  const { error } = await supabase
    .from("users")
    .update({ first_name: firstName, last_name: lastName, gender: gender, address: address, postcode: postcode, phone_number: phoneNumber, tutor_group: tutorGroup, isSetup: true })
    .eq('id', userId);


  if (error) {
    return encodedRedirect("error", "/account-setup", error.message);
  } else {
    redirect("/protected");
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
