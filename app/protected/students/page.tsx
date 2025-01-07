import StudentView from "@/components/student-view";

interface StudentViewProps {
    searchQuery: string | null;
}

export default async function StudentViewPage(props: { searchParams: Promise<StudentViewProps> }) {
    const searchParams = (await props.searchParams).searchQuery;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 w-screen">
            <div className="flex flex-1">
                <aside className="w-1/5 bg-white shadow-md h-screen">
                    <div className="p-4">
                        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                    </div>
                    <nav className="mt-6">
                        <a href="/protected/" className="block py-2.5 px-4 rounded transition duration-200 bg-gray-200 text-gray-900 font-bold">
                            Home
                        </a>
                        <div className="relative group">
                            <button className="block w-full text-left py-2.5 px-4 rounded transition duration-750 hover:bg-gray-200 hover:text-gray-900">
                                Users
                            </button>
                            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded mt-1 group-hover:delay-[1500ms]">
                                <a href="/protected/students/" className="block py-2 px-4 hover:bg-gray-200">Students</a>
                                <a href="/protected/teacher/" className="block py-2 px-4 hover:bg-gray-200">Teachers</a>
                            </div>
                        </div>
                    </nav>
                </aside>
                <main className="flex-1">
                    <StudentView searchQuery={searchParams} />
                </main>
            </div>
        </div>
    );
}