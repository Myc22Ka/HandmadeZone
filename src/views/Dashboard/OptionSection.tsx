import React, { useState, useEffect } from 'react';

const sections = [
    { title: 'Zmień hasło', content: null },
    { title: 'Zmień e-mail', content: 'Zaktualizuj swój adres e-mail w tym miejscu.' },
    { title: 'Logo i baner', content: 'Dodaj lub edytuj logo i baner swojego konta.' },
    { title: 'Dane do faktury', content: 'Wprowadź dane potrzebne do generowania faktur.' },
    { title: 'Zarządzanie kontem', content: 'Opcje dotyczące zamykania lub usuwania konta.' },
];

const OptionSection: React.FC = () => {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // Kontrolowanie widoczności okna dialogowego

    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }, []);

    const toggleSection = (title: string) => {
        setExpanded(prev => (prev === title ? null : title));
    };

    const openPasswordModal = () => setIsPasswordModalOpen(true);
    const closePasswordModal = () => setIsPasswordModalOpen(false);

    return (
        <div
            className={`w-3/4 mx-auto mt-10 p-4 rounded-lg  ${
                theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-700 text-gray-100'
            }`}
        >
            {sections.map(section => (
                <div
                    key={section.title}
                    className={`border-b py-4 cursor-pointer  ${
                        theme === 'light' ? 'border-gray-300' : 'border-gray-600'
                    }`}
                    onClick={() => toggleSection(section.title)}
                >
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-medium">{section.title}</h2>
                        <span>{expanded === section.title ? '▲' : '▼'}</span>
                    </div>
                    {expanded === section.title && (
                        <div className="mt-4">
                            {section.title === 'Zmień hasło' ? (
                                <button
                                    onClick={openPasswordModal}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                >
                                    Otwórz okno zmiany hasła
                                </button>
                            ) : (
                                <p>{section.content || 'Brak szczegółowych informacji.'}</p>
                            )}
                        </div>
                    )}
                </div>
            ))}

            {/* Okno dialogowe do zmiany hasła */}
            {isPasswordModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                        className={`p-6 rounded-lg shadow-lg w-1/3 ${
                            theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-gray-100'
                        }`}
                    >
                        <h2 className="text-lg font-medium mb-4">Zmień swoje hasło</h2>
                        <form>
                            <label className="block mb-2">
                                Nowe hasło:
                                <input
                                    type="password"
                                    className="w-full mt-1 p-2 border rounded bg-gray-100 focus:outline-none focus:ring"
                                />
                            </label>
                            <label className="block mb-4">
                                Potwierdź hasło:
                                <input
                                    type="password"
                                    className="w-full mt-1 p-2 border rounded bg-gray-100 focus:outline-none focus:ring"
                                />
                            </label>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closePasswordModal}
                                    className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Anuluj
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Zmień hasło
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OptionSection;
