import React from 'react';
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import SearchForm from "../components/SearchForm"
import PopularRoutes from "../components/PopularRoutes"
import FeaturedBuses from "../components/FeaturedBuses"

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="relative">
                <div
                    className="h-[500px] bg-cover bg-center relative before:absolute before:w-full before:h-full before:bg-[#0000008a]"
                    style={{ backgroundImage: "url('/bus.jpeg?height=500&width=1200')" }}
                >
                    <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-white px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Travel Comfortably Across the Country</h1>
                        <p className="text-xl md:text-2xl mb-8 text-center max-w-3xl">
                            Book bus tickets online, compare prices, and find the best deals on bus travel
                        </p>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
                    <SearchForm />
                </div>
            </div>

            <PopularRoutes />
            <FeaturedBuses />

            <section className="py-12 bg-purple-400 text-white relative before:absolute before:top-0 before:w-full before:h-full before:bg-no-repeat before:bg-[#0000008a]"
                style={{ backgroundImage: "url('/banner.jpeg')" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4 z-10 relative">Ready to Start Your Journey?</h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto z-10 relative">
                        Join thousands of satisfied travelers who book with BusGo every day
                    </p>
                    <button className="px-8 py-3 relative z-10 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
                        Book Your Trip Now
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default HomePage

