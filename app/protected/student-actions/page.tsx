import { FormMessage, Message } from "@/components/form-message";
import { useState } from 'react';
import { SubmitButton } from "@/components/submit-button";
import {assignStudentAction } from "@/app/actions";
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

export default async function EditStudentPage(props: { searchParams: Promise<Student> }) {
    const searchParams = await props.searchParams;
    const supabase = await createClient();
    const [actionType, setActionType] = useState('behaviour');
    const [points, setPoints] = useState('');

    const handleActionTypeChange = (e: any) => {
        setActionType(e.target.value);
        if (e.target.value === 'note') {
            setPoints('');
        }
    };
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    const { data: students, error } = await supabase
        .from('students')
        .select()
        .eq('id', searchParams.id);


    if (error || students == null) {
        redirect("/protected");
    }
    let studentData = students[0];
    // User exists and students variables are set

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Student</h1>
            {/* <form className="space-y-4">
                <div>
                    <Label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</Label>
                    <Input type="text" name="id" readOnly defaultValue={studentData.id} className="read-only:bg-gray-100 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</Label>
                        <Input type="text" name="first_name" defaultValue={studentData.first_name} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required/>
                    </div>
                    <div>
                        <Label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</Label>
                        <Input type="text" name="last_name" defaultValue={studentData.last_name} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required/>
                    </div>
                </div>
                <div>
                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
                    <Input type="password" name="password" minLength={8} defaultValue={studentData.password} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required/>
                </div>
                <div>
                    <Label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">Date of Birth</Label>
                    <Input type="date" name="date_of_birth" max="2023-01-01" min="1995-01-01" defaultValue={studentData.date_of_birth} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
                </div>
                <div>
                    <Label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</Label>
                    <Input type="text" name="address" defaultValue={studentData.address} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
                </div>
                <div>
                    <Label htmlFor="parent_phone" className="block text-sm font-medium text-gray-700">Parent Phone Number</Label>
                    <Input type="text" name="parent_phone" defaultValue={studentData.phone_number} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required/>
                </div>
                <div className="flex flex-col">
                    <Label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</Label>
                    <select name="gender" defaultValue={studentData.gender} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 p-2 border rounded" required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <Label htmlFor="tutor_group" className="block text-sm font-medium text-gray-700">Tutor Group</Label>
                    <Input type="text" name="tutor_group" defaultValue={studentData.tutor_group} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
                </div>
                <div className="mt-5">
                    <SubmitButton 
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm" 
                    pendingText="Updating..."
                    formAction={updateStudentAction}>
                        Save
                    </SubmitButton>
                </div>
            </form> */}
            <form className="space-y-4">
                <div>
                    <Label htmlFor="student_id" className="block text-sm font-medium text-gray-700">Student ID</Label>
                    <Input type="text" name="student_id" value={studentData.id} readOnly className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <Label htmlFor="action_type" className="block text-sm font-medium text-gray-700">Action Type</Label>
                    <select name="action_type" value={actionType} onChange={handleActionTypeChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                        <option value="behaviour">Behaviour</option>
                        <option value="achievement">Achievement</option>
                        <option value="note">Note</option>
                    </select>
                </div>
                {(actionType === 'behaviour' || actionType === 'achievement') && (
                    <div>
                        <Label htmlFor="points" className="block text-sm font-medium text-gray-700">Points</Label>
                        <Input type="number" name="points" value={points} onChange={(e) => setPoints(e.target.value)} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                )}
                <div>
                    <Label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</Label>
                    <Input type="text" name="message" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <Label htmlFor="date_assigned" className="block text-sm font-medium text-gray-700">Date Assigned</Label>
                    <Input type="date" name="date_assigned" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="mt-5">
                    <SubmitButton 
                    formAction={assignStudentAction} 
                    pendingText="Working...." 
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                        Submit
                    </SubmitButton>
                </div>
            </form>
        </div>
    )
}