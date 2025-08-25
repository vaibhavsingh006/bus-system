import React from "react";

import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowRight } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;

// ai
const generateSeats = (totalSeats, bookedSeats) => {
  // Most buses have 2 seats on left, 3 seats on right
  const leftSeatsPerRow = 2;
  const rightSeatsPerRow = 3;
  const seatsPerRow = leftSeatsPerRow + rightSeatsPerRow;
  const rows = Math.ceil(totalSeats / seatsPerRow);

  const seats = [];
  let seatNumber = 1;

  // Generate rows
  for (let row = 1; row <= rows; row++) {
    const rowSeats = {
      left: [],
      right: [],
    };

    // Left side seats (usually 2)
    for (let col = 1; col <= leftSeatsPerRow; col++) {
      if (seatNumber <= totalSeats) {
        rowSeats.left.push({
          id: seatNumber,
          row,
          col,
          status: bookedSeats.includes(seatNumber) ? "booked" : "available",
        });
        seatNumber++;
      }
    }

    // Right side seats (usually 3)
    for (let col = 1; col <= rightSeatsPerRow; col++) {
      if (seatNumber <= totalSeats) {
        rowSeats.right.push({
          id: seatNumber,
          row,
          col: col + leftSeatsPerRow,
          status: bookedSeats.includes(seatNumber) ? "booked" : "available",
        });
        seatNumber++;
      }
    }

    seats.push(rowSeats);
  }

  // Special case for last row (sometimes has 5 seats across with no aisle)
  if (seatNumber <= totalSeats) {
    const lastRowSeats = {
      full: [],
    };

    for (let i = 1; i <= 5 && seatNumber <= totalSeats; i++) {
      lastRowSeats.full.push({
        id: seatNumber,
        row: rows + 1,
        col: i,
        status: bookedSeats.includes(seatNumber) ? "booked" : "available",
      });
      seatNumber++;
    }

    if (lastRowSeats.full.length > 0) {
      seats.push(lastRowSeats);
    }
  }

  return seats;
};
// ai

const SeatSelectionPage = () => {
  const { busId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const date = new URLSearchParams(location.search).get("date");
  const [busDetails, setBusDetails] = useState([]);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  // ai
  console.log(date);
  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        console.log(busId);

        const response = await fetch(`${API_URL}/bus/${busId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // optional if you're using cookies
        }); // Adjust API path if needed
        const data = await response.json();
        setBusDetails(data);

        setSeats(generateSeats(data.seats, data.bookedSeats));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch bus details:", error);
      }
    };

    fetchBusDetails();
  }, [busId]);
  // ai

  const handleSeatClick = (seatId, status) => {
    if (status === "booked") return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const getSeatStatus = (seatId) => {
    if (busDetails.bookedSeats.includes(seatId)) return "booked";
    if (selectedSeats.includes(seatId)) return "selected";
    return "available";
  };

  const getTotalPrice = () => {
    return selectedSeats.length * busDetails.price;
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat to continue.");
      return;
    }

    navigate("/booking-summary", {
      state: {
        busDetails,
        selectedSeats,
        totalPrice: getTotalPrice(),
        travelDate: date,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-blue-600 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-white">
            <h1 className="text-[30px] sm:text-3xl font-bold">
              Select Your Seats
            </h1>
            {/* <p className="mt-1">{busDetails.name} - {busDetails.operator}</p> */}
          </div>
        </div>
      </div>

      <div className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-700">
                        {busDetails.from} to {busDetails.to}
                      </h2>
                      <p className="text-gray-600">{busDetails.date}</p>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-700">
                          {busDetails.departureTime}
                        </span>
                        <ArrowRight className="mx-2 text-gray-400" />
                        <span className="font-semibold text-gray-700">
                          {busDetails.arrivalTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-full max-w-md bg-gray-100 p-6 rounded-lg">
                      {/* Bus front with driver area */}
                      <div className="relative mb-8">
                        <div className="w-full h-16 bg-gray-300 rounded-t-3xl flex items-center justify-center">
                          <div className="absolute left-4 top-4 w-12 h-8  rounded-md  bg-gray-400 flex items-center justify-center text-xs text-white font-medium">
                            Door
                          </div>
                          <div className="text-center font-semibold text-gray-700">
                            FRONT
                          </div>
                          <div className="absolute right-4 top-4 w-12 h-8 bg-blue-400 rounded-md flex items-center justify-center text-xs text-white font-medium">
                            Driver
                          </div>
                        </div>
                      </div>

                      {/* Seat legend */}
                      <div className="flex justify-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-200 rounded-md"></div>
                          <span className="text-sm text-gray-600">
                            Available
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-green-500 rounded-md"></div>
                          <span className="text-sm text-gray-600">
                            Selected
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-red-500 rounded-md"></div>
                          <span className="text-sm text-gray-600">Booked</span>
                        </div>
                      </div>

                      {/* m */}

                      {/* m */}

                      {/* Bus seats */}
                      <div className="space-y-3">
                        {seats.map((row, rowIndex) => (
                          <div
                            key={rowIndex}
                            className="flex justify-between mb-6"
                          >
                            {row.left && (
                              <div className="flex gap-6">
                                {row.left.map((seat) => (
                                  // <button
                                  //   key={seat.id}
                                  //   className={`w-[30px] h-[31px] text-[#a8b5c0] rounded-t-md flex items-center justify-center text-sm font-medium ${
                                  //     getSeatStatus(seat.id) === "available"
                                  //       ? "!bg-gray-200 hover:!bg-gray-300 before:bg-gray-200 after:bg-gray-200 before:hover:bg-gray-300 after:hover:bg-gray-300"
                                  //       : getSeatStatus(seat.id) === "selected"
                                  //       ? "!bg-green-500 text-white before:!bg-green-500 after:!bg-green-500"
                                  //       : "!bg-red-500 text-white cursor-not-allowed before:bg-red-500 after:bg-red-500 before:cursor-not-allowed after:cursor-not-allowed"
                                  //   }
                                  //       hover:before:bg-gray-300 hover:after:bg-gray-300 hover:
                                  //        relative before:content-[''] before:absolute before:w-1 before:h-5 before:rounded-[1px] before:bottom-[-6px]  before:left-[-6px] after:content-[''] after:absolute after:bottom-[-6px] after:rounded-[1px] after:w-1  after:h-5 after:right-[-6px]`}
                                  //   onClick={() =>
                                  //     handleSeatClick(
                                  //       seat.id,
                                  //       getSeatStatus(seat.id)
                                  //     )
                                  //   }
                                  //   disabled={
                                  //     getSeatStatus(seat.id) === "booked"
                                  //   }
                                  // >
                                  //   <span
                                  //     className={` ${
                                  //       getSeatStatus(seat.id) === "available"
                                  //         ? "!bg-gray-200 hover:!bg-gray-300 before:bg-gray-200 hover:before:bg-gray-300"
                                  //         : getSeatStatus(seat.id) ===
                                  //           "selected"
                                  //         ? "!bg-green-500 text-white before:bg-green-500 "
                                  //         : "!bg-red-500 text-white cursor-not-allowed before:bg-red-500 before:cursor-not-allowed"
                                  //     }  absolute before:content-[''] rounded-[1px] before:absolute before:w-[42px] before:h-2 before:left-[-6px] before:bottom-[-10px] before:rounded-[1px] bottom-[-6px] w-full h-1 bg-purple-400`}
                                  //   />
                                  //   {seat.id}
                                  // </button>
                                  <button
                                    key={seat.id}
                                    className={`group relative w-[30px] h-[31px] rounded-t-md flex items-center justify-center text-sm font-medium
    ${
      getSeatStatus(seat.id) === "available"
        ? "bg-gray-200 text-[#a8b5c0] cursor-pointer hover:bg-gray-300"
        : getSeatStatus(seat.id) === "selected"
        ? "bg-green-500 text-white cursor-pointer"
        : "bg-red-500 text-white cursor-not-allowed"
    }
  `}
                                    onClick={() =>
                                      handleSeatClick(
                                        seat.id,
                                        getSeatStatus(seat.id)
                                      )
                                    }
                                    disabled={
                                      getSeatStatus(seat.id) === "booked"
                                    }
                                  >
                                    {/* Bottom connector */}
                                    <span
                                      className={`absolute bottom-[-10px] left-[-6px] w-[42px] h-2 rounded-[1px]
      ${
        getSeatStatus(seat.id) === "available"
          ? "bg-gray-200 group-hover:bg-gray-300"
          : getSeatStatus(seat.id) === "selected"
          ? "bg-green-500"
          : "bg-red-500"
      }
    `}
                                    />

                                    {/* Left connector */}
                                    <span
                                      className={`absolute bottom-[-6px] left-[-6px] w-1 h-5 rounded-[1px]
      ${
        getSeatStatus(seat.id) === "available"
          ? "bg-gray-200 group-hover:bg-gray-300"
          : getSeatStatus(seat.id) === "selected"
          ? "bg-green-500"
          : "bg-red-500"
      }
    `}
                                    />

                                    {/* Right connector */}
                                    <span
                                      className={`absolute bottom-[-6px] right-[-6px] w-1 h-5 rounded-[1px]
      ${
        getSeatStatus(seat.id) === "available"
          ? "bg-gray-200 group-hover:bg-gray-300"
          : getSeatStatus(seat.id) === "selected"
          ? "bg-green-500"
          : "bg-red-500"
      }
    `}
                                    />

                                    {seat.id}
                                  </button>
                                ))}
                              </div>
                            )}

                            {row.left && row.right && (
                              <div className="w-8 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                              </div>
                            )}

                            {row.right && (
                              <div className="flex gap-6">
                                {row.right.map((seat) => (
                                  // <button
                                  //   key={seat.id}
                                  //   className={`w-[30px] h-[31px] text-[#a8b5c0] rounded-t-md flex items-center justify-center text-sm font-medium ${
                                  //     getSeatStatus(seat.id) === "available"
                                  //       ? "!bg-gray-200 hover:!bg-gray-300 before:bg-gray-200 after:bg-gray-200 before:hover:bg-gray-300 after:hover:bg-gray-300"
                                  //       : getSeatStatus(seat.id) === "selected"
                                  //       ? "!bg-green-500 text-white before:!bg-green-500 after:!bg-green-500"
                                  //       : "!bg-red-500 text-white cursor-not-allowed before:bg-red-500 after:bg-red-500 before:cursor-not-allowed after:cursor-not-allowed"
                                  //   }
                                  //       hover:before:bg-gray-300 hover:after:bg-gray-300 hover:
                                  //        relative before:content-[''] before:absolute before:w-1 before:h-5 before:rounded-[1px] before:bottom-[-6px]  before:left-[-6px] after:content-[''] after:absolute after:bottom-[-6px] after:rounded-[1px] after:w-1  after:h-5 after:right-[-6px]`}
                                  //   onClick={() =>
                                  //     handleSeatClick(
                                  //       seat.id,
                                  //       getSeatStatus(seat.id)
                                  //     )
                                  //   }
                                  //   disabled={
                                  //     getSeatStatus(seat.id) === "booked"
                                  //   }
                                  // >
                                  //   <span
                                  //     className={` ${
                                  //       getSeatStatus(seat.id) === "available"
                                  //         ? "!bg-gray-200 hover:!bg-gray-300 before:bg-gray-200 hover:before:bg-gray-300"
                                  //         : getSeatStatus(seat.id) ===
                                  //           "selected"
                                  //         ? "!bg-green-500 text-white before:bg-green-500 "
                                  //         : "!bg-red-500 text-white cursor-not-allowed before:bg-red-500 before:cursor-not-allowed"
                                  //     }  absolute before:content-[''] rounded-[1px] before:absolute before:w-[42px] before:h-2 before:left-[-6px] before:bottom-[-10px] before:rounded-[1px] bottom-[-6px] w-full h-1 bg-purple-400`}
                                  //   />
                                  //   {seat.id}
                                  // </button>
                                  <button
                                    key={seat.id}
                                    className={`
    group relative w-[30px] h-[31px] rounded-t-md flex items-center justify-center text-sm font-medium
    ${
      getSeatStatus(seat.id) === "available"
        ? "bg-gray-200 text-[#a8b5c0] cursor-pointer hover:bg-gray-300"
        : getSeatStatus(seat.id) === "selected"
        ? "bg-green-500 text-white cursor-pointer"
        : "bg-red-500 text-white cursor-not-allowed"
    }
  `}
                                    onClick={() =>
                                      handleSeatClick(
                                        seat.id,
                                        getSeatStatus(seat.id)
                                      )
                                    }
                                    disabled={
                                      getSeatStatus(seat.id) === "booked"
                                    }
                                  >
                                    {/* bottom line */}
                                    <span
                                      className={`
      absolute bottom-[-10px] left-[-6px] w-[42px] h-2 rounded-[1px]
      ${
        getSeatStatus(seat.id) === "available"
          ? "bg-gray-200 group-hover:bg-gray-300"
          : getSeatStatus(seat.id) === "selected"
          ? "bg-green-500"
          : "bg-red-500"
      }
    `}
                                    />

                                    {/* left connector */}
                                    <span
                                      className={`
      absolute bottom-[-6px] left-[-6px] w-1 h-5 rounded-[1px]
      ${
        getSeatStatus(seat.id) === "available"
          ? "bg-gray-200 group-hover:bg-gray-300"
          : getSeatStatus(seat.id) === "selected"
          ? "bg-green-500"
          : "bg-red-500"
      }
    `}
                                    />

                                    {/* right connector */}
                                    <span
                                      className={`
      absolute bottom-[-6px] right-[-6px] w-1 h-5 rounded-[1px]
      ${
        getSeatStatus(seat.id) === "available"
          ? "bg-gray-200 group-hover:bg-gray-300"
          : getSeatStatus(seat.id) === "selected"
          ? "bg-green-500"
          : "bg-red-500"
      }
    `}
                                    />

                                    {seat.id}
                                  </button>
                                ))}
                              </div>
                            )}

                            {row.full && (
                              <div className="flex w-full justify-center gap-2">
                                {row.full.map((seat) => (
                                  <button
                                    key={seat.id}
                                    className={`w-10 h-10 text-[#a8b5c0] rounded-t-md flex items-center justify-center text-sm font-medium ${
                                      getSeatStatus(seat.id) === "available"
                                        ? "!bg-gray-200 hover:!bg-gray-300"
                                        : getSeatStatus(seat.id) === "selected"
                                        ? "!bg-green-500 text-white"
                                        : "!bg-red-500 !text-purple-500 cursor-not-allowed"
                                    }`}
                                    onClick={() =>
                                      handleSeatClick(
                                        seat.id,
                                        getSeatStatus(seat.id)
                                      )
                                    }
                                    disabled={
                                      getSeatStatus(seat.id) === "booked"
                                    }
                                  >
                                    {seat.id}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="w-full h-4 bg-gray-300 rounded-b-lg mt-6"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-700">
                    Booking Summary
                  </h3>

                  <div className="space-y-3 text-gray-700 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Bus Name</span>
                      <span>{busDetails.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Bus Number</span>
                      <span>{busDetails.busNumber || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Route</span>
                      <span>
                        {busDetails.from} → {busDetails.to}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Time</span>
                      <span>
                        {busDetails.time
                          ? new Date(
                              `1970-01-01T${busDetails.time}:00`
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Journey Date</span>
                      <span>{new Date(date).toDateString() || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Seat Type</span>
                      <span>{busDetails.seatType || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Selected Seats</span>
                      <span>
                        {selectedSeats.length > 0
                          ? selectedSeats.join(", ")
                          : "None"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Fare/Seat</span>
                      <span>₹{busDetails.price || 0}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between text-base font-semibold">
                      <span>Total Price</span>
                      <span>₹{getTotalPrice()}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedToPayment}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SeatSelectionPage;

// 0000000000000000000000

// import React from "react";
// import { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { ArrowRight } from "lucide-react";
// const API_URL = import.meta.env.VITE_API_URL;

// const generateSeats = (totalSeats, bookedSeats) => {
//   // Implement seat generation logic
// };

// const SeatSelectionPage = () => {
//   const { busId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const date = new URLSearchParams(location.search).get("date");
//   const [busDetails, setBusDetails] = useState([]);
//   const [seats, setSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBusDetails = async () => {
//       try {
//         const response = await fetch(`${API_URL}/bus/${busId}`, {
//           method: "GET",
//           headers: {"Content-Type": "application/json"},
//           credentials: "include",
//         });
//         const data = await response.json();
//         setBusDetails(data);
//         setSeats(generateSeats(data.seats, data.bookedSeats));
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch bus details:", error);
//       }
//     };

//     fetchBusDetails();
//   }, [busId]);

//   const handleSeatClick = (seatId, status) => {
//     if (status === "booked") return;
//     setSelectedSeats((prev) =>
//       prev.includes(seatId)
//         ? prev.filter((id) => id !== seatId)
//         : [...prev, seatId]
//     );
//   };

//   const getSeatStatus = (seatId) => {
//     if (busDetails.bookedSeats.includes(seatId)) return "booked";
//     if (selectedSeats.includes(seatId)) return "selected";
//     return "available";
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <div className="bg-blue-600 py-6">
//         <div className="max-w-7xl mx-auto px-4 text-white">
//           <h1 className="text-[30px] sm:text-5xl font-bold">Select Your Seats</h1>
//         </div>
//       </div>
//       <div className="flex-grow bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//             </div>
//           ) : (
//             <div className="flex flex-col lg:flex-row gap-8">
//               {/* Seat selection */}
//               <div className="flex flex-col justify-center items-center">
//                 {seats.map((row, rowIndex) => (
//                   <div key={rowIndex} className="flex">
//                     {row.left && row.left.map((seat) => (
//                       <div key={seat.id} className="flex flex-col items-center">
//                         <button
//                           className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium ${
//                             getSeatStatus(seat.id) === "available" ? "!bg-gray-200 hover:!bg-gray-300" :
//                             getSeatStatus(seat.id) === "selected" ? "!bg-green-500 text-white" :
//                             "!bg-red-500 text-white cursor-not-allowed"
//                           }`}
//                           onClick={() => handleSeatClick(seat.id, getSeatStatus(seat.id))}
//                           disabled={getSeatStatus(seat.id) === "booked"}
//                         >
//                           {seat.id}
//                         </button>
//                         <span className="text-xs">₹{busDetails.price}</span>
//                       </div>
//                     ))}
//                     {/* Center aisle */}
//                     <div className="w-8 flex items-center justify-center">
//                       <div className="w-2 h-2 rounded-full bg-gray-300"></div>
//                     </div>
//                     {row.right && row.right.map((seat) => (
//                       <div key={seat.id} className="flex flex-col items-center">
//                         <button
//                           className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium ${
//                             getSeatStatus(seat.id) === "available" ? "!bg-gray-200 hover:!bg-gray-300" :
//                             getSeatStatus(seat.id) === "selected" ? "!bg-green-500 text-white" :
//                             "!bg-red-500 text-white cursor-not-allowed"
//                           }`}
//                           onClick={() => handleSeatClick(seat.id, getSeatStatus(seat.id))}
//                           disabled={getSeatStatus(seat.id) === "booked"}
//                         >
//                           {seat.id}
//                         </button>
//                         <span className="text-xs">₹{busDetails.price}</span>
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//               {/* Booking Summary */}
//               <div className="w-full lg:w-1/3">
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                   {/* Summary code remains unchanged */}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default SeatSelectionPage;
