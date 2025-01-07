import { User } from "lucide-react";
import { Teacher } from "@/utils/teacherData";
import { redirect } from "next/navigation";


//Import the profile interface from data.js





export const ProfileCard = (props: Teacher) => {


    const { id, first_name, last_name, gender, tutor_group, phone_number } = props;


    return (

        <div className="rounded-[15px] border border-solid">

            <User />


            <div className="p-3">

                <h2 className="">Name: {first_name} {last_name}</h2>
                <p>Id: {id}</p>

                <p>Gender: {gender}</p>

                <p>Tutor Group: {tutor_group}</p>

                
                <p>Phone Number: {phone_number}</p>

                

            </div>

        </div>

    )

}