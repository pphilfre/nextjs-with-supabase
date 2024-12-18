import StudentView from "@/components/student-view";


interface Search {
  q: string;
}


export default async function StudentViewPage(props: { q: Promise<Search> }) {
    const searchParams = await props.q;

    return <StudentView searchQuery={searchParams.q} />;

}