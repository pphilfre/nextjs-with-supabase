"use client";

import { useState } from 'react';

interface DashboardSidebarProps {
    pageSelected: string | null;
}  

export default function DashboardSidebar(page: DashboardSidebarProps) {
    const [showStudentOptions, setShowStudentOptions] = useState(false);
    var pageInt;
    try {
        var p = page.pageSelected ? page.pageSelected.toString() : "";


        pageInt = parseInt(p);
    } catch {
        return;
    }
    if (pageInt <= 5 && pageInt >= 1) {
        setShowStudentOptions(true);
    }
    return (
        <aside className="w-1/5 bg-white shadow-md h-screen">
            <div className="p-4">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            </div>
            <nav className="mt-6">
                <a href="/protected/" className={`block py-2.5 px-4 rounded transition ${page.pageSelected === "0" ? 'duration-200 bg-gray-200 text-gray-900 font-bold' : 'duration-750 hover:bg-gray-200 hover:text-gray-900'} `}>
                    Home
                </a>
                <a 
                    href="/protected/students/" 
                    className={`block py-2.5 px-4 rounded transition ${page.pageSelected === "1" ? 'duration-200 bg-gray-200 text-gray-900 font-bold' : 'duration-750 hover:bg-gray-200 hover:text-gray-900'} `}
                    onClick={(e) => {
                        e.preventDefault();
                        setShowStudentOptions(!showStudentOptions);
                    }}
                >
                    Students
                </a>
                {showStudentOptions && (
                    <div className="ml-4">
                        <a href="/protected/students-notes" className={`block py-2.5 px-4 rounded transition ${page.pageSelected === "3" ? 'duration-200 bg-gray-200 text-gray-900 font-bold' : 'duration-750 hover:bg-gray-200 hover:text-gray-900'} `}>
                            Notes
                        </a>
                        <a href="/protected/students-behaviours" className={`block py-2.5 px-4 rounded transition ${page.pageSelected === "4" ? 'duration-200 bg-gray-200 text-gray-900 font-bold' : 'duration-750 hover:bg-gray-200 hover:text-gray-900'} `}>
                            Behaviour
                        </a>
                        <a href="/protected/students-positives" className={`block py-2.5 px-4 rounded transition ${page.pageSelected === "5" ? 'duration-200 bg-gray-200 text-gray-900 font-bold' : 'duration-750 hover:bg-gray-200 hover:text-gray-900'} `}>
                            Positives
                        </a>
                    </div>
                )}
                <a href="/protected/teachers/" className={`block py-2.5 px-4 rounded transition ${page.pageSelected === "2" ? 'duration-200 bg-gray-200 text-gray-900 font-bold' : 'duration-750 hover:bg-gray-200 hover:text-gray-900'} `}>
                    Teachers
                </a>
            </nav>
        </aside>
    )
}