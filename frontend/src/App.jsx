import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import "./index.css"
import AdminPage from './pages/AdminPanelPage';
import UserDashboardPage from './pages/UserDashboardPage';
import PaymentPage from './pages/PaymentPage';
import BookingSummaryPage from './pages/BookingSummaryPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import SearchResultsPage from './pages/SearchResultsPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AddBusForm from './pages/AddBusForm';
import UpdateBus from './pages/UpdateBus';
import Userdd from './pages/User';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/search-results" element={<SearchResultsPage />} />
        <Route path="/seat-selection/:busId" element={<SeatSelectionPage />} />
        <Route path="/booking-summary" element={<BookingSummaryPage />} />
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/dashboard" element={<UserDashboardPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/adminlogin" element={<AdminLoginPage />} />
        <Route path="/addbus" element={<AddBusForm />} />
        <Route path="/updatebus/:id" element={<UpdateBus />} />
        <Route path="/user" element={<Userdd />} />
      </Routes>
    </Router>
  )
}

export default App

