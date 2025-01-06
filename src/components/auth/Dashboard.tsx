import React, { useState } from 'react';
import SideNav from '@/views/Dashboard/SideNavbar';
import UserPanel from '@/views/Dashboard/ProfileSection';
import OptionSection from '@/views/Dashboard/OptionSection';
import ProductSection from '@/views/Dashboard/ProductsSection';
import HistorySection from '@/views/Dashboard/HistorySection';
import DefaultLayout from '@/layouts/DefaultLayout';
const Dashboard: React.FC = () => {
    const [selectedSection, setSelectedSection] = useState<string>('');

    const handleSelectSection = (section: string) => {
        setSelectedSection(section);
    };

    return (
        <DefaultLayout>
            <SideNav onSelectSection={handleSelectSection} />

            <div className="mt-10 p-4">
                {selectedSection === 'Products' && <ProductSection />}
                {selectedSection === 'History' && <HistorySection />}
                {selectedSection === 'Profile' && <UserPanel />}
                {selectedSection === 'Settings' && <OptionSection />}
            </div>
        </DefaultLayout>
    );
};

export default Dashboard;
