"use client";

import { useSearchParams } from 'next/navigation';
import StudentView from "@/components/student-view";

export default async function StudentViewPage() {

    const searchParams = useSearchParams();
    const searchQuery = searchParams ? searchParams.get('q') : null;

    return  <StudentView searchQuery={searchQuery}/>
}