import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;
import { Card, CardContent } from "./ui/card";
import { Wifi, Coffee, Zap, Car, AirVent, PlugZap, Film } from "lucide-react";

const busImages = ["/bus1.jpeg", "/bus2.jpeg", "/bus3.jpg"];

const FeaturedBuses = () => {
  const [featuredBuses, setFeaturedBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiFetch = async () => {
      try {
        const data = await fetch(`${API_URL}/allbus`, {
          method: "GET",
          credentials: "include",
        });
        const final = await data.json();
        setFeaturedBuses(final);
      } catch (err) {
        console.error("Failed to fetch featured buses:", err);
      } finally {
        setIsLoading(false);
      }
    };
    apiFetch();
  }, []);

  const getFeatureIcon = (feature) => {
    switch (feature.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-3 w-3" />;
      case "power outlets":
      case "charging ports":
        return <PlugZap className="h-3 w-3" />;
      case "snacks":
      case "refreshments":
        return <Coffee className="h-3 w-3" />;
      case "entertainment":
        return <Film className="h-3 w-3" />;
      default:
        return <AirVent className="h-3 w-3" />;
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Featured Bus Services
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Travel in comfort with our partner operators
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                // <div
                //   key={index}
                //   className="bg-white rounded-lg shadow-md animate-pulse"
                // >
                //   <div className="w-full h-48 bg-slate-200"></div>
                //   <div className="p-6">
                //     <div className="h-6 bg-slate-200 rounded w-1/2 mb-4"></div>
                //     <div className="flex items-center mb-4">
                //       <div className="h-5 w-5 bg-slate-200 rounded-full mr-2"></div>
                //       <div className="h-4 bg-slate-200 rounded w-12"></div>
                //     </div>
                //     <div className="mb-4">
                //       <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                //       <div className="flex gap-2 flex-wrap">
                //         {Array.from({ length: 4 }).map((_, idx) => (
                //           <div
                //             key={idx}
                //             className="h-5 bg-slate-200 rounded w-16"
                //           ></div>
                //         ))}
                //       </div>
                //     </div>
                //     <div className="flex justify-between items-center mt-4">
                //       <div className="h-6 bg-slate-200 rounded w-20"></div>
                //       <div className="h-8 bg-slate-200 rounded w-24"></div>
                //     </div>
                //   </div>
                // </div>
                <Card
                  key={index}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white animate-pulse"
                >
                  {/* Image Section */}
                  <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
                    <div className="absolute top-4 left-4 bg-white/80 rounded-full px-3 py-1 h-6 w-24" />
                    <div className="absolute top-4 right-4 bg-blue-400 rounded-full px-3 py-1 h-6 w-16" />
                  </div>

                  <CardContent className="p-6 pt-6">
                    {/* Bus Name & Operator */}
                    <div className="mb-4">
                      <div className="h-5 w-40 bg-gray-300 rounded mb-2" />
                      <div className="h-4 w-28 bg-gray-200 rounded" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4 space-x-2">
                      <div className="h-4 w-4 bg-yellow-300 rounded-full" />
                      <div className="h-4 w-8 bg-gray-300 rounded" />
                      <div className="h-3 w-20 bg-gray-200 rounded ml-2" />
                    </div>

                    {/* Amenities */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[...Array(4)].map((__, i) => (
                        <div
                          key={i}
                          className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2"
                        >
                          <div className="h-4 w-4 bg-blue-400 rounded" />
                          <div className="h-3 w-20 bg-gray-300 rounded" />
                        </div>
                      ))}
                    </div>

                    {/* Price Section */}
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-24 bg-gray-200 rounded" />
                      <div className="text-right">
                        <div className="h-5 w-16 bg-blue-400 rounded mb-1" />
                        <div className="h-3 w-14 bg-gray-300 rounded" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            : featuredBuses
                .filter((bus) => bus.amenities && bus.amenities.length > 3)
                .slice(0, 3)
                .map((bus, index) => (
                  <Card
                    key={index}
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={bus.image || busImages[index]}
                        alt={bus.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 pt-[2px] py-1">
                        <span className="text-xs font-semibold text-gray-700">
                          {bus.amenities[0] || "Normal Bus"}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-full px-3 py-1">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs font-semibold">{3.6}</span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6 pt-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {bus.name}
                        </h3>
                        <p className="text-sm text-gray-600">{bus.operator}</p>
                      </div>

                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-semibold text-gray-900">
                            {3.6}
                          </span>
                        </div>
                        <span className="text-gray-500 text-sm ml-2">
                          (100 reviews)
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {bus.amenities &&
                          bus.amenities.map((feature, i) => (
                            <div
                              key={i}
                              className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2"
                            >
                              <div className="text-blue-600">
                                {getFeatureIcon(feature)}
                              </div>
                              <span className="text-[14px] font-medium text-gray-700">
                                {feature}
                              </span>
                            </div>
                          ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          Starting from
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-blue-600">
                            ₹899
                          </span>
                          <p className="text-xs text-gray-500">per seat</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBuses;

// old one box ui
//   <div
//     key={bus._id}
//     className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
//   >
//     <img
//       src={bus.image || busImages[index]}
//       alt={bus.name}
//       className="w-full h-48 object-cover"
//     />
//     <div className="p-6">
//       <h3 className="text-xl font-bold mb-2 text-gray-700">
//         {bus.name}
//       </h3>
//       <div className="flex items-center mb-4">
//         <span className=" font-semibold text-gray-700">
//           {bus.from} - {bus.to}
//         </span>
//       </div>
//       <div className="mb-4">
//         <h4 className="text-sm font-semibold text-gray-700 mb-2">
//           Amenities:
//         </h4>
//         <div className="flex flex-wrap gap-2">
//           {bus.amenities.slice(0, 4).map((amenity, index) => (
//             <span
//               key={index}
//               className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
//             >
//               {amenity}
//             </span>
//           ))}
//         </div>
//       </div>
//       <div className="flex justify-between items-center mt-4">
//         <div className="text-2xl font-bold text-blue-600">
//           From ₹{bus.price}
//         </div>
//         <Link
//           to="/search-results"
//           state={{ from: bus.from, to: bus.to }}
//           className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors duration-300"
//         >
//           view details
//         </Link>
//       </div>
//     </div>
//   </div>
