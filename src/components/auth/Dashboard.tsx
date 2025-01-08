import DefaultLayout from '@/layouts/DefaultLayout';
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    return (
        <DefaultLayout>
            <div className="min-h-screen p-6">
                <h1 className="text-4xl font-bold text-center text-wh mb-8">Dashboard</h1>

                {/* Nawigacja w Dashboardzie */}
                <div className="mb-6 flex gap-4 justify-center">
                    <Link
                        to="/auth/dashboard/yourproducts"
                        className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-400"
                    >
                        Products
                    </Link>
                    <Link to="/auth/dashboard/history" className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-400">
                        History
                    </Link>
                    <Link to="/auth/dashboard/profile" className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-400">
                        Profile
                    </Link>
                    <Link to="/auth/dashboard/settings" className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-400">
                        Settings
                    </Link>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Dashboard;
