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

  const redirectToEdit = async (id: string) => {
    redirect("/edit-student?id=" + id);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-screen	">
      <div className="flex flex-1">
        <aside className="w-1/5 bg-white shadow-md h-screen">
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
          </nav>
        </aside>
        <main className="flex-1 bg-gray-100 p-6">
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
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                      Tutor Group
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {registeredUsers?.props?.data.map((user) => (
                    <tr key={user.id}>
                      <td className="py-2 px-4 border-b border-gray-200">{user.first_name} {user.last_name}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{user.tutor_group}</td>

                      <td className="py-2 px-4 border-b border-gray-200 text-sky-500">
                        <form onSubmit={() => redirectToEdit(user.id)}>
                          <button type="submit">Edit</button>
                        </form>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

/*
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
    <div className="flex flex-col min-h-screen bg-gray-100 w-screen	">
      <aside className="w-1/5 bg-white shadow-md h-screen">
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
      <main className="flex-2 p-6 flex flex-col">
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
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Tutor Group
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {registeredUsers?.props?.data.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-b border-gray-200">{user.first_name} {user.last_name}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.tutor_group}</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sky-500">Edit</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ul>
        </div>
      </main>
      <footer className="bg-white text-center py-4 mt-auto shadow-md">
        <p className="text-gray-600">© 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
*/