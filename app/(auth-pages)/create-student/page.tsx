import { createStudentAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function createStudent(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex flex-col gap-2 items-start">
    <h2 className="font-bold text-2xl mb-4">Create new student</h2>
    <form className="flex-1 flex flex-col min-w-64">
      <div className="flex flex-col gap-2 [&>Input]:mb-3 mt-8">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
            <Input type="text" id="firstName" className="p-2 border rounded" required />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
            <Input type="text" id="lastName" className="p-2 border rounded" required />
          </div>
        </div>
        <div className="flex flex-col">
          <Label htmlFor="password" className="text-sm font-medium">Student Password</Label>
          <Input type="password" id="password" className="p-2 border rounded" required />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="gender" className="text-sm font-medium">Gender</Label>
          <select id="gender" className="p-2 border rounded">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex flex-col">
          <Label htmlFor="dob" className="text-sm font-medium">Date of Birth</Label>
          <Input type="date" id="dob" className="p-2 border rounded" required />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="address" className="text-sm font-medium">Address</Label>
          <Input type="text" id="address" className="p-2 border rounded" required />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="tutorGroup" className="text-sm font-medium">Tutor Group</Label>
          <Input type="text" id="tutorGroup" className="p-2 border rounded" required />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="parentPhone" className="text-sm font-medium">Parent Phone Number</Label>
          <Input type="tel" id="parentPhone" className="p-2 border rounded" required />
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
