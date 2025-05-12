// import React, { useState } from "react";
// import {
//     Bell,
//     Bus,
//     Calendar,
//     ChevronDown,
//     DollarSign,
//     Edit,
//     LogOut,
//     Menu, // Used for Dashboard icon
//     Plus,
//     Search,
//     // Settings, // Removed
//     Trash2,
//     User,
//     Users,
//     X,
// } from "lucide-react";

// export default function Dashboard() {
//     const stats = [
//         { title: "Total Buses", value: "42", icon: Bus, color: "bg-blue-500" },
//         { title: "Total Bookings", value: "1,284", icon: Calendar, color: "bg-green-500" },
//         { title: "Total Users", value: "3,567", icon: Users, color: "bg-purple-500" },
//     ];
//     const revenueData = [
//         { month: "Jan", amount: 12500 },
//         { month: "Feb", amount: 18200 },
//         { month: "Mar", amount: 15800 },
//         { month: "Apr", amount: 21000 },
//         { month: "May", amount: 19500 },
//         { month: "Jun", amount: 24800 },
//         { month: "Jul", amount: 24800 },
//         { month: "aug", amount: 24200 },
//         { month: "sep", amount: 24300 },
//         { month: "oct", amount: 248 },
//         { month: "nev", amount: 24803 },
//         { month: "dec", amount: 24833 },
//     ];

//     const recentBookings = [
//         { id: "BK-1001", customer: "John Smith", route: "New York to Boston", date: "2025-05-08", seats: 2, amount: 120 },
//         { id: "BK-1002", customer: "Sarah Johnson", route: "Chicago to Detroit", date: "2025-05-09", seats: 1, amount: 75 },
//         { id: "BK-1003", customer: "Michael Brown", route: "Los Angeles to San Francisco", date: "2025-05-10", seats: 3, amount: 210 },
//         { id: "BK-1004", customer: "Emily Davis", route: "Seattle to Portland", date: "2025-05-10", seats: 2, amount: 95 },
//         { id: "BK-1005", customer: "Robert Wilson", route: "Miami to Orlando", date: "2025-05-11", seats: 4, amount: 180 },
//     ];

//     const buses = [
//         { id: "BUS-101", name: "Express Liner", capacity: 45, route: "New York to Boston", status: "Active" },
//         { id: "BUS-102", name: "City Cruiser", capacity: 38, route: "Chicago to Detroit", status: "Active" },
//         { id: "BUS-103", name: "Coastal Express", capacity: 52, route: "Los Angeles to San Francisco", status: "Maintenance" },
//         { id: "BUS-104", name: "Mountain Voyager", capacity: 42, route: "Seattle to Portland", status: "Active" },
//     ];

//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//     const [showAddBusModal, setShowAddBusModal] = useState(false);
//     const [showEditBusModal, setShowEditBusModal] = useState(false);
//     const [editingBus, setEditingBus] = useState(null);
//     const [range, setRange] = useState("6");
//     const [activeTab, setActiveTab] = useState("dashboard"); // New state for active tab

//     const handleEditBus = (bus) => {
//         setEditingBus(bus);
//         setShowEditBusModal(true);
//     };

//     const totalRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0);
//     const maxRevenue = Math.max(...revenueData.map((item) => item.amount));
//     const filteredData = revenueData.slice(-parseInt(range === "all" ? revenueData.length : range));


//     // Helper component for section titles
//     const SectionTitle = ({ title, subtitle }) => (
//         <div className="mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
//             {subtitle && <p className="text-gray-600">{subtitle}</p>}
//         </div>
//     );

//     // Individual sections as components for clarity
//     const DashboardStats = () => (
//         <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {stats.map((stat, index) => (
//                 <div key={index} className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm font-medium text-gray-500">{stat.title}</p>
//                             <p className="mt-1 text-3xl font-bold text-gray-800">{stat.value}</p>
//                         </div>
//                         <div className={`rounded-full ${stat.color} p-3 text-white`}>
//                             <stat.icon size={24} />
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );

//     const RevenueChart = () => (
//         <div className="rounded-2xl bg-white p-6 shadow-md lg:col-span-2">
//             <div className="mb-4 flex items-center justify-between text-gray-600">
//                 <h3 className="text-xl font-bold text-gray-800">Revenue Overview</h3>
//                 <select
//                     value={range}
//                     onChange={(e) => setRange(e.target.value)}
//                     className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                     <option value="6">Last 6 months</option>
//                     <option value="12">Last 12 months</option>
//                     <option value="all">This year</option>
//                 </select>
//             </div>
//             <div className="mb-4">
//                 <p className="text-3xl font-bold text-gray-800">${totalRevenue.toLocaleString()}</p>
//                 <p className="text-sm text-gray-500">Total Revenue</p>
//             </div>
//             <div className="mt-6 flex h-60 items-end justify-between space-x-2">
//                 {filteredData.map((item, index) => {
//                     const height = maxRevenue > 0 ? (item.amount / maxRevenue) * 180 : 0;
//                     return (
//                         <div key={index} className="relative group flex flex-col items-center">
//                             <div className="absolute bottom-full mb-2 hidden w-20 rounded-md bg-gray-800 px-2 py-1 text-center text-xs text-white group-hover:block">
//                                 ${item.amount.toLocaleString()}
//                             </div>
//                             <div
//                                 className="w-10 rounded-t-md bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-300 hover:from-blue-600"
//                                 style={{ height: `${height}px` }}
//                             ></div>
//                             <p className="mt-2 text-xs font-medium text-gray-500">{item.month}</p>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );

//     const QuickActionsPanel = () => (
//         <div className="rounded-lg bg-white p-6 shadow-sm">
//             <h3 className="mb-4 text-lg font-bold text-gray-800">Quick Actions</h3>
//             <div className="space-y-3">
//                 <button
//                     className="flex w-full items-center justify-between rounded-lg bg-blue-50 px-4 py-3 text-blue-700 transition-colors hover:bg-blue-100"
//                     onClick={() => {
//                         setShowAddBusModal(true);
//                         // Optionally, switch to buses tab if user wants to see the list after adding
//                         // setActiveTab("buses");
//                     }}
//                 >
//                     <span className="font-medium">Add New Bus</span>
//                     <Plus size={18} />
//                 </button>
//                 <button
//                     className="flex w-full items-center justify-between rounded-lg bg-purple-50 px-4 py-3 text-purple-700 transition-colors hover:bg-purple-100"
//                     onClick={() => setActiveTab("bookings")}
//                 >
//                     <span className="font-medium">View Bookings</span>
//                     <Calendar size={18} />
//                 </button>
//                 <button
//                     className="flex w-full items-center justify-between rounded-lg bg-green-50 px-4 py-3 text-green-700 transition-colors hover:bg-green-100"
//                     onClick={() => setActiveTab("customers")}
//                 >
//                     <span className="font-medium">Manage Users</span>
//                     <User size={18} />
//                 </button>
//                 <button className="flex w-full items-center justify-between rounded-lg bg-orange-50 px-4 py-3 text-orange-700 transition-colors hover:bg-orange-100">
//                     <span className="font-medium">Generate Reports</span>
//                     <ChevronDown size={18} />
//                 </button>
//             </div>
//         </div>
//     );

//     const RecentBookingsSection = () => (
//         <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
//             <div className="mb-4 flex items-center justify-between">
//                 <h3 className="text-lg font-bold text-gray-800">Recent Bookings</h3>
//                 {activeTab === "dashboard" && ( // Show "View All" only on dashboard, as Bookings tab shows all by default
//                     <button
//                         onClick={() => setActiveTab("bookings")}
//                         className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
//                     >
//                         View All
//                     </button>
//                 )}
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="w-full min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Booking ID</th>
//                             <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Customer</th>
//                             <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Route</th>
//                             <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
//                             <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Seats</th>
//                             <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Amount</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 bg-white">
//                         {recentBookings.map((booking) => (
//                             <tr key={booking.id} className="hover:bg-gray-50">
//                                 <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">{booking.id}</td>
//                                 <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">{booking.customer}</td>
//                                 <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">{booking.route}</td>
//                                 <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">{booking.date}</td>
//                                 <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">{booking.seats}</td>
//                                 <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">${booking.amount}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );

//     const ManageBusesSection = () => (
//         <div className="rounded-lg bg-white p-6 shadow-sm">
//             <div className="mb-4 flex items-center justify-between">
//                 <h3 className="text-lg font-bold text-gray-800">Manage Buses</h3>
//                 <button
//                     className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
//                     onClick={() => setShowAddBusModal(true)}
//                 >
//                     <Plus size={16} />
//                     Add New Bus
//                 </button>
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="w-full min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Bus ID</th>
//                             <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
//                             <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Capacity</th>
//                             <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Route</th>
//                             <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
//                             <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 bg-white">
//                         {buses.map((bus) => (
//                             <tr key={bus.id} className="hover:bg-gray-50">
//                                 <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">{bus.id}</td>
//                                 <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">{bus.name}</td>
//                                 <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">{bus.capacity} seats</td>
//                                 <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">{bus.route}</td>
//                                 <td className="whitespace-nowrap px-4 py-3 text-sm">
//                                     <span
//                                         className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${bus.status === "Active" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}
//                                     >
//                                         {bus.status}
//                                     </span>
//                                 </td>
//                                 <td className="whitespace-nowrap px-4 py-3 text-sm">
//                                     <div className="flex gap-2">
//                                         <button
//                                             className="rounded p-1 text-blue-600 hover:bg-blue-50"
//                                             onClick={() => handleEditBus(bus)}
//                                         >
//                                             <Edit size={18} />
//                                         </button>
//                                         <button className="rounded p-1 text-red-600 hover:bg-red-50">
//                                             <Trash2 size={18} />
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );

//     const CustomerContent = () => {
//         const totalUsersStat = stats.find(s => s.title === "Total Users");
//         return (
//             <div className="rounded-lg bg-white p-6 shadow-sm">
//                 {totalUsersStat && (
//                     <div className="mb-6 max-w-sm">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-sm font-medium text-gray-500">{totalUsersStat.title}</p>
//                                 <p className="mt-1 text-3xl font-bold text-gray-800">{totalUsersStat.value}</p>
//                             </div>
//                             <div className={`rounded-full ${totalUsersStat.color} p-3 text-white`}>
//                                 <totalUsersStat.icon size={24} />
//                             </div>
//                         </div>
//                     </div>
//                 )}
//                 <p className="text-gray-600">Detailed customer information and management tools will be available here in a future update.</p>
//                 {/* You can list customers from recentBookings or add more detailed customer data */}
//             </div>
//         );
//     };


//     const navItems = [
//         { name: "Dashboard", tab: "dashboard", icon: Menu },
//         { name: "Bookings", tab: "bookings", icon: Calendar },
//         { name: "Customers", tab: "customers", icon: Users },
//         { name: "Buses", tab: "buses", icon: Bus },
//         { name: "Revenue", tab: "revenue", icon: DollarSign },
//     ];

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="flex">
//                 <aside
//                     className={`${mobileMenuOpen ? "block" : "hidden"} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:block lg:translate-x-0 lg:static lg:z-auto`}
//                 >
//                     <div className="flex h-16 items-center justify-center border-b">
//                         <div className="flex items-center gap-2">
//                             <Bus className="h-8 w-8 text-blue-600" />
//                             <h1 className="text-xl font-bold text-gray-800">BusAdmin</h1>
//                         </div>
//                     </div>
//                     <nav className="mt-6 px-4">
//                         <div className="space-y-1">
//                             {navItems.map((item) => (
//                                 <a
//                                     key={item.tab}
//                                     href="#"
//                                     onClick={(e) => {
//                                         e.preventDefault();
//                                         setActiveTab(item.tab);
//                                         setMobileMenuOpen(false); // Close mobile menu on item click
//                                     }}
//                                     className={`flex items-center gap-3 rounded-lg px-4 py-3 ${activeTab === item.tab
//                                         ? "bg-blue-50 text-blue-700"
//                                         : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
//                                         }`}
//                                 >
//                                     <div className={`rounded-md p-1 ${activeTab === item.tab ? "bg-blue-100" : "bg-gray-100 group-hover:bg-gray-200"}`}>
//                                         <item.icon size={18} />
//                                     </div>
//                                     <span className="font-medium">{item.name}</span>
//                                 </a>
//                             ))}
//                         </div>
//                         <div className="mt-10 border-t pt-4">
//                             <a
//                                 href="#"
//                                 onClick={(e) => e.preventDefault()} // Add actual logout logic here
//                                 className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
//                             >
//                                 <div className="rounded-md bg-gray-100 p-1">
//                                     <LogOut size={18} />
//                                 </div>
//                                 <span className="font-medium">Logout</span>
//                             </a>
//                         </div>
//                     </nav>
//                 </aside>

//                 {/* Hamburger Menu Button for Mobile */}
//                 <div className="lg:hidden fixed top-4 left-4 z-50">
//                     <button
//                         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                         className="rounded-md bg-white p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
//                     >
//                         {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//                     </button>
//                 </div>


//                 <main className="flex-1 px-4 py-6 lg:px-8 lg:ml-64"> {/* Adjust ml if sidebar is fixed */}
//                     {/* Conditional Rendering based on activeTab */}
//                     {activeTab === "dashboard" && (
//                         <>
//                             <SectionTitle title="Dashboard Overview" subtitle="Welcome back, Admin! Here's what's happening today." />
//                             <DashboardStats />
//                             <div className="mb-8 grid gap-6 lg:grid-cols-3">
//                                 <RevenueChart />
//                                 <QuickActionsPanel />
//                             </div>
//                             <RecentBookingsSection />
//                             <ManageBusesSection />
//                         </>
//                     )}

//                     {activeTab === "bookings" && (
//                         <>
//                             <SectionTitle title="Manage Bookings" />
//                             <RecentBookingsSection />
//                         </>
//                     )}

//                     {activeTab === "customers" && (
//                         <>
//                             <SectionTitle title="Customer Overview" />
//                             <CustomerContent />
//                         </>
//                     )}
//                     {activeTab === "buses" && (
//                         <>
//                             <SectionTitle title="Manage Buses" />
//                             <ManageBusesSection />
//                         </>
//                     )}

//                     {activeTab === "revenue" && (
//                         <>
//                             <SectionTitle title="Revenue Details" />
//                             <div className="grid grid-cols-1 gap-6"> {/* Ensure chart takes appropriate space */}
//                                 <RevenueChart />
//                             </div>
//                         </>
//                     )}
//                 </main>
//             </div>

//             {/* Add Bus Modal */}
//             {showAddBusModal && (
//                 <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4">
//                     <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
//                         <div className="mb-4 flex items-center justify-between">
//                             <h3 className="text-lg font-bold text-gray-800">Add New Bus</h3>
//                             <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowAddBusModal(false)}>
//                                 <X size={20} />
//                             </button>
//                         </div>
//                         <form>
//                             <div className="mb-4">
//                                 <label className="mb-1 block text-sm font-medium text-gray-700">Bus Name</label>
//                                 <input type="text" className="w-full rounded-md border border-gray-300 text-gray-800  px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Enter bus name" />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="mb-1 block text-sm font-medium text-gray-700">Capacity</label>
//                                 <input type="number" className="w-full rounded-md border border-gray-300 text-gray-800 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Enter capacity" />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="mb-1 block text-sm font-medium text-gray-700">Route</label>
//                                 <input type="text" className="w-full rounded-md border border-gray-300 text-gray-800 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Enter route" />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
//                                 <select className="w-full rounded-md border border-gray-300 text-gray-800 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
//                                     <option>Active</option>
//                                     <option>Maintenance</option>
//                                     <option>Out of Service</option>
//                                 </select>
//                             </div>
//                             <div className="flex justify-end gap-3">
//                                 <button type="button" className="rounded-md border border-gray-300 text-gray-800 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50" onClick={() => setShowAddBusModal(false)}>Cancel</button>
//                                 <button type="button" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" onClick={() => setShowAddBusModal(false)}>Add Bus</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* Edit Bus Modal */}
//             {showEditBusModal && editingBus && (
//                 <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4">
//                     <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
//                         <div className="mb-4 flex items-center justify-between">
//                             <h3 className="text-lg font-bold text-gray-800">Edit Bus</h3>
//                             <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowEditBusModal(false)}>
//                                 <X size={20} />
//                             </button>
//                         </div>
//                         <form>
//                             <div className="mb-4">
//                                 <label className="mb-1 block text-sm font-medium text-gray-700">Bus ID</label>
//                                 <input type="text" className="w-full rounded-md border border-gray-300 text-gray-800 bg-gray-100 px-3 py-2" value={editingBus.id} disabled />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="mb-1 block text-sm font-medium text-gray-700">Bus Name</label>
//                                 <input type="text" className="w-full rounded-md border border-gray-300 text-gray-800 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" defaultValue={editingBus.name} />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="mb-1 block text-sm font-medium text-gray-700">Capacity</label>
//                                 <input type="number" className="w-full rounded-md border border-gray-300 text-gray-800 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" defaultValue={editingBus.capacity} />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="mb-1 block text-sm font-medium text-gray-700">Route</label>
//                                 <input type="text" className="w-full rounded-md border border-gray-300 text-gray-800 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" defaultValue={editingBus.route} />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
//                                 <select className="w-full rounded-md border border-gray-300 text-gray-800 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" defaultValue={editingBus.status}>
//                                     <option>Active</option>
//                                     <option>Maintenance</option>
//                                     <option>Out of Service</option>
//                                 </select>
//                             </div>
//                             <div className="flex justify-end gap-3">
//                                 <button type="button" className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setShowEditBusModal(false)}>Cancel</button>
//                                 <button type="button" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" onClick={() => setShowEditBusModal(false)}>Save Changes</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }




import React, { useState } from "react";
import {
    // Bell, // No longer used directly here if not needed elsewhere
    Bus,
    Calendar,
    ChevronDown,
    DollarSign,
    // Edit, // Moved to BusesView
    LogOut,
    Menu,
    // Plus, // Moved to BusesView & QuickActions
    // Search, // No longer used directly here
    // Trash2, // Moved to BusesView
    User, // Used in QuickActions
    Users, // Used for nav icon
    X,
} from "lucide-react";

// Import the new components (adjust path if your components folder is elsewhere)
import RevenueView from '../components/RevenueView';
import BookingsView from '../components/BookingsView';
import CustomersView from '../components/CustomersView';
import BusesView from '../components/BusesView';

export default function Dashboard() {
    const stats = [
        { title: "Total Buses", value: "42", icon: Bus, color: "bg-blue-500" },
        { title: "Total Bookings", value: "1,284", icon: Calendar, color: "bg-green-500" },
        { title: "Total Users", value: "3,567", icon: Users, color: "bg-purple-500" }, // Users icon here for the stat data
    ];
    const revenueData = [
        { month: "Jan", amount: 12500 }, { month: "Feb", amount: 18200 }, { month: "Mar", amount: 15800 }, { month: "Apr", amount: 21000 }, { month: "May", amount: 19500 }, { month: "Jun", amount: 24800 }, { month: "Jul", amount: 24800 }, { month: "aug", amount: 24200 }, { month: "sep", amount: 24300 }, { month: "oct", amount: 248 }, { month: "nev", amount: 24803 }, { month: "dec", amount: 24833 },
    ];
    const recentBookings = [
        { id: "BK-1001", customer: "John Smith", route: "New York to Boston", date: "2025-05-08", seats: 2, amount: 120 }, { id: "BK-1002", customer: "Sarah Johnson", route: "Chicago to Detroit", date: "2025-05-09", seats: 1, amount: 75 }, { id: "BK-1003", customer: "Michael Brown", route: "Los Angeles to San Francisco", date: "2025-05-10", seats: 3, amount: 210 }, { id: "BK-1004", customer: "Emily Davis", route: "Seattle to Portland", date: "2025-05-10", seats: 2, amount: 95 }, { id: "BK-1005", customer: "Robert Wilson", route: "Miami to Orlando", date: "2025-05-11", seats: 4, amount: 180 },
    ];
    const buses = [
        { id: "BUS-101", name: "Express Liner", capacity: 45, route: "New York to Boston", status: "Active" }, { id: "BUS-102", name: "City Cruiser", capacity: 38, route: "Chicago to Detroit", status: "Active" }, { id: "BUS-103", name: "Coastal Express", capacity: 52, route: "Los Angeles to San Francisco", status: "Maintenance" }, { id: "BUS-104", name: "Mountain Voyager", capacity: 42, route: "Seattle to Portland", status: "Active" },
    ];

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showAddBusModal, setShowAddBusModal] = useState(false);
    const [showEditBusModal, setShowEditBusModal] = useState(false);
    const [editingBus, setEditingBus] = useState(null);
    const [range, setRange] = useState("6");
    const [activeTab, setActiveTab] = useState("dashboard");

    const handleEditBus = (bus) => {
        setEditingBus(bus);
        setShowEditBusModal(true);
    };

    const totalRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0);
    const maxRevenue = Math.max(...revenueData.map((item) => item.amount));
    const filteredData = revenueData.slice(-parseInt(range === "all" ? revenueData.length : range));

    const SectionTitle = ({ title, subtitle }) => (
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
    );

    // This component remains in Dashboard.js as it's specific to the overview dashboard
    const DashboardStats = () => (
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
                <div key={index} className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                            <p className="mt-1 text-3xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                        <div className={`rounded-full ${stat.color} p-3 text-white`}>
                            <stat.icon size={24} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    // This component also remains as it's part of the overview dashboard
    const QuickActionsPanel = () => (
        <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-gray-800">Quick Actions</h3>
            <div className="space-y-3">
                <button
                    className="flex w-full items-center justify-between rounded-lg bg-blue-50 px-4 py-3 text-blue-700 transition-colors hover:bg-blue-100"
                    onClick={() => { setShowAddBusModal(true); }}
                >
                    <span className="font-medium">Add New Bus</span>
                    {/* Plus icon can be imported directly here if not already */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <button
                    className="flex w-full items-center justify-between rounded-lg bg-purple-50 px-4 py-3 text-purple-700 transition-colors hover:bg-purple-100"
                    onClick={() => setActiveTab("bookings")}
                >
                    <span className="font-medium">View Bookings</span>
                    <Calendar size={18} />
                </button>
                <button
                    className="flex w-full items-center justify-between rounded-lg bg-green-50 px-4 py-3 text-green-700 transition-colors hover:bg-green-100"
                    onClick={() => setActiveTab("customers")}
                >
                    <span className="font-medium">Manage Users</span>
                    <User size={18} />
                </button>
                <button className="flex w-full items-center justify-between rounded-lg bg-orange-50 px-4 py-3 text-orange-700 transition-colors hover:bg-orange-100">
                    <span className="font-medium">Generate Reports</span>
                    <ChevronDown size={18} />
                </button>
            </div>
        </div>
    );

    const navItems = [
        { name: "Dashboard", tab: "dashboard", icon: Menu }, { name: "Bookings", tab: "bookings", icon: Calendar }, { name: "Customers", tab: "customers", icon: Users }, { name: "Buses", tab: "buses", icon: Bus }, { name: "Revenue", tab: "revenue", icon: DollarSign },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <aside className={`${mobileMenuOpen ? "block" : "hidden"} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:block lg:translate-x-0 lg:static lg:z-auto`}>
                    <div className="flex h-16 items-center justify-center border-b">
                        <div className="flex items-center gap-2">
                            <Bus className="h-8 w-8 text-blue-600" />
                            <h1 className="text-xl font-bold text-gray-800">BusAdmin</h1>
                        </div>
                    </div>
                    <nav className="mt-6 px-4">
                        <div className="space-y-1">
                            {navItems.map((item) => (
                                <a key={item.tab} href="#" onClick={(e) => { e.preventDefault(); setActiveTab(item.tab); setMobileMenuOpen(false); }}
                                    className={`flex items-center gap-3 rounded-lg px-4 py-3 ${activeTab === item.tab ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}`}>
                                    <div className={`rounded-md p-1 ${activeTab === item.tab ? "bg-blue-100" : "bg-gray-100 group-hover:bg-gray-200"}`}>
                                        <item.icon size={18} />
                                    </div>
                                    <span className="font-medium">{item.name}</span>
                                </a>
                            ))}
                        </div>
                        <div className="mt-10 border-t pt-4">
                            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                                <div className="rounded-md bg-gray-100 p-1"><LogOut size={18} /></div>
                                <span className="font-medium">Logout</span>
                            </a>
                        </div>
                    </nav>
                </aside>

                <div className="lg:hidden fixed top-4 left-4 z-[60]"> {/* Increased z-index for hamburger */}
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-md bg-white p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <main className={`flex-1 px-4 py-6 lg:px-8 ${mobileMenuOpen && !window.matchMedia('(min-width: 1024px)').matches ? 'ml-0' : 'lg:ml-64'}`}> {/* Conditional margin for main content */}
                    {activeTab === "dashboard" && (
                        <>
                            <SectionTitle title="Dashboard Overview" subtitle="Welcome back, Admin! Here's what's happening today." />
                            <DashboardStats /> {/* Uses stats prop from Dashboard.js */}
                            <div className="mb-8 grid gap-6 lg:grid-cols-3">
                                <RevenueView range={range} setRange={setRange} totalRevenue={totalRevenue} maxRevenue={maxRevenue} filteredData={filteredData} />
                                <QuickActionsPanel /> {/* Uses setActiveTab, setShowAddBusModal from Dashboard.js */}
                            </div>
                            <BookingsView recentBookings={recentBookings} activeTab={activeTab} setActiveTab={setActiveTab} />
                            <BusesView buses={buses} handleEditBus={handleEditBus} setShowAddBusModal={setShowAddBusModal} />
                        </>
                    )}
                    {activeTab === "bookings" && (
                        <>
                            <SectionTitle title="Manage Bookings" />
                            {/* Pass activeTab and setActiveTab if BookingsView needs to hide its own "View All" button, or adjust BookingsView */}
                            <BookingsView recentBookings={recentBookings} activeTab={activeTab} setActiveTab={setActiveTab} />
                        </>
                    )}
                    {activeTab === "customers" && (
                        <>
                            <SectionTitle title="Customer Overview" />
                            <CustomersView stats={stats} />
                        </>
                    )}
                    {activeTab === "buses" && (
                        <>
                            <SectionTitle title="Manage Buses" />
                            <BusesView buses={buses} handleEditBus={handleEditBus} setShowAddBusModal={setShowAddBusModal} />
                        </>
                    )}
                    {activeTab === "revenue" && (
                        <>
                            <SectionTitle title="Revenue Details" />
                            <div className="grid grid-cols-1 gap-6"> {/* Ensure chart takes appropriate space */}
                                <RevenueView range={range} setRange={setRange} totalRevenue={totalRevenue} maxRevenue={maxRevenue} filteredData={filteredData} />
                            </div>
                        </>
                    )}
                </main>
            </div>

            {/* Add Bus Modal */}
            {showAddBusModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-800">Add New Bus</h3>
                            <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowAddBusModal(false)}><X size={20} /></button>
                        </div>
                        <form>
                            <div className="mb-4"><label className="mb-1 block text-sm font-medium text-gray-700">Bus Name</label><input type="text" className="w-full rounded-md border border-gray-300 text-gray-800 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Enter bus name" /></div>
                            <div className="mb-4"><label className="mb-1 block text-sm font-medium text-gray-700">Capacity</label><input type="number" className="w-full rounded-md border border-gray-300 text-gray-800 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Enter capacity" /></div>
                            <div className="mb-4"><label className="mb-1 block text-sm font-medium text-gray-700">Route</label><input type="text" className="w-full rounded-md border border-gray-300 text-gray-800 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Enter route" /></div>
                            <div className="mb-4"><label className="mb-1 block text-sm font-medium text-gray-700">Status</label><select className="w-full rounded-md border border-gray-300 text-gray-800 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"><option>Active</option><option>Maintenance</option><option>Out of Service</option></select></div>
                            <div className="flex justify-end gap-3"><button type="button" className="rounded-md border border-gray-300 text-gray-800 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50" onClick={() => setShowAddBusModal(false)}>Cancel</button><button type="button" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" onClick={() => setShowAddBusModal(false)}>Add Bus</button></div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Bus Modal */}
            {showEditBusModal && editingBus && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-800">Edit Bus</h3>
                            <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowEditBusModal(false)}><X size={20} /></button>
                        </div>
                        <form>
                            <div className="mb-4"><label className="mb-1 block text-sm font-medium text-gray-700">Bus ID</label><input type="text" className="w-full rounded-md border border-gray-300 text-gray-800 bg-gray-100 px-3 py-2" value={editingBus.id} disabled /></div>
                            <div className="mb-4"><label className="mb-1 block text-sm font-medium text-gray-700">Bus Name</label><input type="text" className="w-full rounded-md border border-gray-300 text-gray-800 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" defaultValue={editingBus.name} /></div>
                            <div className="mb-4"><label className="mb-1 block text-sm font-medium text-gray-700">Capacity</label><input type="number" className="w-full rounded-md border border-gray-300 text-gray-800 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" defaultValue={editingBus.capacity} /></div>
                            <div className="mb-4"><label className="mb-1 block text-sm font-medium text-gray-700">Route</label><input type="text" className="w-full rounded-md border border-gray-300 text-gray-800 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" defaultValue={editingBus.route} /></div>
                            <div className="mb-4"><label className="mb-1 block text-sm font-medium text-gray-700">Status</label><select className="w-full rounded-md border border-gray-300 text-gray-800 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" defaultValue={editingBus.status}><option>Active</option><option>Maintenance</option><option>Out of Service</option></select></div>
                            <div className="flex justify-end gap-3"><button type="button" className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setShowEditBusModal(false)}>Cancel</button><button type="button" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" onClick={() => setShowEditBusModal(false)}>Save Changes</button></div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}