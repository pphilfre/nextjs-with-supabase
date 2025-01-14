import { FormMessage, Message } from "@/components/form-message";
import { getUsersAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from 'react';
import DashboardSidebar from "@/components/dashboard";

export default async function StudentBehaviourPage(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  const registeredUsers = await getUsersAction();
  if (registeredUsers == null) {
    console.log("No users found");
  }
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }



  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-screen">
      <div className="flex flex-1">
        <DashboardSidebar pageSelected={1} />
        <main className="flex-1 bg-gray-100 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex-1">
            <h2 className="text-xl font-semibold text-gray-800">Student Behaviour</h2>
            <ul className="mt-4 text-gray-600">
              {registeredUsers.props?.data.map((student: any) => (
                <li key={student.id} className="border-b py-2">
                  <div className="flex justify-between items-center">
                    <span>{student.first_name} {student.last_name}</span>
                    {student.negatives ? (
                      student.negatives.map((positive: any, index: number) => (
                        <li key={index} className="border-b py-2">
                          <div className="items-center">
                            <li className="text-red-600">-{positive.points ? positive.points : ("0")}</li>
                            <li>{positive.message ? positive.message : ("No message")}</li>
                            <li>{positive.date_assigned ? positive.date_assigned : ("No date")}</li>
                          </div>
                        </li>
                      ))
                    ) : (
                      <p>No negatives available.</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
        <footer className="bg-white text-center py-4 mt-auto shadow-md">
          <p className="text-gray-600">© 2023 Your Company. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
