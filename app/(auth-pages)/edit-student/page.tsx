import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { getUsersAction, updateStudentAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import React from 'react';

type StudentMessage = Message & { id: string };

export interface Student {
    id: string;
    password: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    address: string;
    phone_number: string;
    gender: string;
    tutor_group: string;
}

export default async function EditStudentPage(props: { searchParams: Promise<StudentMessage> }) {
    const searchParams = await props.searchParams;
    const registeredUsers = await getUsersAction();
    if (registeredUsers == null) {
        console.log("No users found");
    }

    let desiredUser: Student = {} as Student;

    registeredUsers.props?.data.forEach((element: Student) => {
        if (element.id === searchParams.id) {
            console.log(element);
            desiredUser = element;
        }
    });

    if (desiredUser == null) {
        console.log("No user found");
        redirect("/protected");
    }
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    // User exists and students variables are set

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Student</h1>
            <form className="space-y-4">
                <div>
                    <Label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</Label>
                    <Input type="text" name="id" value={desiredUser.id} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</Label>
                        <Input type="text" name="first_name" value={desiredUser.first_name} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <Label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</Label>
                        <Input type="text" name="last_name" value={desiredUser.last_name} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                </div>
                <div>
                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
                    <Input type="password" name="password" value={desiredUser.password} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <Label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">Date of Birth</Label>
                    <Input type="date" name="date_of_birth" value={desiredUser.date_of_birth} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <Label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</Label>
                    <Input type="text" name="address" value={desiredUser.address} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <Label htmlFor="parent_phone" className="block text-sm font-medium text-gray-700">Parent Phone Number</Label>
                    <Input type="text" name="parent_phone" value={desiredUser.phone_number} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <Label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</Label>
                    <Input type="text" name="gender" value={desiredUser.gender} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <Label htmlFor="tutor_group" className="block text-sm font-medium text-gray-700">Tutor Group</Label>
                    <Input type="text" name="tutor_group" value={desiredUser.tutor_group} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="mt-5">
                    <SubmitButton className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm" formAction={updateStudentAction}>
                        Save
                    </SubmitButton>
                </div>
            </form>
        </div>
    )
}