// import { motion } from "framer-motion"
// import { Eye, Trash2, Plus, Search, Filter, MapPin } from "lucide-react"
// import { Button } from "../ui/button"
// import { Input } from "../ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

// const mockBuses = [
//   {
//     id: 1,
//     number: "BUS001",
//     route: "NYC → Boston",
//     capacity: 45,
//     status: "Active",
//     driver: "John Smith",
//     lastMaintenance: "2024-01-15",
//   },
//   {
//     id: 2,
//     number: "BUS002",
//     route: "LA → SF",
//     capacity: 50,
//     status: "Active",
//     driver: "Mike Johnson",
//     lastMaintenance: "2024-01-20",
//   },
//   {
//     id: 3,
//     number: "BUS003",
//     route: "Chicago → Detroit",
//     capacity: 40,
//     status: "Maintenance",
//     driver: "Sarah Wilson",
//     lastMaintenance: "2024-02-01",
//   },
//   {
//     id: 4,
//     number: "BUS004",
//     route: "Miami → Orlando",
//     capacity: 48,
//     status: "Active",
//     driver: "David Brown",
//     lastMaintenance: "2024-02-10",
//   },
//   {
//     id: 5,
//     number: "BUS005",
//     route: "Seattle → Portland",
//     capacity: 42,
//     status: "Inactive",
//     driver: "Lisa Davis",
//     lastMaintenance: "2024-02-15",
//   },
// ]

// export default function BusesPage() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-6"
//     >
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-800 ">Buses Management</h2>
//           <p className="text-gray-600">Monitor and manage your bus fleet</p>
//         </div>

//         <Button className="flex items-center space-x-2">
//           <Plus className="w-4 h-4" />
//           <span>Add New Bus</span>
//         </Button>
//       </div>

//       {/* Search and Filter Bar */}
//       <Card>
//         <CardContent className="!p-6">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <Input placeholder="Search buses..." className="pl-10" />
//             </div>
//             <Button variant="outline" className="flex items-center space-x-2">
//               <Filter className="w-4 h-4" />
//               <span>Filter</span>
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Buses Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>All Buses ({mockBuses.length})</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>#</TableHead>
//                   <TableHead>Bus Number</TableHead>
//                   <TableHead>Route</TableHead>
//                   <TableHead>Capacity</TableHead>
//                   <TableHead>Driver</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Last Maintenance</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {mockBuses.map((bus, index) => (
//                   <motion.tr
//                     key={bus.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.3, delay: index * 0.1 }}
//                     className="hover:bg-gray-50  transition-colors"
//                   >
//                     <TableCell className="font-medium">{bus.id}</TableCell>
//                     <TableCell>
//                       <div className="flex items-center space-x-2">
//                         <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
//                           <MapPin className="w-4 h-4 text-white" />
//                         </div>
//                         <span className="font-medium">{bus.number}</span>
//                       </div>
//                     </TableCell>
//                     <TableCell className="text-gray-600 ">{bus.route}</TableCell>
//                     <TableCell>{bus.capacity} seats</TableCell>
//                     <TableCell className="text-gray-600 ">{bus.driver}</TableCell>
//                     <TableCell>
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           bus.status === "Active"
//                             ? "bg-green-100 text-green-800 "
//                             : bus.status === "Maintenance"
//                               ? "bg-yellow-100 text-yellow-800 "
//                               : "bg-gray-100 text-gray-800 "
//                         }`}
//                       >
//                         {bus.status}
//                       </span>
//                     </TableCell>
//                     <TableCell className="text-gray-600 ">{bus.lastMaintenance}</TableCell>
//                     <TableCell>
//                       <div className="flex items-center space-x-2">
//                         <Button variant="ghost" size="sm">
//                           <Eye className="w-4 h-4" />
//                         </Button>
//                         <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </motion.tr>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Trash2, Plus, Search, Filter, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const API_URL = import.meta.env.VITE_API_URL;

export default function BusesPage() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/allbus`, {
          credentials: "include",
        });
        const data = await res.json();
        setBuses(data);
      } catch (err) {
        console.error("Error fetching buses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Buses Management</h2>
          <p className="text-gray-600">Monitor and manage your bus fleet</p>
        </div>

        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add New Bus</span>
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="!p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search buses..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Buses Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Buses ({buses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {loading ? (
              <p className="text-gray-500 text-sm">Loading buses...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Bus Name</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Seats</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Last Maintenance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buses.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center text-gray-500"
                      >
                        No buses found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    buses.map((bus, index) => (
                      <motion.tr
                        key={bus._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                              <MapPin className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium">
                              {bus.name || "N/A"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {bus.from} → {bus.to}
                        </TableCell>
                        <TableCell>
                          {bus.seats} seats ({bus.availableSeats} available)
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              bus.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : bus.status === "Maintenance"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {bus.status || "Active"}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {bus.driver || "Unassigned"}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {bus.lastMaintenance
                            ? new Date(bus.lastMaintenance).toLocaleDateString()
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
