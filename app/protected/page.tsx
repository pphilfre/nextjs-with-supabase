import { FormMessage, Message } from "@/components/form-message";
import { getUsersAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import DeleteButton from './deleteButton';

export default async function ProtectedPage(props: { searchParams: Promise<Message> }) {
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

  const handleDelete = async (id: string) => {
    const response = await fetch('/api/deleteStudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      // Handle successful deletion (e.g., refresh the list of users)
    } else {
      // Handle error
      const errorData = await response.json();
      console.error('Error deleting student:', errorData.error);
    }
  };

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

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Tutor Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {registeredUsers.props?.data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.first_name} {item.last_name} </td>
              <td>{item.gender}</td>
              <td>{item.tutor_group}</td>
              <td>
                <button>Edit</button>
                <DeleteButton id={item.id} onDelete={handleDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
