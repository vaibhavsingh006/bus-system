import React from 'react';
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const popularRoutes = [
    { id: 1, from: "New York", to: "Boston", price: 45 },
    { id: 2, from: "Los Angeles", to: "San Francisco", price: 55 },
    { id: 3, from: "Chicago", to: "Detroit", price: 35 },
    { id: 4, from: "Miami", to: "Orlando", price: 30 },
    { id: 5, from: "Seattle", to: "Portland", price: 25 },
    { id: 6, from: "Dallas", to: "Houston", price: 40 },
]

const PopularRoutes = () => {
    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-8">Popular Routes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {popularRoutes.map((route) => (
                        <div
                            key={route.id}
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
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PopularRoutes

