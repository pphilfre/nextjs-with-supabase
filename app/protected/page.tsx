import { FormMessage, Message } from "@/components/form-message";
import { getUsersAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon, Users, UserCheck } from "lucide-react";
import { redirect } from "next/navigation";
import React from 'react';

export default async function ProtectedPage(props: { searchParams: Promise<Message> }) {
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <nav className="mt-6">
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-gray-900">
            Home
          </a>
          <div className="relative group">
            <button className="block w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-gray-900">
              Users
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded mt-1">
              <a href="#" className="block py-2 px-4 hover:bg-gray-200">Students</a>
              <a href="#" className="block py-2 px-4 hover:bg-gray-200">Teachers</a>
            </div>
          </div>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-gray-900">
            Settings
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-6 flex flex-col">
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex items-center bg-white p-4 rounded-lg shadow-md w-1/2">
            <div className="bg-blue-500 text-white p-3 rounded-full">
              <Users className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-800">Total Students</h2>
              <p className="text-gray-600">123</p>
            </div>
          </div>
          <div className="flex items-center bg-white p-4 rounded-lg shadow-md w-1/2">
            <div className="bg-green-500 text-white p-3 rounded-full">
              <UserCheck className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-800">Total Staff</h2>
              <p className="text-gray-600">123</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex-1">
          <h2 className="text-xl font-semibold text-gray-800">Registered Users</h2>
          <ul className="mt-4 text-gray-600">
          </ul>
        </div>
      </main>
      <footer className="bg-white text-center py-4 mt-auto shadow-md">
        <p className="text-gray-600">© 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
