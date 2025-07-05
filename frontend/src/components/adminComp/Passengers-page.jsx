import { motion } from "framer-motion"
import { Eye, Trash2, Plus, Search, Filter, UserCheck } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

const mockPassengers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1-555-0123",
    totalTrips: 15,
    lastTrip: "2024-03-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1-555-0124",
    totalTrips: 8,
    lastTrip: "2024-03-16",
    status: "Active",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1-555-0125",
    totalTrips: 22,
    lastTrip: "2024-03-17",
    status: "VIP",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+1-555-0126",
    totalTrips: 3,
    lastTrip: "2024-03-18",
    status: "New",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@example.com",
    phone: "+1-555-0127",
    totalTrips: 12,
    lastTrip: "2024-03-19",
    status: "Active",
  },
]

export default function PassengersPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 ">Passengers Management</h2>
          <p className="text-gray-600 ">Manage passenger profiles and travel history</p>
        </div>

        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Passenger</span>
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="!p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search passengers..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Passengers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Passengers ({mockPassengers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Total Trips</TableHead>
                  <TableHead>Last Trip</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPassengers.map((passenger, index) => (
                  <motion.tr
                    key={passenger.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium">{passenger.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                          <UserCheck className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">{passenger.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="text-gray-600 ">{passenger.email}</div>
                        <div className="text-gray-500 ">{passenger.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-blue-600">{passenger.totalTrips}</span>
                    </TableCell>
                    <TableCell className="text-gray-600 ">{passenger.lastTrip}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          passenger.status === "VIP"
                            ? "bg-purple-100 text-purple-800 "
                            : passenger.status === "Active"
                              ? "bg-green-100 text-green-800 "
                              : "bg-blue-100 text-blue-800 "
                        }`}
                      >
                        {passenger.status}
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
