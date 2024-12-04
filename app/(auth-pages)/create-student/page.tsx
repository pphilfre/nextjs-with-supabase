import { createStudentAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function createStudent(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  
  return (
    <div className="flex flex-col gap-2 items-start">
      <h3 className="font-bold text-xl mb-4">Create new student</h3>
      <form className="flex-1 flex flex-col min-w-64">
        <div className="flex flex-col gap-2 [&>Input]:mb-3 mt-8">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
              <Input type="text" name="firstName" className="p-2 border rounded" required />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
              <Input type="text" name="lastName" className="p-2 border rounded" required />
            </div>
          </div>
          <div className="flex flex-col">
            <Label htmlFor="password" className="text-sm font-medium">Student Password</Label>
            <Input type="password" name="password" placeholder="password" minLength={8} className="p-2 border rounded" required />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="gender" className="text-sm font-medium">Gender</Label>
            <select name="gender" className="p-2 border rounded">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex flex-col">
            <Label htmlFor="dob" className="text-sm font-medium">Date of Birth</Label>
            <Input type="date" name="dob" max="2023-01-01" min="1995-01-01" className="p-2 border rounded" required />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="address" className="text-sm font-medium">Address</Label>
            <Input type="text" name="address" className="p-2 border rounded" required />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="tutorGroup" className="text-sm font-medium">Tutor Group</Label>
            <Input type="text" name="tutorGroup" className="p-2 border rounded" required />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="parentPhone" className="text-sm font-medium">Parent Phone Number</Label>
            <Input type="tel" name="parentPhone" className="p-2 border rounded" required />
          </div>
          <SubmitButton pendingText="Working..." className="mt-4 p-2 bg-blue-500 text-white rounded" formAction={createStudentAction}>
            Setup Student
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
