import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import AppSidebar from './AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

interface IDefaultLayout {
    children: React.ReactNode;
}

const DefaultLayout: React.FC<IDefaultLayout> = ({ children }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col min-h-screen flex-1">
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <div className="flex flex-grow">{children}</div>
                    <Footer />
                </div>
            </main>
        </SidebarProvider>
    );
};

export default DefaultLayout;
