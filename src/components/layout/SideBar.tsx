'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Calendar,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Landmark
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';

interface SidebarProps {
    isOpen: boolean;
}

interface SidebarItemProps {
    href: string;
    icon: React.ReactNode;
    title: string;
    isCollapsed: boolean;
    className?: string;
}

function SidebarItem({ href, icon, title, isCollapsed,className }: SidebarItemProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground 
            ${isActive && 'bg-accent text-accent-foreground'} 
            ${isCollapsed ? 'justify-center' : ''}
            ${className}`}
        >
            {icon}
            {!isCollapsed && <span>{title}</span>}
        </Link>
    );
}

export default function Sidebar({ isOpen }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <aside
            className={`fixed relative inset-y-0 z-20 flex h-full flex-col border-r bg-background transition-all duration-300 md:relative md:z-0  ${isCollapsed ? "w-16" : "w-64"}`}
        >
            <Button
                    variant="ghost"
                    size="icon"
                    className={`hidden md:flex absolute z-10 !h-7 !w-7  bg-white !rounded-full cursor-pointer ${isCollapsed?"top-3 -right-5":"top-7 right-2"}`}
                    onClick={toggleCollapse}
                >
                    {isCollapsed ? <ChevronRight color='#3fc3ac' className="h-4 w-4" strokeWidth={2.75} /> : <ChevronLeft color='#3fc3ac' className="h-4 w-4 " strokeWidth={2.75} />}
                </Button>
            <div className={` flex-1 relative flex-col  bg-[#2c4e6c] text-white items-center justify-between ${isCollapsed? "py-5":"m-5 p-3 rounded-xl"}`}>
                <nav className="grid gap-2 px-2">
                    <SidebarItem
                        href="/app/dashboard"
                        icon={<LayoutDashboard className="h-5 w-5" />}
                        title="Dashboard"
                        isCollapsed={isCollapsed}
                    />
                    <SidebarItem
                        href="/app/appealTable"
                        icon={<Landmark  className="h-5 w-5" />}
                        title="Appeals Letter"
                        isCollapsed={isCollapsed}
                    />
                    <SidebarItem
                        href="/app/calender"
                        icon={<Calendar className="h-5 w-5" />}
                        title="Calendar"
                        isCollapsed={isCollapsed}
                    />
                    
                </nav>
                <nav className={`grid absolute bottom-0 left-0 w-full  gap-2 mb-5 ${isCollapsed?"px-2":"p-4"}`}>

                    <SidebarItem
                        href="/app/settings"
                        icon={<Settings className="h-5 w-5" />}
                        title="Settings"
                        isCollapsed={isCollapsed}
                        className='mb-4 '
                    />
                    <Button className=' text-center bg-[#3fc3ac] text-white' >
                      <LogOut className="h-5 w-5" /> {isCollapsed ? '':'Logout'} 
                    </Button>
                </nav>
            </div>
        </aside>
    )
}
