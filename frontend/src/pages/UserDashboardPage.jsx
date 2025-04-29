import React, { useEffect } from "react"

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Calendar, MapPin, User, Mail, Phone, CreditCard, LogOut } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;

// Mock data for user bookings
const upcomingBookings = [
  {
    id: "BK1234",
    busName: "Express Deluxe",
    operator: "National Express",
    from: "New York",
    to: "Boston",
    date: "2023-06-15",
    departureTime: "08:00 AM",
    arrivalTime: "11:30 AM",
    seats: [5, 6],
    status: "Confirmed",
    price: 90,
  },
  {
    id: "BK1235",
    busName: "Luxury Liner",
    operator: "Premium Coaches",
    from: "Boston",
    to: "Washington DC",
    date: "2023-07-22",
    departureTime: "09:15 AM",
    arrivalTime: "02:45 PM",
    seats: [12],
    status: "Confirmed",
    price: 55,
  },
];

const pastBookings = [
  {
    id: "BK1230",
    busName: "City Hopper",
    operator: "Urban Transit",
    from: "New York",
    to: "Philadelphia",
    date: "2023-05-10",
    departureTime: "10:30 AM",
    arrivalTime: "01:00 PM",
    seats: [18],
    status: "Completed",
    price: 40,
  },
  {
    id: "BK1228",
    busName: "Night Rider",
    operator: "Moonlight Travel",
    from: "Chicago",
    to: "Detroit",
    date: "2023-04-05",
    departureTime: "11:00 PM",
    arrivalTime: "06:00 AM",
    seats: [22, 23],
    status: "Completed",
    price: 130,
  },
  {
    id: "BK1225",
    busName: "Express Deluxe",
    operator: "National Express",
    from: "Boston",
    to: "New York",
    date: "2023-03-20",
    departureTime: "02:00 PM",
    arrivalTime: "05:30 PM",
    seats: [8],
    status: "Cancelled",
    price: 45,
  },
];

const UserDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // optional if you're using cookies
        }); // Adjust API path if needed
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch prfile:", error);
      }
    };

    fetchBusDetails();
  }, []);


  const allBookings = userData?.confirmPayments?.map(payment => ({
    ...payment.booking,
    paymentId: payment._id,
    amountPaid: payment.amount,
    transactionId: payment.transactionId,
  })) || [];

  const today = new Date();

  const upcomingBookings = allBookings.filter(b =>
    new Date(b.bus.date) >= today
  );

  const pastBookings = allBookings.filter(b =>
    new Date(b.bus.date) < today
  );


  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setCancelModalOpen(true);
  };

  const confirmCancelBooking = () => {
    console.log("Cancelling booking:", selectedBooking.id);
    setCancelModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-blue-600 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white">
            <h1 className="text-2xl font-bold">My Dashboard</h1>
            <p className="mt-1">Manage your bookings and account</p>
          </div>
        </div>
      </div>

      <div className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-blue-100 rounded-full p-3">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-700">{userData?.name}</h2>
                    <p className="text-gray-600">Premium Member</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    <p className="text-gray-600">{userData?.email}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700">{userData?.contact}</span>
                  </div>
                </div>

                <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 mb-4">
                  Edit Profile
                </button>

                <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Tabs defaultValue="upcoming" className="w-full">
                  <div className="px-6 pt-6">
                    <h2 className="text-xl font-bold mb-4">My Bookings</h2>
                    <TabsList className="grid w-full grid-cols-2 gap-1">
                      <TabsTrigger value="upcoming" onClick={() => setActiveTab("upcoming")}>
                        Upcoming
                      </TabsTrigger>
                      <TabsTrigger value="past" onClick={() => setActiveTab("past")}>
                        Past
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {/* <TabsContent value={activeTab} className="p-6">
                    {(activeTab === "upcoming" ? upcomingBookings : pastBookings).map((booking) => (
                      <div key={booking.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-blue-50 p-4 flex justify-between items-center">
                          <div>
                            <span className="font-semibold">Booking ID: {booking.id}</span>
                            <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {booking.status}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-500">Total Paid</span>
                            <p className="font-bold">${booking.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent> */}
                  <TabsContent value={activeTab} className="p-6">
                    {(activeTab === "upcoming" ? upcomingBookings : pastBookings).map((booking) => (
                      <div key={booking._id} className="border mb-3 text-gray-700 rounded-lg overflow-hidden">
                        <div className="bg-blue-50 p-4 flex justify-between items-center">
                          <div>
                            <span className="font-semibold text-gray-700">Booking ID: {booking._id}</span>
                            <span className="ml-4 inline-flex text-gray-700 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {booking.paymentStatus}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-500">Paid</span>
                            <p className="font-bold text-gray-700">₹{booking.amountPaid}</p>
                          </div>
                        </div>
                        <div className="p-4 bg-white border-t">
                          <p><strong>Bus:</strong> {booking.bus.name} | {booking.bus.from} → {booking.bus.to}</p>
                          <p><strong>Date:</strong> {new Date(booking.bus.date).toLocaleDateString()} | <strong>Time:</strong>
                            {new Date(`1970-01-01T${booking.bus.time}:00`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}</p>
                          <p><strong>Seats:</strong> {booking.seatNumbers.join(", ")}</p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboardPage;
