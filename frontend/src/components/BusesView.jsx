// src/components/BusesView.js
import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const BusesView = ({ buses, handleEditBus, setShowAddBusModal }) => {
    return (
        <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Manage Buses</h3>
                <button
                    className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    onClick={() => setShowAddBusModal(true)}
                >
                    <Plus size={16} />
                    Add New Bus
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Bus ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Capacity</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Route</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {buses.map((bus) => (
                            <tr key={bus.id} className="hover:bg-gray-50">
                                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">{bus.id}</td>
                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">{bus.name}</td>
                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">{bus.capacity} seats</td>
                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">{bus.route}</td>
                                <td className="whitespace-nowrap px-4 py-3 text-sm">
                                    <span
                                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${bus.status === "Active" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}
                                    >
                                        {bus.status}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-sm">
                                    <div className="flex gap-2">
                                        <button
                                            className="rounded p-1 text-blue-600 hover:bg-blue-50"
                                            onClick={() => handleEditBus(bus)}
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button className="rounded p-1 text-red-600 hover:bg-red-50"> {/* Add delete logic here */}
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BusesView;