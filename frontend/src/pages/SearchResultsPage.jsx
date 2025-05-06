import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Clock, Calendar, ArrowRight, Filter, Star } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;
import { Clock3, BusFront, Users2, CalendarDays, BadgeIndianRupee } from "lucide-react";


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
    const fetchBuses = async () => {
      try {
        setLoading(true);

        // Build the query dynamically
        // const queryParams = [];
        // if (searchParams.from) queryParams.push(`from=${encodeURIComponent(searchParams.from)}`);
        // if (searchParams.to) queryParams.push(`to=${encodeURIComponent(searchParams.to)}`);
        // if (searchParams.date) queryParams.push(`date=${encodeURIComponent(searchParams.date)}`);
        const queryParams = [];
        if (searchParams.from) queryParams.push(`from=${encodeURIComponent(searchParams.from.trim())}`);
        if (searchParams.to) queryParams.push(`to=${encodeURIComponent(searchParams.to.trim())}`);
        if (searchParams.date) queryParams.push(`date=${encodeURIComponent(searchParams.date.trim())}`);

        const queryString = queryParams.length > 0 ? "?" + queryParams.join("&") : "";


        const response = await fetch(
          // `${API_URL}/bus/search-buses?from=${encodeURIComponent(searchParams.from)}&to=${encodeURIComponent(searchParams.to)}&date=${encodeURIComponent(searchParams.date)}`, {

          `${API_URL}/bus/search-buses${queryString}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // optional if you're using cookies
        }
        );
        // console.log(response, 'response here');
        const data = await response.json();
        console.log(data, 'response here');
        console.log(queryString, 'quary here');
        setBuses(data);
      } catch (error) {
        console.error("Failed to fetch buses", error);
        setBuses([]); // Optional fallback
      } finally {
        setLoading(false);
      }
    };

    // if (searchParams.from && searchParams.to && searchParams.date) {
    //   fetchBuses();
    // }
    fetchBuses();
  }, [searchParams.from, searchParams.to, searchParams.date]);


  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    const sortedBuses = [...buses];

    switch (e.target.value) {
      case "price":
        sortedBuses.sort((a, b) => a.price - b.price);
        break;
      case "priceH":
        sortedBuses.sort((a, b) => b.price - a.price);
        break;
      case "departureTime":
        sortedBuses.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
        break;
      case "duration":
        sortedBuses.sort((a, b) => a.duration.localeCompare(b.duration));
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
    navigate(`/seat-selection/${busId}?date=${searchParams.date}`);
  };

  function calculateArrival(startTime = "00:00", duration = "0h 0m") {
    try {
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [durationHour, durationMinute] = duration.match(/\d+/g).map(Number);

      const date = new Date();
      date.setHours(startHour || 0);
      date.setMinutes(startMinute || 0);
      date.setHours(date.getHours() + (durationHour || 0));
      date.setMinutes(date.getMinutes() + (durationMinute || 0));

      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      return `${hours}:${formattedMinutes} ${ampm}`;
    } catch (err) {
      return "N/A";
    }
  }




  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-blue-600 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start flex-col md:flex-row justify-between sm:items-center text-white">
            <div className="mb-4 md:mb-0">
              <h1 className=" text-[30px] sm:text-5xl font-bold">
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
                <h3 className="text-lg font-semibold text-gray-600 mb-3 flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-gray-600" />
                  Filters
                </h3>
                <div className="border-t pt-3">
                  <h4 className="font-medium mb-2 text-gray-600">Amenities</h4>
                  <div className="space-y-2">
                    {["WiFi", "AC", "Charging Ports", "Entertainment", "Snacks"].map((amenity) => (
                      <label key={amenity} className="flex font-semibold items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 font-semibold focus:ring-blue-500 border-gray-300 rounded"
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
                    <label htmlFor="sort" className="mr-2 text-sm text-gray-700 font-semibold">
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
                      <option value="priceH">Price: High to Low</option>
                      <option value="duration">Duration</option>
                    </select>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                buses.length > 0 ? (
                  <div className="space-y-4">
                    {filteredBuses && filteredBuses?.map((bus) => (
                      <div
                        key={bus._id}
                        className="border border-green-200 rounded-xl p-5 shadow-sm bg-white transition hover:shadow-md"
                      >
                        {/* Top Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start gap-3">
                          <div className="flex items-center gap-3">
                            <h2 className="text-lg font-bold text-green-600">{bus.name || "Bus Name"}</h2>
                            {bus.price <= 500 && (
                              <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                                Cheapest
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-xl font-semibold text-gray-800">
                            <BadgeIndianRupee className="w-5 h-5" />
                            {bus.price ?? "N/A"}
                          </div>
                        </div>

                        {/* Time and Route */}
                        <div className="flex md:flex-row justify-between items-center mt-4 text-sm text-gray-700">
                          <div className="text-center md:text-left">
                            <div className="text-base font-medium">
                              {bus.time
                                ? new Date(`1970-01-01T${bus.time}:00`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
                                : "N/A"}
                            </div>
                            <div className="text-xs font-semibold">{bus.from || "From"}</div>
                          </div>

                          <div className="flex items-center gap-1 text-gray-500 text-xs my-2 md:my-0">
                            <Clock3 className="w-4 h-4" />
                            <span>{bus.duration || "0h 0m"}</span>
                          </div>

                          <div className="text-center md:text-right">
                            <div className="text-base font-medium">
                              {calculateArrival(bus.time, bus.duration)}
                            </div>
                            <div className="text-xs font-semibold">{bus.to || "To"}</div>
                          </div>
                        </div>

                        {/* Extra Info */}
                        <div className="grid grid-cols-2 sm:mt-4 sm:grid-cols-4 md:grid-cols-5 text-xs text-gray-600 mt-6 gap-2">
                          <div className="flex items-center gap-1">
                            <Users2 className="w-4 h-4" />
                            {bus.seats ?? 0} Seats
                          </div>
                          <div className="flex items-center gap-1">
                            <BusFront className="w-4 h-4" />
                            {bus.availableSeats ?? 0} Available
                          </div>
                          <div>{bus.seatType || "N/A"}</div>
                          <div>{bus.busNumber || "N/A"}</div>
                          <div className="truncate">{(bus.amenities?.length > 0 ? bus.amenities.slice(0, 2).join(", ") + "..." : "Amenities")}</div>
                        </div>

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
                          <div className="flex gap-2 items-start flex-wrap text-xs text-gray-500">
                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                              <CalendarDays className="w-3.5 h-3.5" />
                              {bus.daysOfOperation.length === 7 ? "Daily" : bus.daysOfOperation?.join(", ") || "Daily"}
                            </span>
                            <span className="bg-gray-100 px-2 py-1 rounded-full">One-way</span>
                            <span className="bg-gray-100 px-2 py-1 rounded-full">Direct</span>
                          </div>
                          <button
                            onClick={() => handleSelectSeats(bus._id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium w-full sm:w-auto"
                          >
                            Select Seats
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>) : (<p>No buses found.</p>)
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
