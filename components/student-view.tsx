"use client";

import { useState, useEffect } from "react";
import { ProfileCard } from "./student-card";
import SearchBar from "./search-bar";
import { data, Student } from "@/utils/studentData";

interface StudentViewProps {
    searchQuery: string | null;
  }

export default function StudentView({ searchQuery }: StudentViewProps) {
    const [studentData, setStudentData] = useState<Student[]>([]);
    


    useEffect(() => {
        const handleSearch = () => {
            // Filter the data based on search query

            const findUser = data.filter((user) => {

                if (searchQuery) {

                    return (

                        user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||

                        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||

                        user.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||

                        user.tutor_group.toLowerCase().includes(searchQuery.toLowerCase())

                    );

                } else {

                    // If no search query, return the original data

                    return true;

                }
            });

            setStudentData(findUser);

        };


        handleSearch();
    }, [searchQuery]);


    const totalStudents = studentData.length;

    return (

        <section className="h-[100vh] w-screen px-[2rem] md:px-[6rem] mt-[100px]">

            <p className="mb-10 ">Showing {totalStudents} {totalStudents > 1 ? "Students" : "Student"}</p>
            <SearchBar defaultString={searchQuery} />

            {/* // Conditionally render the profile cards */}

            <div className="mt-8">

                {totalStudents === 0 ? <p>No result returned</p> : (

                    // return the profile cards here

                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5">

                        {studentData.map(({ id, first_name, last_name, email, gender, tutor_group }: Student) => {

                            return (

                                <div key={id}>

                                    <ProfileCard id={id} first_name={first_name} last_name={last_name} email={email} gender={gender} tutor_group={tutor_group} />

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


