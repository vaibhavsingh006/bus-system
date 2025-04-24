import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
const API_URL = import.meta.env.VITE_API_URL;

const PopularRoutes = () => {
    const [popularRoutes, setPopularRoutes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const apiFetch = async () => {
            try {
                const data = await fetch(`${API_URL}/allbus`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const final = await data.json();
                setPopularRoutes(final);
            } catch (error) {
                console.error('Error fetching routes:', error);
            } finally {
                setIsLoading(false);
            }
        };
        apiFetch();
    }, []);

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-8">Popular Routes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md p-6"
                            >
                                <div className="flex justify-between mt-2.5">
                                    <div className="h-6 bg-slate-200 rounded animate-pulse w-1/2 mb-4"></div>
                                    <div className="h-6 bg-slate-200 rounded animate-pulse w-1/4 mb-4"></div>
                                </div>
                                <div className="flex justify-between mt-2.5">
                                    <div className="h-8 bg-slate-200 rounded animate-pulse w-20"></div>
                                    <div className="h-8 bg-slate-200 rounded animate-pulse w-24"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        popularRoutes.slice(0, 6).map((route) => (
                            <div
                                key={route._id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-lg font-semibold text-gray-700">{route.from}</div>
                                        <ArrowRight className="h-5 w-5 text-gray-400 mx-2" />
                                        <div className="text-lg font-semibold text-gray-700">{route.to}</div>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="text-2xl font-bold text-blue-600">${route.price}</div>
                                        <Link
                                            to="/search-results"
                                            state={{ from: route.from, to: route.to }}
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default PopularRoutes;
