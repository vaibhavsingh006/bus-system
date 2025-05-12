// src/components/CustomersView.js
import React from 'react';
// Note: Icons are passed via the 'stats' prop, so no direct lucide-react import needed here for Users icon

const CustomersView = ({ stats }) => {
    const totalUsersStat = stats.find(s => s.title === "Total Users");

    return (
        <div className="rounded-lg bg-white p-6 shadow-sm">
            {totalUsersStat && (
                <div className="mb-6 max-w-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">{totalUsersStat.title}</p>
                            <p className="mt-1 text-3xl font-bold text-gray-800">{totalUsersStat.value}</p>
                        </div>
                        <div className={`rounded-full ${totalUsersStat.color} p-3 text-white`}>
                            <totalUsersStat.icon size={24} />
                        </div>
                    </div>
                </div>
            )}
            <p className="text-gray-600">Detailed customer information and management tools will be available here in a future update.</p>
            {/* You could map over recentBookings to list unique customers or add more detailed customer data structures later */}
        </div>
    );
};

export default CustomersView;