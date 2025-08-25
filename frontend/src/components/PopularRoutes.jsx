import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Clock } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;

const PopularRoutes = () => {
  const [popularRoutes, setPopularRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiFetch = async () => {
      try {
        const data = await fetch(`${API_URL}/allbus`, {
          method: "GET",
          credentials: "include",
        });
        const final = await data.json();
        setPopularRoutes(final);
      } catch (error) {
        console.error("Error fetching routes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    apiFetch();
  }, []);

  return (
    <section className="py-12 bg-[#eef2ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Popular Routes
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Most traveled destinations with great prices
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                // <div key={index} className="bg-white rounded-lg shadow-md p-6">
                //   <div className="flex justify-between mt-2.5">
                //     <div className="h-6 bg-slate-200 rounded animate-pulse w-1/2 mb-4"></div>
                //     <div className="h-6 bg-slate-200 rounded animate-pulse w-1/4 mb-4"></div>
                //   </div>
                //   <div className="flex justify-between mt-2.5">
                //     <div className="h-8 bg-slate-200 rounded animate-pulse w-20"></div>
                //     <div className="h-8 bg-slate-200 rounded animate-pulse w-24"></div>
                //   </div>
                // </div>

                <Card
                  key={index}
                  className="group animate-pulse transition-all duration-300 border-0 shadow-lg overflow-hidden bg-white"
                >
                  <CardContent className="!p-0">
                    {/* Top gradient section */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 relative overflow-hidden">
                      <div className="absolute top-2 right-2 bg-white/30 rounded-full px-3 py-1 w-12 h-5" />

                      <div className="flex items-center justify-between mb-2">
                        {/* From */}
                        <div className="flex items-center space-x-2">
                          <div className="h-5 w-5 bg-white/40 rounded-full" />
                          <div>
                            <div className="h-4 w-20 bg-white/40 rounded mb-1" />
                            <div className="h-3 w-10 bg-white/30 rounded" />
                          </div>
                        </div>

                        <div className="h-6 w-6 bg-white/40 rounded-full" />

                        {/* To */}
                        <div className="text-right">
                          <div className="h-4 w-20 bg-white/40 rounded mb-1 ml-auto" />
                          <div className="h-3 w-10 bg-white/30 rounded ml-auto" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom content */}
                    <div className="p-6">
                      {/* Price and duration */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="h-5 w-16 bg-gray-200 rounded mb-1" />
                            <div className="h-3 w-14 bg-gray-100 rounded" />
                          </div>
                          <div className="text-center">
                            <div className="h-5 w-20 bg-gray-200 rounded mb-1" />
                            <div className="h-3 w-14 bg-gray-100 rounded" />
                          </div>
                        </div>
                      </div>

                      {/* Frequency */}
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mr-2" />
                        <div className="h-3 w-24 bg-gray-200 rounded" />
                      </div>

                      {/* Button */}
                      <div className="w-full h-10 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-md" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : popularRoutes.slice(0, 6).map((route, index) => (
                // <div
                //     key={route._id}
                //     className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                // >
                //     <div className="p-6">
                //         <div className="flex items-center justify-between mb-4">
                //             <div className="text-lg font-semibold text-gray-700">{route.from}</div>
                //             <ArrowRight className="h-5 w-5 text-gray-400 mx-2" />
                //             <div className="text-lg font-semibold text-gray-700">{route.to}</div>
                //         </div>
                //         <div className="flex justify-between items-center mt-4">
                //             <div className="text-2xl font-bold text-blue-600">₹{route.price}</div>
                //             <Link
                //                 to="/search-results"
                //                 state={{ from: route.from, to: route.to }}
                //                 className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition-colors duration-300"
                //             >
                //                 Book Now
                //             </Link>
                //         </div>
                //     </div>
                // </div>

                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden bg-white"
                >
                  <CardContent className="!p-0">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white relative overflow-hidden">
                      <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold">
                        {"5%"}
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-5 w-5 text-white" />
                          <div>
                            <h3 className="font-bold text-lg">{route.from}</h3>
                            <p className="text-blue-100 text-sm">From</p>
                          </div>
                        </div>
                        <ArrowRight className="h-6 w-6 text-white/80" />
                        <div className="text-right">
                          <h3 className="font-bold text-lg">{route.to}</h3>
                          <p className="text-blue-100 text-sm">To</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">
                              ${route.price}
                            </p>
                            <p className="text-xs text-gray-500">
                              Starting from
                            </p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              <span className="font-medium">
                                {route.duration}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">Duration</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        {route.frequency}
                      </div>

                      <Button
                        asChild
                        className="w-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 group-hover:shadow-lg transition-all"
                      >
                        <Link
                          to="/search-results"
                          state={{ from: route.from, to: route.to }}
                          className="flex items-center justify-center"
                        >
                          View Schedules
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
