import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;


const busImages = [
    '/bus1.jpeg',
    '/bus2.jpeg',
    '/bus3.jpg'
]

const FeaturedBuses = () => {
    const [featuredBuses, setFeaturedBuses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        const apiFetch = async () => {
            try {
                const data = await fetch(`${API_URL}/allbus`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const final = await data.json();
                setFeaturedBuses(final);
            } catch (err) {
                console.error('Failed to fetch featured buses:', err);
            } finally {
                setIsLoading(false);
            }
        };
        apiFetch();
    }, []);

    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">Featured Bus Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md animate-pulse">
                                <div className="w-full h-48 bg-slate-200"></div>
                                <div className="p-6">
                                    <div className="h-6 bg-slate-200 rounded w-1/2 mb-4"></div>
                                    <div className="flex items-center mb-4">
                                        <div className="h-5 w-5 bg-slate-200 rounded-full mr-2"></div>
                                        <div className="h-4 bg-slate-200 rounded w-12"></div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                                        <div className="flex gap-2 flex-wrap">
                                            {Array.from({ length: 4 }).map((_, idx) => (
                                                <div key={idx} className="h-5 bg-slate-200 rounded w-16"></div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="h-6 bg-slate-200 rounded w-20"></div>
                                        <div className="h-8 bg-slate-200 rounded w-24"></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        featuredBuses
                            .filter(bus => bus.amenities && bus.amenities.length > 3)
                            .slice(0, 3)
                            .map((bus, index) => (
                                <div
                                    key={bus._id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                >
                                    <img src={bus.image || busImages[index]} alt={bus.name} className="w-full h-48 object-cover" />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2 text-gray-700">{bus.name}</h3>
                                        <div className="flex items-center mb-4">

                                            <span className=" font-semibold text-gray-700">{bus.from} - {bus.to}</span>
                                        </div>
                                        <div className="mb-4">
                                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Amenities:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {bus.amenities.slice(0, 4).map((amenity, index) => (
                                                    <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                        {amenity}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mt-4">
                                            <div className="text-2xl font-bold text-blue-600">From ${bus.price}</div>
                                            <Link
                                                to="/search-results"
                                                state={{ from: bus.from, to: bus.to }}
                                                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors duration-300"
                                            >
                                                view details
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

export default FeaturedBuses;
