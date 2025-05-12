'use client';

import {  useAppDispatch } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/Button';
import { logout } from '@/redux/slices/authSlice';
import {  LogOut,Bell  } from 'lucide-react';
import Logo from '../ui/Logo';



export default function Header() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = async () => {
        dispatch(logout())
        router.push('/login')
    };

    return (
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            {/* <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleSidebar}
            >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
            </Button> */}
            <Logo />
            <div className="flex items-center gap-2 md:ml-auto md:gap-4">
                {/* <ThemeToggle /> */}

                
                <Button variant="ghost" size="icon" className="relative cursor-pointer">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
                </Button>
                <div>
                    |
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <div className=' cursor-pointer w-10 h-10 rounded-full bg-primary flex items-center justify-center bg-[#3fc3ac] text-white'>
                                <p>AK</p>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className='bg-white'>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <span>Admin </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                               <span>admin@example.com</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}

