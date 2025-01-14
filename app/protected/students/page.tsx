import DashboardSidebar from "@/components/dashboard";
import StudentView from "@/components/student-view";

interface StudentViewProps {
    searchQuery: string | null;
}

export default async function StudentViewPage(props: { searchParams: Promise<StudentViewProps> }) {
    const searchParams = (await props.searchParams).searchQuery;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 w-screen">
            <div className="flex flex-1">
                <DashboardSidebar pageSelected={"1"} />
                <main className="flex-1">
                    <StudentView searchQuery={searchParams} />
                </main>
            </div>
        </div>
    );
}