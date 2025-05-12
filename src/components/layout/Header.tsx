'use client';

import { useAppSelector, useAppDispatch } from '@/redux/hook';
import Link from 'next/link';
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
import { Menu, Bell, Sun, Moon, LogOut, LayoutDashboard, Bubbles } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggel';
import Logo from '../ui/Logo';

interface HeaderProps {
    toggleSidebar: () => void;
    sidebarOpen: boolean;
}


export default function Header({ toggleSidebar, sidebarOpen }: HeaderProps) {
    const { user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = async () => {
        //   try {
        //     await authService.logout();
        //     // Remove the token cookie
        //     Cookies.remove('token', { path: '/' });
        //     dispatch(logout());
        //     router.push('/login');
        //   } catch (error) {
        //     console.error('Logout error:', error);
        //   }
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
                <div className=' cursor-pointer w-10 h-10 rounded-full bg-primary flex items-center justify-center bg-[#3fc3ac] text-white'>
                    <p>AK</p>
                </div>
                <div>
                    |
                </div>
                <Button variant="ghost" size="icon" className="relative cursor-pointer">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
                </Button>
                {user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                {/* <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar.png" alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar> */}
                                <p>Avtart</p>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <span>{user.name}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>{user.email}</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </header>
    );
}

