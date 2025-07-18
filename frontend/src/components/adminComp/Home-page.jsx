import { motion } from "framer-motion"
import { Users, Bus, Calendar, CreditCard, UserCheck, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const statsData = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Total Buses",
    value: "156",
    change: "+3.2%",
    trend: "up",
    icon: Bus,
    color: "bg-green-500",
  },
  {
    title: "Total Bookings",
    value: "8,924",
    change: "+18.7%",
    trend: "up",
    icon: Calendar,
    color: "bg-purple-500",
  },
  {
    title: "Total Payments",
    value: "$124,567",
    change: "-2.4%",
    trend: "down",
    icon: CreditCard,
    color: "bg-yellow-500",
  },
  {
    title: "Total Passengers",
    value: "15,632",
    change: "+8.9%",
    trend: "up",
    icon: UserCheck,
    color: "bg-red-500",
  },
]

export default function HomePage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-gray-800  mb-2">Dashboard Overview</h2>
        <p className="text-gray-600 ">
          Here's what's happening with your bus management system today.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 ">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800  mb-1">{stat.value}</div>
                  <div className="flex items-center space-x-1">
                    <TrendIcon className={`w-4 h-4 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`} />
                    <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ">from last month</span>
                  </div>
                </CardContent>

                {/* Decorative gradient */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 ${stat.color} opacity-10 rounded-full -mr-10 -mt-10`}
                />
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Recent Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "BK001", route: "NYC → Boston", passenger: "John Doe", time: "2 hours ago" },
                { id: "BK002", route: "LA → SF", passenger: "Jane Smith", time: "4 hours ago" },
                { id: "BK003", route: "Chicago → Detroit", passenger: "Mike Johnson", time: "6 hours ago" },
              ].map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 bg-gray-50  rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">{booking.route}</p>
                    <p className="text-sm text-gray-500 ">{booking.passenger}</p>
                  </div>
                  <span className="text-xs text-gray-400">{booking.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { service: "Booking System", status: "Online", color: "bg-green-500" },
                { service: "Payment Gateway", status: "Online", color: "bg-green-500" },
                { service: "GPS Tracking", status: "Maintenance", color: "bg-yellow-500" },
                { service: "Mobile App", status: "Online", color: "bg-green-500" },
              ].map((item) => (
                <div
                  key={item.service}
                  className="flex items-center justify-between p-3 bg-gray-50  rounded-lg"
                >
                  <span className="font-medium text-gray-800">{item.service}</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-sm text-gray-500 ">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
