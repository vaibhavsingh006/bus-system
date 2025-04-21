import React from 'react';
import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">BusGo</h3>
                        <p className="text-gray-300">
                            Your trusted partner for comfortable and reliable bus travel across the country.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/search-results" className="text-gray-300 hover:text-white">
                                    Find Buses
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="text-gray-300 hover:text-white">
                                    My Bookings
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="text-gray-300 hover:text-white">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 mr-2" />
                                <span className="text-gray-300">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 mr-2" />
                                <span className="text-gray-300">support@busgo.com</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white">
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <Twitter className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <Instagram className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                    <p className="text-gray-300">&copy; {new Date().getFullYear()} BusGo. All rights reserved.</p>
                    <div className="mt-2">
                        <Link to="#" className="text-gray-300 hover:text-white mx-2">
                            Terms & Conditions
                        </Link>
                        <Link to="#" className="text-gray-300 hover:text-white mx-2">
                            Privacy Policy
                        </Link>
                        <Link to="#" className="text-gray-300 hover:text-white mx-2">
                            FAQ
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

