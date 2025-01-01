import React, { useState } from 'react';
import SideNav from '@/layouts/Dashboard/SideNavbar';
import UserPanel from '@/layouts/Dashboard/ProfileSection';
import OptionSection from '@/layouts/Dashboard/OptionSection';
import NoticeSection from '@/layouts/Dashboard/NoticeSection';
import HistorySection from '@/layouts/Dashboard/HistorySection';
const Dashboard: React.FC = () => {
    const [selectedSection, setSelectedSection] = useState<string>('');

    const handleSelectSection = (section: string) => {
        setSelectedSection(section);
    };

    return (
        <div>
            <SideNav onSelectSection={handleSelectSection} />

            <div className="mt-10 p-4">
                {selectedSection === 'Ogłoszenia' && <NoticeSection />}
                {selectedSection === 'Historia' && <HistorySection />}
                {selectedSection === 'Profil' && <UserPanel />}
                {selectedSection === 'Ustawienia' && <OptionSection />}
            </div>
        </div>
    );
};

export default Dashboard;
