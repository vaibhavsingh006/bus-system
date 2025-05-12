// src/components/RevenueView.js
import React from 'react';

const RevenueView = ({ range, setRange, totalRevenue, maxRevenue, filteredData }) => {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-md lg:col-span-2">
            <div className="mb-4 flex items-center justify-between text-gray-600">
                <h3 className="text-xl font-bold text-gray-800">Revenue Overview</h3>
                <select
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                    className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="6">Last 6 months</option>
                    <option value="12">Last 12 months</option>
                    <option value="all">This year</option>
                </select>
            </div>
            <div className="mb-4">
                <p className="text-3xl font-bold text-gray-800">${totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Total Revenue</p>
            </div>
            <div className="mt-6 flex h-60 items-end justify-between space-x-2">
                {filteredData.map((item, index) => {
                    const height = maxRevenue > 0 ? (item.amount / maxRevenue) * 180 : 0;
                    return (
                        <div key={index} className="relative group flex flex-col items-center">
                            <div className="absolute bottom-full mb-2 hidden w-20 rounded-md bg-gray-800 px-2 py-1 text-center text-xs text-white group-hover:block">
                                ${item.amount.toLocaleString()}
                            </div>
                            <div
                                className="w-10 rounded-t-md bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-300 hover:from-blue-600"
                                style={{ height: `${height}px` }}
                            ></div>
                            <p className="mt-2 text-xs font-medium text-gray-500">{item.month}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RevenueView;