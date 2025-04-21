import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Clock, Calendar, ArrowRight, Filter, Star } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;

// Mock data for bus search results
// const mockBuses = [
//   {
//     id: 1,
//     name: "Express Deluxe",
//     operator: "National Express",
//     departureTime: "08:00 AM",
//     arrivalTime: "11:30 AM",
//     duration: "3h 30m",
//     price: 45,
//     availableSeats: 23,
//     rating: 4.5,
//     amenities: ["WiFi", "AC", "Charging Ports"],
//   },

// ]

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("departureTime");
  const [filterAmenities, setFilterAmenities] = useState([]);

  // Get search params from location state or URL params
  const searchParams = location.state || {
    from: new URLSearchParams(location.search).get("from") || "",
    to: new URLSearchParams(location.search).get("to") || "",
    date: new URLSearchParams(location.search).get("date") || "",
  };

  useEffect(() => {
    // Simulate API call to fetch buses
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_URL}/bus/search-buses?from=${encodeURIComponent(searchParams.from)}&to=${encodeURIComponent(searchParams.to)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // optional if you're using cookies
        }
        );
        console.log(response, 'response here');
        const data = await response.json();
        setBuses(data);
      } catch (error) {
        console.error("Failed to fetch buses", error);
        setBuses([]); // Optional fallback
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, [searchParams.from, searchParams.to, searchParams.date]);


  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    const sortedBuses = [...buses];

    switch (e.target.value) {
      case "price":
        sortedBuses.sort((a, b) => a.price - b.price);
        break;
      case "departureTime":
        sortedBuses.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
        break;
      case "duration":
        sortedBuses.sort((a, b) => a.duration.localeCompare(b.duration));
        break;
      case "rating":
        sortedBuses.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setBuses(sortedBuses);
  };

  const toggleAmenityFilter = (amenity) => {
    setFilterAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const filteredBuses =
    filterAmenities.length > 0
      ? buses.filter((bus) => filterAmenities.every((amenity) => bus.amenities.includes(amenity)))
      : buses;

  const handleSelectSeats = (busId) => {
    navigate(`/seat-selection/${busId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-blue-600 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-white">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold">
                {searchParams.from} to {searchParams.to}
              </h1>
              <div className="flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{searchParams.date || "Select date"}</span>
              </div>
            </div>
            <button
              className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50"
              onClick={() => navigate("/")}
            >
              Modify Search
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters sidebar */}
            <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-sm">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h3>
                <div className="border-t pt-3">
                  <h4 className="font-medium mb-2">Amenities</h4>
                  <div className="space-y-2">
                    {["WiFi", "AC", "Charging Ports", "Entertainment", "Snacks"].map((amenity) => (
                      <label key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={filterAmenities.includes(amenity)}
                          onChange={() => toggleAmenityFilter(amenity)}
                        />
                        <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <p className="text-gray-700 mb-2 sm:mb-0">
                    <span className="font-semibold">{filteredBuses.length}</span> buses found
                  </p>
                  <div className="flex items-center">
                    <label htmlFor="sort" className="mr-2 text-sm text-gray-700">
                      Sort by:
                    </label>
                    <select
                      id="sort"
                      value={sortBy}
                      onChange={handleSortChange}
                      className="border-gray-300 text-gray-700 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option value="departureTime">Departure Time</option>
                      <option value="price">Price: Low to High</option>
                      <option value="duration">Duration</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBuses && filteredBuses.map((bus) => (
                    <div key={bus._id} className="bg-white rounded-lg shadow-sm p-4">
                      <h3 className="text-lg font-bold text-gray-700">{bus.name}</h3>
                      <p className="text-gray-700">Date: {new Date(bus.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}</p>
                      <button onClick={() => handleSelectSeats(bus._id)} className="bg-blue-600 text-white p-2 rounded-md">
                        Select Seats
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchResultsPage;

// {
//   id: 2,
//   name: "Luxury Liner",
//   operator: "Premium Coaches",
//   departureTime: "09:15 AM",
//   arrivalTime: "12:45 PM",
//   duration: "3h 30m",
//   price: 55,
//   availableSeats: 15,
//   rating: 4.8,
//   amenities: ["WiFi", "AC", "Snacks", "Entertainment"],
// },
// {
//   id: 3,
//   name: "Budget Express",
//   operator: "City Link",
//   departureTime: "10:30 AM",
//   arrivalTime: "02:00 PM",
//   duration: "3h 30m",
//   price: 35,
//   availableSeats: 8,
//   rating: 4.2,
//   amenities: ["AC"],
// },
// {
//   id: 4,
//   name: "Night Rider",
//   operator: "Moonlight Travel",
//   departureTime: "11:00 PM",
//   arrivalTime: "06:00 AM",
//   duration: "7h 00m",
//   price: 65,
//   availableSeats: 20,
//   rating: 4.6,
//   amenities: ["WiFi", "AC", "Reclining Seats", "Blankets"],
// },
// {
//   id: 5,
//   name: "City Hopper",
//   operator: "Urban Transit",
//   departureTime: "02:00 PM",
//   arrivalTime: "05:30 PM",
//   duration: "3h 30m",
//   price: 40,
//   availableSeats: 12,
//   rating: 4.3,
//   amenities: ["WiFi", "AC"],
// },


