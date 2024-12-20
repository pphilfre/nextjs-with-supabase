import StudentView from "@/components/student-view";


interface StudentViewProps {
  searchQuery: string | null;
}


export default async function StudentViewPage(props: { searchParams: Promise<StudentViewProps> }) {
    const searchParams = (await props.searchParams).searchQuery;

    return <StudentView searchQuery={searchParams}/>;

}