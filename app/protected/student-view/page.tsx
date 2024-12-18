"use client";

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StudentView from "@/components/student-view";

export default async function StudentViewPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string | null>(null);

    useEffect(() => {
        if (router.isReady) {
            const query = router.query.q as string | undefined;
            setSearchQuery(query || null);
        }
    }, [router.isReady, router.query]);

    return <StudentView searchQuery={searchQuery} />;

}