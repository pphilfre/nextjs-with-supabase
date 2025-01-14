
export default function DashboardSidebar(pageSelected: any) {
    return (
        <aside className="w-1/5 bg-white shadow-md h-screen">
            <div className="p-4">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            </div>
            <nav className="mt-6">
                <a href="#" className={`block py-2.5 px-4 rounded transition ${pageSelected === 0 ? 'duration-200 bg-gray-200 text-gray-900 font-bold' : 'duration-750 hover:bg-gray-200 hover:text-gray-900'} `}>
                    Home
                </a>
                <a href="/protected/students/" className={`block py-2.5 px-4 rounded transition ${pageSelected === 1 ? 'duration-200 bg-gray-200 text-gray-900 font-bold' : 'duration-750 hover:bg-gray-200 hover:text-gray-900'} `}>
                    Students
                </a>
                <a href="/protected/teachers/" className={`block py-2.5 px-4 rounded transition ${pageSelected === 2 ? 'duration-200 bg-gray-200 text-gray-900 font-bold' : 'duration-750 hover:bg-gray-200 hover:text-gray-900'} `}>
                    Teachers
                </a>
            </nav>
        </aside>
    )
}