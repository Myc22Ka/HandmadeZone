import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                        <h4 className="text-lg font-semibold mb-2">About Us</h4>
                        <p className="text-sm text-gray-400">We are a platform for buying and selling handicrafts.</p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/about" className="text-gray-400 hover:text-white">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="/services" className="text-gray-400 hover:text-white">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="text-gray-400 hover:text-white">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
                        <p className="text-sm text-gray-400">
                            Email:{' '}
                            <a href="mailto:info@example.com" className="text-gray-400 hover:text-white">
                                info@example.com
                            </a>
                        </p>
                        <p className="text-sm text-gray-400">Phone: +123 456 7890</p>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Your Company. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
