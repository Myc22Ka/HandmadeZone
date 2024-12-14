import * as React from 'react';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { ModeToggle } from '@/components/ModeToggle/ModeToggle';

const Navbar: React.FC = () => {
    return (
        <NavigationMenu className="max-w-full flex-none justify-normal p-2 w-full">
            <NavigationMenuList className="justify-between w-full">
                <div className="flex items-center gap-2">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                        <NavigationMenuContent>bye</NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul>
                                <li>
                                    <a href="/painting">Painting</a>
                                </li>
                                <li>
                                    <a href="/crochet-products">Crochet</a>
                                </li>
                                <li>
                                    <a href="/pottery">Pottery</a>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                        <NavigationMenuContent>hi</NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link to="/docs">Documentation</Link>
                    </NavigationMenuItem>
                </div>
                <div className="flex items-center gap-2">
                    <NavigationMenuItem>
                        <ModeToggle />
                    </NavigationMenuItem>
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
                </div>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Navbar;
