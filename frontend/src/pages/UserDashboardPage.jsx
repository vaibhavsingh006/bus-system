import React, { useEffect } from "react"

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { CardContent, Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Calendar, MapPin, User, Mail, Phone, CreditCard, LogOut, Bus, Badge, Clock, Eye, Download } from "lucide-react";
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
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

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


    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/allbooking`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // optional if you're using cookies
        }); // Adjust API path if needed
        const data = await response.json();
        setBooking(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch prfile:", error);
      }
    };

    fetchBookingDetails();
  }, []);


  useEffect(() => {
    if (activeTab === 'pending') setStatus('Pending');
    else if (activeTab === 'upcoming') setStatus('Confirmed');
    else if (activeTab === 'past') setStatus('Completed');
  }, [activeTab]);


  const allBookings = userData?.confirmPayments?.map(payment => ({
    ...payment.booking,
    paymentId: payment._id,
    amountPaid: payment.amount,
    transactionId: payment.transactionId,
  })) || [];
  console.log(allBookings)

  const today = new Date();

  const pending = booking?.filter(a => a.paymentStatus === 'Pending') || [];

  console.log(pending, 'pending')
  // const upcomingBookings = allBookings.filter(b => {
  //   new Date(b.travelDate) >= today;
  // }
  // );
  const upcomingBookings = allBookings.filter(b => new Date(b.travelDate) >= today);

  console.log(upcomingBookings, 'upcomingBookings')

  const pastBookings = allBookings.filter(b => new Date(b.travelDate) < today);
  console.log(pastBookings, 'upcomingBookings')


  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setCancelModalOpen(true);
  };

  const confirmCancelBooking = () => {
    console.log("Cancelling booking:", selectedBooking.id);
    setCancelModalOpen(false);
  };

  const renderBookingCard = (booking) => {
    console.log(status)
    if (!booking) return 'no buses';
    return (<Card key={booking._id} className="mb-4 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-4 md:border-r">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg flex items-center">
                  <Bus className="mr-2 h-5 w-5 text-primary" />
                  {booking.bus.name}
                </h3>
                <p className="text-sm text-muted-foreground">{booking.bus.amenities.length < 3 ? booking.bus.seatType : 'Luxury '} Bus</p>
              </div>
              {/* <Badge
                className={
                  status === "Confirmed"
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : status === "Completed"
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                }
                value={`status`}
              >

              </Badge> */}
              <div className={
                status === "Confirmed"
                  ? "bg-green-100 text-green-800 font-semibold text-xs px-2 py-1 hover:bg-green-200"
                  : status === "Completed"
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-200 font-semibold text-xs px-2 py-1 rounded"
                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 font-semibold text-xs px-2 py-1"
              }>{status}</div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{new Date(booking.travelDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{new Date(`1970-01-01T${booking.bus.time}:00`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <div className="flex items-center">
                <span className="text-sm font-medium">{booking.bus.from}</span>
                <span className="mx-2 text-muted-foreground">→</span>
                <span className="text-sm font-medium">{booking.bus.to}</span>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 p-4 flex flex-col justify-between md:w-64">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Booking NO:</span>
                <span className="text-sm font-medium">{booking.bus.busNumber}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Seats:</span>
                <span className="text-sm font-medium">{booking.seatNumbers.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Price:</span>
                <span className="text-sm font-medium">₹{activeTab === 'pending' ? booking.totalPrice : booking.amountPaid}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="h-4 w-4 mr-1" />
                Details
              </Button>
              {booking.paymentStatus === "Pending" ? (
                <Button variant="default" size="sm" className="flex-1">
                  Pay Now
                </Button>
              ) : (

                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-1" />
                  Ticket
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>)
  }


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
                    <TabsList className="grid w-full grid-cols-2 gap-5">
                      <TabsTrigger className="font-semibold bg-green-400 text-gray-800" value="upcoming" onClick={() => setActiveTab("upcoming")}>
                        Upcoming
                      </TabsTrigger>
                      <TabsTrigger className="font-semibold bg-blue-400 text-gray-800" value="past" onClick={() => setActiveTab("past")}>
                        Past
                      </TabsTrigger>
                      <TabsTrigger className="font-semibold bg-yellow-400 text-gray-800" value="pending" onClick={() => setActiveTab("pending")}>
                        Pending
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
                    {(activeTab === "upcoming" ? upcomingBookings : activeTab === 'past' ? pastBookings : pending).map(renderBookingCard
                      // (booking) => (
                      //   <div key={booking._id} className="border mb-3 text-gray-700 rounded-lg overflow-hidden">
                      //     <div className="bg-blue-50 p-4 flex justify-between items-center">
                      //       <div>
                      //         <span className="font-semibold text-gray-700">Booking ID: {booking._id}</span>
                      //         <span className={`ml-4 inline-flex ${activeTab === 'pending' ? '!text-gray-700 !bg-gray-300' : ''} items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800`}>
                      //           {booking.paymentStatus}
                      //         </span>
                      //       </div>
                      //       <div className="text-right">
                      //         <span className="text-sm text-gray-500">{activeTab === 'pending' ? 'NotPaid' : 'Paid'}</span>
                      //         <p className="font-bold text-gray-700">₹{activeTab === 'pending' ? booking.totalPrice : booking.amountPaid}</p>
                      //       </div>
                      //     </div>
                      //     <div className="p-4 bg-white border-t">
                      //       <p><strong>Bus:</strong> {booking.bus.name} | {booking.bus.from} → {booking.bus.to}</p>
                      //       <p><strong>Date:</strong> {new Date(booking.travelDate).toLocaleDateString()} | <strong>Time:</strong>
                      //         {new Date(`1970-01-01T${booking.bus.time}:00`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}</p>
                      //       <p><strong>Seats:</strong> {booking.seatNumbers.join(", ")}</p>
                      //     </div>
                      //   </div>

                      // )
                    )}
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
