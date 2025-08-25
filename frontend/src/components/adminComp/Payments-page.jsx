// import { motion } from "framer-motion"
// import { Eye, Trash2, Plus, Search, Filter, CreditCard } from "lucide-react"
// import { Button } from "../ui/button"
// import { Input } from "../ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

// const mockPayments = [
//   {
//     id: 1,
//     transactionId: "TXN001",
//     customer: "John Doe",
//     bookingId: "BK001",
//     amount: "$120",
//     method: "Credit Card",
//     date: "2024-03-15",
//     status: "Completed",
//   },
//   {
//     id: 2,
//     transactionId: "TXN002",
//     customer: "Jane Smith",
//     bookingId: "BK002",
//     amount: "$85",
//     method: "PayPal",
//     date: "2024-03-16",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     transactionId: "TXN003",
//     customer: "Mike Johnson",
//     bookingId: "BK003",
//     amount: "$180",
//     method: "Debit Card",
//     date: "2024-03-17",
//     status: "Completed",
//   },
//   {
//     id: 4,
//     transactionId: "TXN004",
//     customer: "Sarah Wilson",
//     bookingId: "BK004",
//     amount: "$65",
//     method: "Credit Card",
//     date: "2024-03-18",
//     status: "Failed",
//   },
//   {
//     id: 5,
//     transactionId: "TXN005",
//     customer: "David Brown",
//     bookingId: "BK005",
//     amount: "$140",
//     method: "Bank Transfer",
//     date: "2024-03-19",
//     status: "Completed",
//   },
// ]

// export default function PaymentsPage() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-6"
//     >
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-800 ">Payments Management</h2>
//           <p className="text-gray-600">Monitor and track all payment transactions</p>
//         </div>

//         <Button className="flex items-center space-x-2">
//           <Plus className="w-4 h-4" />
//           <span>Process Payment</span>
//         </Button>
//       </div>

//       {/* Search and Filter Bar */}
//       <Card>
//         <CardContent className="!p-6">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <Input placeholder="Search payments..." className="pl-10" />
//             </div>
//             <Button variant="outline" className="flex items-center space-x-2">
//               <Filter className="w-4 h-4" />
//               <span>Filter</span>
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Payments Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>All Payments ({mockPayments.length})</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>#</TableHead>
//                   <TableHead>Transaction ID</TableHead>
//                   <TableHead>Customer</TableHead>
//                   <TableHead>Booking ID</TableHead>
//                   <TableHead>Amount</TableHead>
//                   <TableHead>Method</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {mockPayments.map((payment, index) => (
//                   <motion.tr
//                     key={payment.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.3, delay: index * 0.1 }}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     <TableCell className="font-medium">{payment.id}</TableCell>
//                     <TableCell>
//                       <div className="flex items-center space-x-2">
//                         <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
//                           <CreditCard className="w-4 h-4 text-white" />
//                         </div>
//                         <span className="font-medium">{payment.transactionId}</span>
//                       </div>
//                     </TableCell>
//                     <TableCell className="text-gray-600">{payment.customer}</TableCell>
//                     <TableCell className="text-gray-600">{payment.bookingId}</TableCell>
//                     <TableCell className="font-medium text-green-600">{payment.amount}</TableCell>
//                     <TableCell>
//                       <span className="px-2 py-1 bg-gray-100  rounded-full text-xs font-medium">
//                         {payment.method}
//                       </span>
//                     </TableCell>
//                     <TableCell className="text-gray-600">{payment.date}</TableCell>
//                     <TableCell>
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           payment.status === "Completed"
//                             ? "bg-green-100 text-green-800 "
//                             : payment.status === "Pending"
//                               ? "bg-yellow-100 text-yellow-800 "
//                               : "bg-red-100 text-red-800 "
//                         }`}
//                       >
//                         {payment.status}
//                       </span>
//                     </TableCell>
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
import { Eye, Trash2, Plus, Search, Filter, CreditCard } from "lucide-react";
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

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/allpayment`, {
          credentials: "include",
        });
        const data = await res.json();
        setPayments(data);
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };

    fetchPayments();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Payments Management
          </h2>
          <p className="text-gray-600">
            Monitor and track all payment transactions
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Process Payment</span>
        </Button>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardContent className="!p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search payments..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Payments ({payments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Booking</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment, index) => (
                  <motion.tr
                    key={payment._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">
                          {payment.transactionId}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {payment?.user?.name || "N/A"}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {payment?.booking
                        ? `${payment.booking.from} → ${payment.booking.to}`
                        : "N/A"}
                    </TableCell>
                    <TableCell className="font-medium text-green-600">
                      ₹{payment.amount}
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                        {payment.method}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          payment.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {payment.status}
                      </span>
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
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
