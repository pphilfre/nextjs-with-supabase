import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { assignStudentAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/dashboard";

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
        <div className="flex flex-col min-h-screen bg-gray-100 w-screen">
            <div className="flex flex-1">
                <DashboardSidebar pageSelected={"2"} />
                <main className="flex-1 bg-gray-100 p-6">
                    <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                        <h2 className="text-xl font-semibold text-gray-800">Edit Student</h2>
                        <form className="space-y-4">
                            <div>
                                <Label htmlFor="student_id" className="block text-sm font-medium text-gray-700">Student ID</Label>
                                <Input type="text" name="student_id" defaultValue={studentData.id} readOnly className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <Label htmlFor="action_type" className="block text-sm font-medium text-gray-700">Action Type</Label>
                                <select name="action_type" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 p-2 border rounded" required>
                                    <option value="behaviour">Behaviour</option>
                                    <option value="achievement">Achievement</option>
                                    <option value="note">Note</option>
                                </select>
                            </div>
                            
                            <div>
                                <Label htmlFor="points" className="block text-sm font-medium text-gray-700">Points</Label>
                                <Input type="number" name="points" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>
                            
                            <div>
                                <Label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</Label>
                                <Input type="text" name="message" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
                            </div>
                            <div>
                                <Label htmlFor="date_assigned" className="block text-sm font-medium text-gray-700">Date Assigned</Label>
                                <Input type="date" name="date_assigned" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
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
                </main>
                <footer className="bg-white text-center py-4 mt-auto shadow-md">
                    <p className="text-gray-600">© 2023 Your Company. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}