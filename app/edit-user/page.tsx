"use client";

import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/server';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  address: string;
  parent_phone: string;
  gender: string;
  tutor_group: string;
}

interface EditUserProps {
  user: User;
}

const EditUser = ({ user }: EditUserProps) => {
  const [formData, setFormData] = useState<User>(user);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/update-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      // Handle success
      console.log('User updated successfully');
    } else {
      // Handle error
      setError(data.error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</Label>
          <Input type="text" name="id" value={formData.id} readOnly className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
          <Input type="text" name="email" value={formData.email} readOnly className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div>
          <Label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</Label>
          <Input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div>
          <Label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</Label>
          <Input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div>
          <Label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">Date of Birth</Label>
          <Input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div>
          <Label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</Label>
          <Input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div>
          <Label htmlFor="parent_phone" className="block text-sm font-medium text-gray-700">Parent's Phone Number</Label>
          <Input type="text" name="parent_phone" value={formData.parent_phone} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div>
          <Label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</Label>
          <Input type="text" name="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div>
          <Label htmlFor="tutor_group" className="block text-sm font-medium text-gray-700">Tutor Group</Label>
          <Input type="text" name="tutor_group" value={formData.tutor_group} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div className="mt-5">
          <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
            Save
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const supabase = await createClient();
  const { data: user, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default EditUser;