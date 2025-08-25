// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import Sidebar from "./sidebar"
// import TopBar from "./top-bar"
// import HomePage from "./pages/home-page"
// import UsersPage from "./pages/users-page"
// import BusesPage from "./pages/buses-page"
// import BookingsPage from "./pages/bookings-page"
// import PaymentsPage from "./pages/payments-page"
// import PassengersPage from "./pages/passengers-page"

// export type PageType = "home" | "users" | "buses" | "bookings" | "payments" | "passengers"

// export default function AdminDashboard() {
//   const [currentPage, setCurrentPage] = useState<PageType>("home")
//   const [sidebarOpen, setSidebarOpen] = useState(true)

//   const renderPage = () => {
//     const pageVariants = {
//       initial: { opacity: 0, y: 20 },
//       animate: { opacity: 1, y: 0 },
//       exit: { opacity: 0, y: -20 },
//     }

//     const pageTransition = {
//       duration: 0.3,
//       ease: "easeInOut",
//     }

//     switch (currentPage) {
//       case "home":
//         return (
//           <motion.div
//             key="home"
//             variants={pageVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             transition={pageTransition}
//           >
//             <HomePage />
//           </motion.div>
//         )
//       case "users":
//         return (
//           <motion.div
//             key="users"
//             variants={pageVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             transition={pageTransition}
//           >
//             <UsersPage />
//           </motion.div>
//         )
//       case "buses":
//         return (
//           <motion.div
//             key="buses"
//             variants={pageVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             transition={pageTransition}
//           >
//             <BusesPage />
//           </motion.div>
//         )
//       case "bookings":
//         return (
//           <motion.div
//             key="bookings"
//             variants={pageVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             transition={pageTransition}
//           >
//             <BookingsPage />
//           </motion.div>
//         )
//       case "payments":
//         return (
//           <motion.div
//             key="payments"
//             variants={pageVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             transition={pageTransition}
//           >
//             <PaymentsPage />
//           </motion.div>
//         )
//       case "passengers":
//         return (
//           <motion.div
//             key="passengers"
//             variants={pageVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             transition={pageTransition}
//           >
//             <PassengersPage />
//           </motion.div>
//         )
//       default:
//         return <HomePage />
//     }
//   }

//   const getPageTitle = () => {
//     switch (currentPage) {
//       case "home":
//         return "Dashboard"
//       case "users":
//         return "Users Management"
//       case "buses":
//         return "Buses Management"
//       case "bookings":
//         return "Bookings Management"
//       case "payments":
//         return "Payments Management"
//       case "passengers":
//         return "Passengers Management"
//       default:
//         return "Dashboard"
//     }
//   }

//   return (
//     <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//       <Sidebar
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//         isOpen={sidebarOpen}
//         setIsOpen={setSidebarOpen}
//       />

//       <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"} lg:ml-64`}>
//         <TopBar title={getPageTitle()} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

//         <main className="flex-1 overflow-auto p-6">
//           <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>
//         </main>
//       </div>
//     </div>
//   )
// }

// pages/AdminDashboard.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/adminComp/Sidebar";
import TopBar from "../components/adminComp/Topbar.jsx";
import HomePage from "../components/adminComp/Home-page.jsx";
import UsersPage from "../components/adminComp/UserPage.jsxserPage";
import BusesPage from "../components/adminComp/Buses-page.jsx";
import BookingsPage from "../components/adminComp/Booking-page.jsx";
import PaymentsPage from "../components/adminComp/Payments-page.jsx";
import PassengersPage from "../components/adminComp/Passengers-page.jsx";

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    duration: 0.3,
    ease: "easeInOut",
  };

  const renderPage = () => {
    const pageMap = {
      home: <HomePage />,
      users: <UsersPage />,
      buses: <BusesPage />,
      bookings: <BookingsPage />,
      payments: <PaymentsPage />,
      passengers: <PassengersPage />,
    };

    const selectedPage = pageMap[currentPage] || <HomePage />;

    return (
      <motion.div
        key={currentPage}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        {selectedPage}
      </motion.div>
    );
  };

  const getPageTitle = () => {
    const titles = {
      home: "Dashboard",
      users: "Users Management",
      buses: "Buses Management",
      bookings: "Bookings Management",
      payments: "Payments Management",
      passengers: "Passengers Management",
    };
    return titles[currentPage] || "Dashboard";
  };

  return (
    <div className="flex h-screen bg-gray-50 transition-colors duration-300">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <TopBar
          title={getPageTitle()}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 overflow-auto p-6">
          <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>
        </main>
      </div>
    </div>
  );
}
