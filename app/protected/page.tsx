import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Create new student</h2>
        <form className="flex-1 flex flex-col min-w-64">
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <div className="flex gap-4">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                <input type="text" id="firstName" className="p-2 border rounded" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                <input type="text" id="lastName" className="p-2 border rounded" />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium">Student Password</label>
              <input type="password" id="password" className="p-2 border rounded" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="gender" className="text-sm font-medium">Gender</label>
              <select id="gender" className="p-2 border rounded">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="dob" className="text-sm font-medium">Date of Birth</label>
              <input type="date" id="dob" className="p-2 border rounded" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="address" className="text-sm font-medium">Address</label>
              <input type="text" id="address" className="p-2 border rounded" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="tutorGroup" className="text-sm font-medium">Tutor Group</label>
              <input type="text" id="tutorGroup" className="p-2 border rounded" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="parentPhone" className="text-sm font-medium">Parent Phone Number</label>
              <input type="tel" id="parentPhone" className="p-2 border rounded" />
            </div>
            <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
