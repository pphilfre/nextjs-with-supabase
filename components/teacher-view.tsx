import {ProfileCard} from "./teacher-card";
import SearchBar from "./search-bar";
import {data, Teacher} from "@/utils/teacherData";
import {getTeachersAction} from "@/app/actions";
import { redirect } from "next/navigation";


interface StudentViewProps {
    searchQuery: string | null;
}

export default async function StudentView(studentView: StudentViewProps) {

    const registeredUsers = await getTeachersAction();
    const searchQuery = studentView.searchQuery;

    const newUser = async (_: FormData) => {
        "use server";
        redirect("/create-student");
      }

      if (registeredUsers == null) { return; }

    const isListed = (user : Teacher[]) => {

        return data.filter((user) => {

            if (searchQuery) {
                console.log("Search Query: ", searchQuery);
                return (

                    user.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.phone_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.tutor_group.toLowerCase().includes(searchQuery.toLowerCase())
                );

            } else {
                console.log("No search Query");
                // If no search query, return the original data

                return true;

            }
        });





    }


    let teacherData : Teacher[] = [];

    const teacherFitsSearch = isListed(data);

    if (teacherData) {
        console.log("Teacher Data: ", teacherFitsSearch);
        teacherData = teacherFitsSearch;
    }

    /*
    registeredUsers.props?.data.forEach(student => {
        const fitsSearch = isListed(student);
        if (fitsSearch) {
            console.log("Fits search: ", fitsSearch);
            studentData = fitsSearch;
        } else {
            console.log("Doesnt fit search: ", fitsSearch)
        }
    });
    */

    const totalTeachers = teacherData.length;

    return (

        <section className="h-[100vh] w-screen px-[2rem] md:px-[6rem] mt-[100px]">
            <form action={newUser}>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  type="submit">
                  Add User
                </button>
              </form>
            <p className="mb-10 ">Showing {totalTeachers} {totalTeachers > 1 ? "Teachers" : "Teacher"}</p>
            <SearchBar defaultString={searchQuery} />

            {/* // Conditionally render the profile cards */}

            <div className="mt-8">

                {totalTeachers === 0 ? <p>No result returned</p> : (

                    // return the profile cards here

                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5">

                        {teacherData.map(({ id, first_name, last_name, gender, tutor_group, phone_number }: Teacher) => {

                            return (

                                <div key={id}>

                                    <ProfileCard id={id} first_name={first_name} last_name={last_name} gender={gender} tutor_group={tutor_group} phone_number={phone_number} />

                                </div>

                            )

                        })}


                    </div>


                    // End of profile data UI

                )}


            </div>

        </section>

    )

}


