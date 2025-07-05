import { motion } from "framer-motion"
import { Eye, Trash2, Plus, Search, Filter, Calendar } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

const mockBookings = [
  {
    id: 1,
    bookingId: "BK001",
    passenger: "John Doe",
    route: "NYC → Boston",
    date: "2024-03-15",
    time: "09:00 AM",
    seats: 2,
    status: "Confirmed",
    amount: "$120",
  },
  {
    id: 2,
    bookingId: "BK002",
    passenger: "Jane Smith",
    route: "LA → SF",
    date: "2024-03-16",
    time: "02:30 PM",
    seats: 1,
    status: "Pending",
    amount: "$85",
  },
  {
    id: 3,
    bookingId: "BK003",
    passenger: "Mike Johnson",
    route: "Chicago → Detroit",
    date: "2024-03-17",
    time: "11:15 AM",
    seats: 3,
    status: "Confirmed",
    amount: "$180",
  },
  {
    id: 4,
    bookingId: "BK004",
    passenger: "Sarah Wilson",
    route: "Miami → Orlando",
    date: "2024-03-18",
    time: "04:45 PM",
    seats: 1,
    status: "Cancelled",
    amount: "$65",
  },
  {
    id: 5,
    bookingId: "BK005",
    passenger: "David Brown",
    route: "Seattle → Portland",
    date: "2024-03-19",
    time: "08:30 AM",
    seats: 2,
    status: "Confirmed",
    amount: "$140",
  },
]

export default function BookingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Bookings Management</h2>
          <p className="text-gray-600">Track and manage all booking reservations</p>
        </div>

        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Booking</span>
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="!p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search bookings..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings ({mockBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Passenger</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Seats</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBookings.map((booking, index) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">{booking.bookingId}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{booking.passenger}</TableCell>
                    <TableCell className="text-gray-600">{booking.route}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{booking.date}</div>
                        <div className="text-gray-500">{booking.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>{booking.seats}</TableCell>
                    <TableCell className="font-medium">{booking.amount}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-800 "
                            : booking.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800 "
                              : "bg-red-100 text-red-800 "
                        }`}
                      >
                        {booking.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
