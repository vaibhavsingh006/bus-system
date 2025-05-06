// import React from 'react';
// import { useState } from "react"
// import { Link } from "react-router-dom"
// import { Menu, X } from "lucide-react"

// const Navbar = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false)

//     return (
//         <nav className="bg-white shadow-md">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex justify-between h-16">
//                     <div className="flex items-center">
//                         <Link to="/" className="flex-shrink-0 flex items-center">
//                             <span className="text-xl font-bold text-blue-600">BusGo</span>
//                         </Link>
//                     </div>

//                     <div className="hidden md:flex items-center space-x-4">
//                         <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600">
//                             Home
//                         </Link>
//                         <Link
//                             to="/search-results"
//                             className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600"
//                         >
//                             Buses
//                         </Link>
//                         <Link
//                             to="/dashboard"
//                             className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600"
//                         >
//                             My Bookings
//                         </Link>
//                         <Link
//                             to="/login"
//                             className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
//                         >
//                             Login
//                         </Link>
//                     </div>

//                     <div className="md:hidden flex items-center">
//                         <button
//                             onClick={() => setIsMenuOpen(!isMenuOpen)}
//                             className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
//                         >
//                             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {isMenuOpen && (
//                 <div className="md:hidden">
//                     <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//                         <Link
//                             to="/"
//                             className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
//                             onClick={() => setIsMenuOpen(false)}
//                         >
//                             Home
//                         </Link>
//                         <Link
//                             to="/search-results"
//                             className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
//                             onClick={() => setIsMenuOpen(false)}
//                         >
//                             Buses
//                         </Link>
//                         <Link
//                             to="/dashboard"
//                             className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
//                             onClick={() => setIsMenuOpen(false)}
//                         >
//                             My Bookings
//                         </Link>
//                         <Link
//                             to="/login"
//                             className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
//                             onClick={() => setIsMenuOpen(false)}
//                         >
//                             Login
//                         </Link>
//                     </div>
//                 </div>
//             )}
//         </nav>
//     )
// }

// export default Navbar



import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL;

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/user`, {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
        })
            .then((response) => {
                if (response.status === 401 || response.status === 403) {
                    // Redirect to login or unauthorized page if not allowed
                    setIsLoggedIn(false); // Redirect to login page
                } else {
                    setIsLoggedIn(true);
                }
            })
            .catch((error) => {
                console.error('Error checking authorization:', error);
            });

    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch(`${API_URL}/logout`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                console.log(response);

                alert('Logged out successfully');
                // Redirect using navigate
                navigate('/');
                setIsLoggedIn(false);
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const commonLinks = (
        <>
            <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600"
            >
                Home
            </Link>
            <Link
                to="/search-results"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600"
            >
                Buses
            </Link>
        </>
    );

    const authLinks = isLoggedIn ? (
        <>
            <Link
                to="/dashboard"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600"
            >
                My Bookings
            </Link>
            <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600"
            >
                Logout
            </button>
        </>
    ) : (
        <Link
            to="/login"
            className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
        >
            Login
        </Link>
    );

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold text-blue-600">BusGo</Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {commonLinks}
                        {authLinks}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center !p-[6px_15px] justify-center font-semibold hover:text-blue-400 outline-0 border-0"
                        >
                            {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden px-2 pt-2 pb-3 flex flex-col space-y-1 sm:px-3">
                    {commonLinks}
                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                My Bookings
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMenuOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-500 text-white hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
