import { User } from "lucide-react";
import { Student } from "@/utils/studentData";


//Import the profile interface from data.js





export const ProfileCard = (props: Student) => {


    const { id, first_name, last_name, email, gender, tutor_group } = props;


    return (

        <div className="profile__card rounded-[15px] border border-solid">

            <User />


            <div className=" bg-slate-300 p-3">

                <h2 className="">Name: {first_name} {last_name}</h2>
                <p>Id: {id}</p>
                <p>Email: {email}</p>

                <p>Gender: {gender}</p>

                <p>Tutor Group: {tutor_group}</p>


            </div>

        </div>

    )

}