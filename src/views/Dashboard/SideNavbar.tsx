import React from 'react';

interface SideNavProps {
    onSelectSection: (section: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({ onSelectSection }) => {
    return (
        <div className="flex justify-between items-center h-24 max-w-[1920px] mx-auto px-4">
            <ul className="hidden md:flex justify-center w-full ">
                <li
                    className="p-2 m-1 border-b-2  border-gray-400 rounded-lg hover:bg-gray-600 transition duration-100 ease-in-out"
                    onClick={() => onSelectSection('Products')}
                >
                    Products
                </li>
                <li
                    className="p-2 m-1 border-b-2  border-gray-400 rounded-lg hover:bg-gray-600 transition duration-100 ease-in-out"
                    onClick={() => onSelectSection('History')}
                >
                    History
                </li>
                <li
                    className="p-2 m-1 border-b-2 border-gray-400 rounded-lg hover:bg-gray-600 transition duration-100 ease-in-out"
                    onClick={() => onSelectSection('Profile')}
                >
                    Profile
                </li>
                <li
                    className="p-2 m-1 border-b-2  border-gray-400 rounded-lg hover:bg-gray-600 transition duration-100 ease-in-out"
                    onClick={() => onSelectSection('Settings')}
                >
                    Settings
                </li>
            </ul>
        </div>
    );
};

export default SideNav;
