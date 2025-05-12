'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hook';
import Sidebar from '@/components/layout/SideBar';
import Header from '@/components/layout/Header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const router = useRouter();
    const pathname = usePathname();

    // Check authentication status on mount and route changes
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router, pathname]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    if (!isAuthenticated) {
        return null; // Return null while redirecting
    }

    return (
        <>
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />  
            </div>
            <div className="flex h-[calc(100vh-64px)] overflow-hidden">
                <Sidebar isOpen={sidebarOpen} />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">
                    {children}
                </main>
            </div>
        </>
    );
}

