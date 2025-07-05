// components/Sidebar.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  Bus,
  Calendar,
  CreditCard,
  UserCheck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const navigationItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "users", label: "Users", icon: Users },
  { id: "buses", label: "Buses", icon: Bus },
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "passengers", label: "Passengers", icon: UserCheck }
];

export default function Sidebar({ currentPage, setCurrentPage, isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#0000005c] z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: isOpen ? 256 : 64, x: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-30 shadow-lg"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <motion.div
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Bus className="w-5 h-5 text-white" />
              </div>
              {isOpen && <span className="text-xl font-bold text-gray-800 ">BusAdmin</span>}
            </motion.div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-1 rounded-lg relative ${isOpen ? '': '-left-[30px]'} hover:bg-gray-100 transition-colors`}
            >
              {isOpen ? (
                <ChevronLeft className="w-5 h-5 text-gray-600 " />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-600 " />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center ${isOpen ? '':'!p-1.5'} space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-600  hover:bg-gray-100  hover:text-gray-800  "
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <motion.span
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`font-medium ${!isOpen && "sr-only"}`}
                  >
                    {item.label}
                  </motion.span>
                </motion.button>
              );
            })}
          </nav>
        </div>
      </motion.div>
    </>
  );
}
