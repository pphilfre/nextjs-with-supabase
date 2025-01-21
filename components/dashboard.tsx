"use client";
import { encodedRedirect } from '@/utils/utils';
import { redirect } from 'next/dist/server/api-utils';
import { useState, useEffect } from 'react';

interface DashboardSidebarProps {
    pageSelected: string | null;
}  

export default function DashboardSidebar({ pageSelected }: DashboardSidebarProps) {
    const [showStudentOptions, setShowStudentOptions] = useState(false);

    useEffect(() => {
        let pageInt = 0;
        try {
            const p = pageSelected ? pageSelected.toString() : "";
            pageInt = parseInt(p);
        } catch {
            console.log("Error parsing page number");
        }
        if (pageInt <= 5 && pageInt >= 1) {
            setShowStudentOptions(true);
        }
    }, [pageSelected]);

    return (
        <aside className="w-1/5 bg-white shadow-md h-screen">
            <div className="p-4">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            </div>
            <nav className="mt-6">
                <a href="/protected/" className={`block py-2.5 px-4 rounded transition ${pageSelected === "0" ? 'duration-200 bg-gray-200 text-gray-900 font-bold' : 'duration-750 hover:bg-gray-200 hover:text-gray-900'} `}>
                    Home
                </a>
                <a 
                    href="/protected/students/" 
                    className={`block py-2.5 px-4 rounded transition ${pageSelected === "1" ? 'duration-200 bg-gray-200 text-gray-900 font-bold' : 'duration-750 hover:bg-gray-200 hover:text-gray-900'} `}
                    onClick={(e) => {
                        e.preventDefault();
                        if (showStudentOptions) {
                            window.location.href = "/protected/students/";
                        } else {
                        setShowStudentOptions(!showStudentOptions);
                        }
                    }}
                >
                    Students
                </a>
                {showStudentOptions && (
                    <div className="ml-4">
                        <a href="/protected/student-notes" className={`block py-2.5 px-4 rounded transition ${pageSelected === "3" ? 'duration-200 bg-gray-200 text-gray-900 font-bold' : 'duration-750 hover:bg-gray-200 hover:text-gray-900'} `}>
                            Notes
                        </a>
                        <a href="/protected/student-behaviour" className={`block py-2.5 px-4 rounded transition ${pageSelected === "4" ? 'duration-200 bg-gray-200 text-gray-900 font-bold' : 'duration-750 hover:bg-gray-200 hover:text-gray-900'} `}>
                            Behaviour
                        </a>
                        <a href="/protected/student-positives" className={`block py-2.5 px-4 rounded transition ${pageSelected === "5" ? 'duration-200 bg-gray-200 text-gray-900 font-bold' : 'duration-750 hover:bg-gray-200 hover:text-gray-900'} `}>
                            Positives
                        </a>
                    </div>
                )}
                <a href="/protected/teachers/" className={`block py-2.5 px-4 rounded transition ${pageSelected === "2" ? 'duration-200 bg-gray-200 text-gray-900 font-bold' : 'duration-750 hover:bg-gray-200 hover:text-gray-900'} `}>
                    Teachers
                </a>
            </nav>
        </aside>
    )
}