import * as React from 'react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { ModeToggle } from '@/components/ModeToggle/ModeToggle';
import { IoCart } from '@react-icons/all-files/io5/IoCart';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthProvider';

const Navbar: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <NavigationMenu className="max-w-full flex-none justify-normal p-2 w-full">
            <NavigationMenuList className="justify-between w-full">
                <div className="flex items-center gap-4">
                    {/* Logo */}
                    <Link to="/" className="font-bold text-lg">
                        HandMadeZone
                    </Link>

                    {/* Products */}
                    <NavigationMenuItem>
                        <Link to="/products" className="hover:underline">
                            Products
                        </Link>
                    </NavigationMenuItem>
                </div>

                <div className="flex items-center gap-4">
                    {/* Shopping Cart */}
                    <NavigationMenuItem>
                        <Button variant="outline" size="icon">
                            <Link to="/cart" className="hover:underline">
                                <IoCart />
                            </Link>
                        </Button>
                    </NavigationMenuItem>

                    {/* Theme mode */}
                    <NavigationMenuItem>
                        <ModeToggle />
                    </NavigationMenuItem>

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

                    {/* Avatar */}
                    {isAuthenticated && (
                        <NavigationMenuItem>
                            <Avatar>
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                    className="w-8 h-8 rounded-full"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </NavigationMenuItem>
                    )}
                </div>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Navbar;
