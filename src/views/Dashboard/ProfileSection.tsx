import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import avatar from '@/assets/imgs/Basic_Ui_(186).jpg';
import DefaultLayout from '@/layouts/DefaultLayout';

const excludedKeys = ['login', 'token', 'id'];

const UserPanel: React.FC = () => {
    const { user, loading } = useAuth();
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }, []);

    return (
        <DefaultLayout>
            <div
                className={`w-3/4 mx-auto mt-10 p-4 rounded-lg ${
                    theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-700 text-gray-100'
                }`}
            >
                {/*Nagłowek karty użytkownika */}
                <div className="flex items-center mb-6">
                    <img src={avatar} alt="User Avatar" className="w-24 h-24 rounded-full mr-6" />
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold text-gray-200">Edytuj swój profil</h1>
                        <button className="text-blue-400 text-sm mt-2 opacity-100 transition-opacity duration-400 hover:opacity-50">
                            Zobacz, jak inni widzą Twój profil
                        </button>
                    </div>
                </div>
                <div className="bg-gray-600 p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center border-b pb-2 mb-4">
                        <h2 className="text-xl font-semibold text-gray-200">Podstawowe informacje</h2>
                        <button className="text-blue-400  opacity-100 transition-opacity duration-300 text-sm underline hover:opacity-50">
                            Edytuj
                        </button>
                    </div>
                    {/*Wyświetlanie danych użytkownika */}
                    <div className="text-left ml-5">
                        <p className="text-lg text-gray-200 mb-2">
                            {/* <span className="font-semibold">:</span> {user?.name} */}
                        </p>
                        {user &&
                            Object.entries(user)
                                .filter(([key]) => !excludedKeys.includes(key)) // Filter out login and token
                                .map(([key, value]) => (
                                    <p className="text-lg text-gray-200 mb-2" key={key}>
                                        <span className="font-semibold">{key}:</span> {value}
                                    </p>
                                ))}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default UserPanel;
