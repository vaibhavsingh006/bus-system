// src/components/BookingsView.js
import React from 'react';

const BookingsView = ({ recentBookings, activeTab, setActiveTab }) => {
    return (
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Recent Bookings</h3>
                {/* Show "View All" button only i,skaklsalkf this component is rendered on the main dashboard tab */}
                {activeTab === "dashboard" && (
                    <button
                        onClick={() => setActiveTab("bookings")}
                        className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
                    >
                        View All
                    </button>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Booking ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Customer</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Route</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Seats</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {recentBookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">{booking.id}</td>
                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">{booking.customer}</td>
                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">{booking.route}</td>
                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">{booking.date}</td>
                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">{booking.seats}</td>
                                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">${booking.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingsView;