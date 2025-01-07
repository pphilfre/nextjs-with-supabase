import { User } from "lucide-react";
import { Student } from "@/utils/studentData";
import { redirect } from "next/navigation";
import { deleteStudent } from "@/app/actions";


//Import the profile interface from data.js





export const ProfileCard = (props: Student) => {


    const { id, first_name, last_name, email, gender, tutor_group } = props;

    const redirectToManage = async (formData: FormData) => {
        "use server";
        redirect("/protected/student-actions?id=" + formData.get("itemId"));
      }
    
      const redirectToEdit = async (formData: FormData) => {
        "use server";
        redirect("/edit-student?id=" + formData.get("itemId"));
      }


    return (

        <div className="profile__card rounded-[15px] border border-solid">

            <User />


            <div className="p-3">

                <h2 className="">Name: {first_name} {last_name}</h2>
                <p>Id: {id}</p>
                <p>Email: {email}</p>

                <p>Gender: {gender}</p>

                <p>Tutor Group: {tutor_group}</p>

                <form action={redirectToManage}>
                    <input name="itemId" className="hidden" value={id} />
                    <button type="submit" className=" text-green-500">Manage</button>
                </form>
                <form action={redirectToEdit}>
                    <input name="itemId" className="hidden" value={id} />
                    <button type="submit" className=" text-sky-500">Edit</button>
                </form>
                <form action={deleteStudent}>
                    <input name="itemId" className="hidden" value={id} />
                    <button type="submit" className="text-orange-600">Delete</button>
                </form>

            </div>

        </div>

    )

}