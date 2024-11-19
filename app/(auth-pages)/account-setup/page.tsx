//import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function SetupAccount(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Setup Account</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="first_name">First Name</Label>
        <Input name="first_name" placeholder="Bob" required />
        <Label htmlFor="last_name">Last Name</Label>
        <Input name="last_name" placeholder="Smith" required />
        <Label htmlFor="gender">Gender</Label>
        <Input name="gender" placeholder="" required />
        <Label htmlFor="address">Address</Label>
        <Input name="address" placeholder="10 Road Name" required />
        <Label htmlFor="postcode">Postcode</Label>
        <Input name="postcode" placeholder="" required />
        <Label htmlFor="phone_number">Phone Number</Label>
        <Input name="phone_number" placeholder="Smith" type="tel" required />
        <Label htmlFor="tutor_group">Tutor Group</Label>
        <Input name="tutor_group" placeholder="AA" required />
        <SubmitButton pendingText="Signing In..." formAction={""}>
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
