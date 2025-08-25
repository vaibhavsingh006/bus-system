import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchForm from "../components/SearchForm";
import PopularRoutes from "../components/PopularRoutes";
import FeaturedBuses from "../components/FeaturedBuses";
import { Card } from "../components/ui/card";
import {
  Search,
  MapPin,
  Calendar,
  Shield,
  Headphones,
  Zap,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="relative bg-white">
        <div
          className="h-[500px] bg-cover bg-center relative before:absolute before:w-full before:h-full before:bg-[#0000008a] "
          style={{
            backgroundImage: "url('/hero-bus.jpg?height=500&width=1200')",
          }}
        >
          <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Travel Comfortably Across the Country
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-center max-w-3xl">
              Book bus tickets online, compare prices, and find the best deals
              on bus travel
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          <SearchForm />
        </div>
      </div>

      {/* 99 */}
      <section className="py-16 pt-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose BusBooker?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the future of bus travel with our premium features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Easy Booking
              </h3>
              <p className="text-gray-600">
                Book your tickets in seconds with our intuitive interface
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Secure Payment
              </h3>
              <p className="text-gray-600">
                Your payments are protected with bank-level security
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-purple-50 to-violet-50">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Round-the-clock customer support for all your needs
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-orange-50 to-red-50">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Instant Booking
              </h3>
              <p className="text-gray-600">
                Get instant confirmation and digital tickets
              </p>
            </Card>
          </div>
        </div>
      </section>
      {/* 99 */}

      <PopularRoutes />
      <FeaturedBuses />

      <section
        className="py-12 bg-purple-400 text-white relative before:absolute before:top-0 before:w-full before:h-full before:bg-no-repeat before:bg-[#0000008a]"
        style={{ backgroundImage: "url('/banner.jpeg')" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 z-10 relative">
            Ready to Start Your Journey?
          </h2>
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
  );
};

export default HomePage;
