import React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Bus, Users, CreditCard, Calendar, Search, Plus, Edit, Trash2, MoreHorizontal } from "lucide-react"
// import LoadingSpinner from "../components/loading-spinner"

// Mock data
const buses = [
  {
    id: "bus1",
    name: "Luxury Express",
    operator: "Premium Bus Co.",
    capacity: 36,
    type: "AC Sleeper",
    status: "Active",
  },
  {
    id: "bus2",
    name: "City Hopper",
    operator: "Urban Transit",
    capacity: 40,
    type: "AC Seater",
    status: "Active",
  },
  {
    id: "bus3",
    name: "Night Rider",
    operator: "Moonlight Travel",
    capacity: 36,
    type: "AC Sleeper",
    status: "Maintenance",
  },
  {
    id: "bus4",
    name: "Comfort Liner",
    operator: "Smooth Journey Inc.",
    capacity: 36,
    type: "AC Seater",
    status: "Active",
  },
  {
    id: "bus5",
    name: "Budget Express",
    operator: "Value Transit",
    capacity: 45,
    type: "Non-AC Seater",
    status: "Active",
  },
]

const routes = [
  {
    id: "route1",
    from: "New York",
    to: "Boston",
    distance: "215 miles",
    duration: "4h 30m",
    fare: 45,
    status: "Active",
  },
  {
    id: "route2",
    from: "New York",
    to: "Philadelphia",
    distance: "95 miles",
    duration: "2h 15m",
    fare: 35,
    status: "Active",
  },
  {
    id: "route3",
    from: "Boston",
    to: "New York",
    distance: "215 miles",
    duration: "4h 30m",
    fare: 45,
    status: "Active",
  },
  {
    id: "route4",
    from: "New York",
    to: "Washington DC",
    distance: "225 miles",
    duration: "4h 45m",
    fare: 55,
    status: "Active",
  },
  {
    id: "route5",
    from: "Philadelphia",
    to: "New York",
    distance: "95 miles",
    duration: "2h 15m",
    fare: 35,
    status: "Inactive",
  },
]

const bookings = [
  {
    id: "booking1",
    reference: "BUS123456",
    customer: "John Doe",
    route: "New York to Boston",
    date: "Mar 25, 2025",
    seats: 2,
    amount: 90,
    status: "Confirmed",
  },
  {
    id: "booking2",
    reference: "BUS789012",
    customer: "Jane Smith",
    route: "New York to Philadelphia",
    date: "Apr 10, 2025",
    seats: 1,
    amount: 35,
    status: "Confirmed",
  },
  {
    id: "booking3",
    reference: "BUS345678",
    customer: "Robert Johnson",
    route: "Boston to New York",
    date: "Feb 15, 2025",
    seats: 1,
    amount: 40,
    status: "Completed",
  },
  {
    id: "booking4",
    reference: "BUS901234",
    customer: "Emily Davis",
    route: "New York to Washington DC",
    date: "Jan 20, 2025",
    seats: 2,
    amount: 110,
    status: "Completed",
  },
  {
    id: "booking5",
    reference: "BUS567890",
    customer: "Michael Wilson",
    route: "Philadelphia to New York",
    date: "Dec 10, 2024",
    seats: 1,
    amount: 45,
    status: "Cancelled",
  },
]

export default function AdminPage() {
  const [showAddBusForm, setShowAddBusForm] = useState(false)
  const [showAddRouteForm, setShowAddRouteForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    // return <LoadingSpinner />
    return <h1>Loading...</h1>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white min-h-screen p-4 hidden md:block">
          <div className="text-xl font-bold mb-8">BusBooker Admin</div>

          <nav className="space-y-2">
            <a href="#dashboard" className="flex items-center gap-2 p-2 bg-gray-800 rounded">
              <Calendar className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
            <a href="#buses" className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
              <Bus className="h-5 w-5" />
              <span>Buses</span>
            </a>
            <a href="#routes" className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
              <Calendar className="h-5 w-5" />
              <span>Routes</span>
            </a>
            <a href="#bookings" className="flex">
              <span>Routes</span>
            </a>
            <a href="" className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
              <CreditCard className="h-5 w-5" />
              <span>Bookings</span>
            </a>
            <a href="#users" className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
              <Users className="h-5 w-5" />
              <span>Users</span>
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10 w-64" />
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
                <span className="font-medium">Admin User</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Bus className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Buses</p>
                  <p className="text-2xl font-bold">{buses.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Routes</p>
                  <p className="text-2xl font-bold">{routes.filter((route) => route.status === "Active").length}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{bookings.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">${bookings.reduce((sum, booking) => sum + booking.amount, 0)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="buses" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="buses">Buses</TabsTrigger>
              <TabsTrigger value="routes">Routes</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
            </TabsList>

            <TabsContent value="buses">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Manage Buses</CardTitle>
                    <CardDescription>Add, edit or remove buses from the system</CardDescription>
                  </div>

                  <Button onClick={() => setShowAddBusForm(!showAddBusForm)}>
                    {showAddBusForm ? (
                      "Cancel"
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" /> Add Bus
                      </>
                    )}
                  </Button>
                </CardHeader>

                <CardContent>
                  {showAddBusForm && (
                    <div className="border rounded-md p-4 mb-6">
                      <h3 className="text-lg font-medium mb-4">Add New Bus</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="busName">Bus Name</Label>
                          <Input id="busName" placeholder="Enter bus name" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="operator">Operator</Label>
                          <Input id="operator" placeholder="Enter operator name" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="capacity">Capacity</Label>
                          <Input id="capacity" type="number" placeholder="Enter seat capacity" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="type">Bus Type</Label>
                          <select id="type" className="w-full p-2 border rounded-md">
                            <option>AC Sleeper</option>
                            <option>AC Seater</option>
                            <option>Non-AC Sleeper</option>
                            <option>Non-AC Seater</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button>Add Bus</Button>
                      </div>
                    </div>
                  )}

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Bus Name</th>
                          <th className="text-left p-3">Operator</th>
                          <th className="text-left p-3">Capacity</th>
                          <th className="text-left p-3">Type</th>
                          <th className="text-left p-3">Status</th>
                          <th className="text-left p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {buses.map((bus) => (
                          <tr key={bus.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">{bus.name}</td>
                            <td className="p-3">{bus.operator}</td>
                            <td className="p-3">{bus.capacity}</td>
                            <td className="p-3">{bus.type}</td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${bus.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                                  }`}
                              >
                                {bus.status}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="routes">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Manage Routes</CardTitle>
                    <CardDescription>Add, edit or remove routes from the system</CardDescription>
                  </div>

                  <Button onClick={() => setShowAddRouteForm(!showAddRouteForm)}>
                    {showAddRouteForm ? (
                      "Cancel"
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" /> Add Route
                      </>
                    )}
                  </Button>
                </CardHeader>

                <CardContent>
                  {showAddRouteForm && (
                    <div className="border rounded-md p-4 mb-6">
                      <h3 className="text-lg font-medium mb-4">Add New Route</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="fromCity">From</Label>
                          <Input id="fromCity" placeholder="Enter departure city" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="toCity">To</Label>
                          <Input id="toCity" placeholder="Enter arrival city" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="distance">Distance (miles)</Label>
                          <Input id="distance" type="number" placeholder="Enter distance" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="duration">Duration</Label>
                          <Input id="duration" placeholder="e.g. 4h 30m" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="fare">Fare ($)</Label>
                          <Input id="fare" type="number" placeholder="Enter fare amount" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <select id="status" className="w-full p-2 border rounded-md">
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button>Add Route</Button>
                      </div>
                    </div>
                  )}

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">From</th>
                          <th className="text-left p-3">To</th>
                          <th className="text-left p-3">Distance</th>
                          <th className="text-left p-3">Duration</th>
                          <th className="text-left p-3">Fare</th>
                          <th className="text-left p-3">Status</th>
                          <th className="text-left p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {routes.map((route) => (
                          <tr key={route.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">{route.from}</td>
                            <td className="p-3">{route.to}</td>
                            <td className="p-3">{route.distance}</td>
                            <td className="p-3">{route.duration}</td>
                            <td className="p-3">${route.fare}</td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${route.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                  }`}
                              >
                                {route.status}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Bookings</CardTitle>
                  <CardDescription>View and manage all bookings in the system</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2">
                      <select className="border rounded-md p-2 text-sm">
                        <option>All Statuses</option>
                        <option>Confirmed</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select>

                      <Input type="date" className="w-40" />
                    </div>

                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search bookings..." className="pl-10 w-64" />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Reference</th>
                          <th className="text-left p-3">Customer</th>
                          <th className="text-left p-3">Route</th>
                          <th className="text-left p-3">Date</th>
                          <th className="text-left p-3">Seats</th>
                          <th className="text-left p-3">Amount</th>
                          <th className="text-left p-3">Status</th>
                          <th className="text-left p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking) => (
                          <tr key={booking.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">{booking.reference}</td>
                            <td className="p-3">{booking.customer}</td>
                            <td className="p-3">{booking.route}</td>
                            <td className="p-3">{booking.date}</td>
                            <td className="p-3">{booking.seats}</td>
                            <td className="p-3">${booking.amount}</td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${booking.status === "Confirmed"
                                  ? "bg-blue-100 text-blue-800"
                                  : booking.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                  }`}
                              >
                                {booking.status}
                              </span>
                            </td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-muted-foreground">
                      Showing 1-{bookings.length} of {bookings.length} bookings
                    </p>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" disabled>
                        Next
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div >
  )
}



// import { ArrowDown, ArrowUp, Bus, Calendar, DollarSign, Users } from "lucide-react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"; // Assuming your Card component is here
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"; // Assuming your Tabs component is here
// import { BookingOverview } from "./components/admin/booking-overview"; // Adjust path as needed
// import { RevenueChart } from "./components/admin/revenue-chart"; // Adjust path as needed
// import { RecentBookings } from "./components/admin/recent-bookings"; // Adjust path as needed
// import { TopRoutes } from "./components/admin/top-routes";


// import React from 'react'

// const AdminPanelPage = () => {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
//         <p className="text-muted-foreground">Overview of your bus booking system.</p>
//       </div>

//       {/* Overview Cards */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Total Buses</CardTitle>
//             <Bus className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">24</div>
//             <p className="flex items-center text-xs text-muted-foreground">
//               <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
//               <span className="text-green-500">+2</span> since last month
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
//             <Calendar className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">621</div>
//             <p className="flex items-center text-xs text-muted-foreground">
//               <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
//               <span className="text-green-500">+12%</span> from last week
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">1,352</div>
//             <p className="flex items-center text-xs text-muted-foreground">
//               <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
//               <span className="text-green-500">+5%</span> from last month
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$24,835</div>
//             <p className="flex items-center text-xs text-muted-foreground">
//               <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
//               <span className="text-red-500">-2%</span> from last month
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <Tabs defaultValue="overview" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="analytics">Analytics</TabsTrigger>
//           <TabsTrigger value="reports">Reports</TabsTrigger>
//         </TabsList>
//         <TabsContent value="overview" className="space-y-4">
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//             <Card className="lg:col-span-4">
//               <CardHeader>
//                 <CardTitle>Revenue Overview</CardTitle>
//                 <CardDescription>Monthly revenue for the current year</CardDescription>
//               </CardHeader>
//               <CardContent className="pl-2">
//                 <RevenueChart />
//               </CardContent>
//             </Card>
//             <Card className="lg:col-span-3">
//               <CardHeader>
//                 <CardTitle>Booking Overview</CardTitle>
//                 <CardDescription>Distribution of bookings by status</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <BookingOverview />
//               </CardContent>
//             </Card>
//           </div>
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//             <Card className="lg:col-span-4">
//               <CardHeader>
//                 <CardTitle>Recent Bookings</CardTitle>
//                 <CardDescription>Latest booking transactions</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <RecentBookings />
//               </CardContent>
//             </Card>
//             <Card className="lg:col-span-3">
//               <CardHeader>
//                 <CardTitle>Top Routes</CardTitle>
//                 <CardDescription>Most popular bus routes</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <TopRoutes />
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>
//         <TabsContent value="analytics" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Advanced Analytics</CardTitle>
//               <CardDescription>Detailed analytics and insights</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-[400px] flex items-center justify-center border rounded-md">
//                 <p className="text-muted-foreground">Advanced analytics content would go here</p>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//         <TabsContent value="reports" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Reports</CardTitle>
//               <CardDescription>Generate and download reports</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-[400px] flex items-center justify-center border rounded-md">
//                 <p className="text-muted-foreground">Reports content would go here</p>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// export default AdminPanelPage