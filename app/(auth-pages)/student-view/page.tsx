import { getUsersAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function createStudent(props: { searchParams: Promise<Message> }) {
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
        <div className="overflow-x-auto">
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
                                <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                            
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )

}

/*



*/