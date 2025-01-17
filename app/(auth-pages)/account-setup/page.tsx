import { setupUserAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function SetupAccount(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Setup Account</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="first_name">First Name</Label>
        <Input name="first_name" placeholder="Bob" required />
        <Label htmlFor="last_name">Last Name</Label>
        <Input name="last_name" placeholder="Smith" required />
        <Label htmlFor="gender">Gender</Label>
        <select name="gender" className="p-2 border rounded">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
              <option value="other">Other</option>
            </select>
        <Label htmlFor="address">Address</Label>
        <Input name="address" placeholder="10 Road Name" required />
        <Label htmlFor="postcode">Postcode</Label>
        <Input name="postcode" placeholder="" required />
        <Label htmlFor="phone_number">Phone Number</Label>
        <Input name="phone_number" placeholder="Smith" type="tel" required />
        <Label htmlFor="tutor_group">Tutor Group</Label>
        <Input name="tutor_group" placeholder="AA" required />
        <SubmitButton pendingText="Setting up..." formAction={setupUserAction}>
          Finish Setup
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
