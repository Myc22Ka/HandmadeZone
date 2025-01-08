import * as React from 'react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthProvider';
import { SidebarTrigger } from '@/components/ui/sidebar';
import VerticalSeparator from '@/components/utilities/VerticalSeparator';

const Navbar: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <NavigationMenu className="max-w-full flex-none justify-normal p-2 w-full">
            <NavigationMenuList className="justify-between w-full h-full">
                <div className="flex items-center gap-4 h-full">
                    {/* Logo */}
                    <Link to="/" className="font-bold text-lg">
                        HandMadeZone
                    </Link>

                    <VerticalSeparator />

                    {/* Offers */}
                    <NavigationMenuItem>
                        <Link to="/offers" className="hover:underline">
                            Offers
                        </Link>
                    </NavigationMenuItem>
                </div>

                <div className="flex items-center gap-4 h-full">
                    {/* Login/Logut */}
                    {!isAuthenticated ? (
                        <>
                            <NavigationMenuItem>
                                <Link to="/login">
                                    <Button variant="secondary">Login</Button>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link to="/signup">
                                    <Button variant="default">Sign Up</Button>
                                </Link>
                            </NavigationMenuItem>
                        </>
                    ) : null}

                    <SidebarTrigger />
                </div>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Navbar;
