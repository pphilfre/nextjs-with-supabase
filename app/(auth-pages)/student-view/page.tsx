import { deleteStudent, getUsersAction } from "@/app/actions";
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

        <div>

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
                <button onClick={() => deleteStudent(item.id)}>Delete</button>
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