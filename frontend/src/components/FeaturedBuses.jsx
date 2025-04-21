import React from 'react';
import { Star } from "lucide-react"

const featuredBuses = [
    {
        id: 1,
        name: "Luxury Express",
        image: "/placeholder.svg?height=200&width=400",
        rating: 4.8,
        amenities: ["WiFi", "AC", "Charging Ports", "Reclining Seats"],
        price: 65,
    },
    {
        id: 2,
        name: "Comfort Liner",
        image: "/placeholder.svg?height=200&width=400",
        rating: 4.5,
        amenities: ["WiFi", "AC", "Snacks", "Entertainment"],
        price: 55,
    },
    {
        id: 3,
        name: "Premium Coach",
        image: "/placeholder.svg?height=200&width=400",
        rating: 4.7,
        amenities: ["WiFi", "AC", "Extra Legroom", "Refreshments"],
        price: 60,
    },
]

const FeaturedBuses = () => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">Featured Bus Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredBuses.map((bus) => (
                        <div
                            key={bus.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <img src={bus.image || "/placeholder.svg"} alt={bus.name} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-gray-700">{bus.name}</h3>
                                <div className="flex items-center mb-4">
                                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                                    <span className="ml-1 text-gray-700">{bus.rating}/5</span>
                                </div>
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Amenities:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {bus.amenities.map((amenity, index) => (
                                            <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="text-2xl font-bold text-blue-600">From ${bus.price}</div>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturedBuses

