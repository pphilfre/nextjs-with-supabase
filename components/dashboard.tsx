
export default function DashboardSidebar(pageSelected: number) {

    

    return (
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
    )
}