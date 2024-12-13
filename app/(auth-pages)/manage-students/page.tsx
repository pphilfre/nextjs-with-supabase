"use client";

import { FormMessage, Message } from "@/components/form-message";
import { getUsersAction, updateStudentAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon, Users, UserCheck } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface User {
  id: string;
  email: string;
  password: string;
  gender: string;
  address: string;
  tutor_group: string;
  parent_email: string;
}

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

  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const openDialog = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setSelectedUser(null);
    setIsOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedUser) return;

    const response = await fetch('/api/update-student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedUser),
    });

    const data = await response.json();

    if (response.ok) {
      // Handle success
      console.log('Student updated successfully');
      closeDialog();
    } else {
      // Handle error
      setError(data.error);
    }
  };

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
                    <td className="py-2 px-4 border-b border-gray-200 text-sky-500 cursor-pointer" onClick={() => openDialog(user)}>Edit</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ul>
        </div>
      </main>
      </div>

      {isOpen && selectedUser && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Edit User</h3>
                    <div className="mt-2">
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                          <Label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</Label>
                          <Input type="text" name="id" value={selectedUser.id} readOnly className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
                          <Input type="text" name="email" value={selectedUser.email} readOnly className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
                          <Input type="password" name="password" value={selectedUser.password} onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <Label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</Label>
                          <Input type="text" name="gender" value={selectedUser.gender} onChange={(e) => setSelectedUser({ ...selectedUser, gender: e.target.value })} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <Label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</Label>
                          <Input type="text" name="address" value={selectedUser.address} onChange={(e) => setSelectedUser({ ...selectedUser, address: e.target.value })} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <Label htmlFor="tutor_group" className="block text-sm font-medium text-gray-700">Tutor Group</Label>
                          <Input type="text" name="tutor_group" value={selectedUser.tutor_group} onChange={(e) => setSelectedUser({ ...selectedUser, tutor_group: e.target.value })} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <Label htmlFor="parent_email" className="block text-sm font-medium text-gray-700">Parent Email</Label>
                          <Input type="text" name="parent_email" value={selectedUser.parent_email} onChange={(e) => setSelectedUser({ ...selectedUser, parent_email: e.target.value })} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="mt-5 sm:mt-6">
                          <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                            Save
                          </button>
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
