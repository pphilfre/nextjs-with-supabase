import { getUsersAction, updateStudentAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { useState } from 'react';



interface User {
    id: string;
    first_name: string;
    last_name: string;
    gender: string;
    tutor_group: string;
    email: string;
    date_of_birth: string;
    address: string;
    phone_number: string;
}

const UserTable = ({ registeredUsers }: { registeredUsers: { props: { data: User[] } } }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const openDialog = (user: User) => {
        setSelectedUser(user);
        setIsOpen(true);
    };

    const closeDialog = () => {
        setSelectedUser(null);
        setIsOpen(false);
    };

    return (
        <div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutor Group</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {registeredUsers.props?.data.map(item => (
                        <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.first_name} {item.last_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.gender}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.tutor_group}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button className="text-indigo-600 hover:text-indigo-900" onClick={() => openDialog(item)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
                                            <form className="space-y-4">
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
                                                    <Input type="password" name="password" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</Label>
                                                    <Input type="text" name="first_name" defaultValue={selectedUser.first_name} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</Label>
                                                    <Input type="text" name="last_name" defaultValue={selectedUser.last_name} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">Date of Birth</Label>
                                                    <Input type="date" name="date_of_birth" defaultValue={selectedUser.date_of_birth} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</Label>
                                                    <Input type="text" name="address" defaultValue={selectedUser.address} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</Label>
                                                    <Input type="text" name="phone_number" defaultValue={selectedUser.phone_number} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</Label>
                                                    <Input type="text" name="gender" defaultValue={selectedUser.gender} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="tutor_group" className="block text-sm font-medium text-gray-700">Tutor Group</Label>
                                                    <Input type="text" name="tutor_group" defaultValue={selectedUser.tutor_group} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <SubmitButton className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" pendingText="Signing In..." formAction={updateStudentAction}>Save</SubmitButton>
                                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onClick={closeDialog}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default async function createStudent(props: { searchParams: Promise<Message> }) {
    const searchParams = await props.searchParams;
    const registeredUsers = await getUsersAction();
    if (!registeredUsers || 'error' in registeredUsers) {
        console.log("No users found or an error occurred");
        return <div>No users found or an error occurred</div>;
    }
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    return (
        <div className="overflow-x-auto">
            <UserTable registeredUsers={registeredUsers} />
        </div>
    )

}

/*



*/