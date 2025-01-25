import React, { ReactNode } from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import UserIcon from '@/components/auth/UserIcon';
import { HiOutlineDotsVertical } from '@react-icons/all-files/hi/HiOutlineDotsVertical';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import { ModeToggle } from '@/components/ModeToggle/ModeToggle';
import { IoIosNotifications } from '@react-icons/all-files/io/IoIosNotifications';
import { TiMessages } from '@react-icons/all-files/ti/TiMessages';
import { MdDashboard } from '@react-icons/all-files/md/MdDashboard';
import { IoCart } from '@react-icons/all-files/io5/IoCart';
import { IoIosLogOut } from '@react-icons/all-files/io/IoIosLogOut';
import { FaRegUserCircle } from '@react-icons/all-files/fa/FaRegUserCircle';
import { IoSettingsOutline } from '@react-icons/all-files/io5/IoSettingsOutline';
import { BiPurchaseTagAlt } from '@react-icons/all-files/bi/BiPurchaseTagAlt';
import { FaListUl } from '@react-icons/all-files/fa/FaListUl';
import AddCash from './AddCash';

const CART_LIMIT = 100;

type Item = {
    text: string;
    path: string;
    icon: ReactNode;
    authenticated?: boolean;
};

const ShoppingCartBadge = () => {
    const { cart } = useAuth();

    return (
        <div className="relative">
            <IoCart className="text-2xl" />
            {cart.items.length > 0 && (
                <span
                    className="absolute -bottom-1.5 -right-1.5 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full"
                    style={{ fontSize: '0.6rem' }}
                >
                    {cart.items.length > CART_LIMIT ? '99+' : cart.items.length}
                </span>
            )}
        </div>
    );
};

const userItems: Item[] = [
    {
        text: 'Dashboard',
        path: '/auth/dashboard/profile',
        icon: <MdDashboard />,
    },
    {
        text: 'Shopping Cart',
        path: '/auth/cart',
        icon: <ShoppingCartBadge />,
    },
];

const mainSideItems: Item[] = [
    {
        text: 'Notifications',
        path: '#notifications',
        icon: <IoIosNotifications />,
    },
    {
        text: 'Messages',
        path: '#messages',
        icon: <TiMessages />,
        authenticated: true,
    },
];

const dashboardItems = [
    {
        text: 'Your Offerts',
        path: '/auth/dashboard/youroffers',
        icon: <FaListUl />,
    },
    {
        text: 'Auction',
        path: '/auth/dashboard/auction',
        icon: <FaListUl />,
    },
    {
        text: 'History',
        path: '/auth/dashboard/history',
        icon: <BiPurchaseTagAlt />,
    },
    {
        text: 'Profile',
        path: '/auth/dashboard/profile',
        icon: <FaRegUserCircle />,
    },
    {
        text: 'Settings',
        path: '/auth/dashboard/settings',
        icon: <IoSettingsOutline />,
    },
];

const AppSidebar: React.FC = () => {
    const { logout, isAuthenticated } = useAuth();
    const location = useLocation();
    const isDashboardPage = location.pathname.startsWith('/auth/dashboard');

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center justify-center p-4">
                    {/* Company Logo */}
                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">HandMadeZone</span>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <div className="flex flex-col h-full p-4">
                    {/* Main Content */}
                    <div className="flex-grow space-y-4">
                        {mainSideItems
                            .filter(item => !item.authenticated || isAuthenticated)
                            .map(({ text, path, icon }) => (
                                <a
                                    key={text}
                                    href={path}
                                    className="block p-2 rounded-md text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <div className="flex gap-2 items-center">
                                        {icon}
                                        <span>{text}</span>
                                    </div>
                                </a>
                            ))}
                        <ModeToggle />
                        <div className="block p-2 rounded-md text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            <AddCash />
                        </div>

                        {isDashboardPage && (
                            <>
                                {dashboardItems.map(({ text, path, icon }) => (
                                    <Link
                                        key={text}
                                        to={path}
                                        className="block p-2 rounded-md text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <div className="flex gap-2 items-center">
                                            {icon}
                                            <span>{text}</span>
                                        </div>
                                    </Link>
                                ))}
                            </>
                        )}
                    </div>

                    {/* Footer Links */}
                    <div className="mt-auto space-y-2 pt-4">
                        <a href="#terms" className="block text-sm text-gray-500 dark:text-gray-400 hover:underline">
                            Terms of Service
                        </a>
                        <a href="#privacy" className="block text-sm text-gray-500 dark:text-gray-400 hover:underline">
                            Privacy Policy
                        </a>
                    </div>
                </div>
            </SidebarContent>
            {isAuthenticated && (
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton className="flex h-auto items-center gap-2">
                                        <UserIcon />
                                        <HiOutlineDotsVertical className="ml-auto text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="top"
                                    align="end"
                                    className="min-w-[200px] rounded-lg shadow-lg border border-gray-200 p-2 dark:border-gray-700 bg-[hsl(var(--sidebar-background))]"
                                >
                                    {userItems.map(({ text, path, icon }) => (
                                        <Link key={text} to={path} className="text-gray-900 dark:text-gray-100">
                                            <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                                <div className="flex gap-2 items-center">
                                                    {icon}
                                                    <span>{text}</span>
                                                </div>
                                            </DropdownMenuItem>
                                        </Link>
                                    ))}

                                    <div className="h-px my-2 bg-gray-200 dark:bg-gray-600" />
                                    <DropdownMenuItem
                                        onClick={() => logout()}
                                        className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-red-100 dark:hover:bg-red-800 text-red-600 dark:text-red-400 transition"
                                    >
                                        <div className="flex gap-2 items-center">
                                            <IoIosLogOut />
                                            <span>Sign out</span>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            )}
        </Sidebar>
    );
};

export default AppSidebar;
