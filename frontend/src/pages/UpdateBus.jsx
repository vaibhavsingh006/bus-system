// pages/UpdateBus.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import BusForm from "../components/BusForm";
import {
    Bus, MapPin, Clock, Hash, Sofa, DollarSign, Type, Wifi, Tv2, PlugZap, Popcorn, CalendarDays, Pencil
} from "lucide-react";


const API_URL = import.meta.env.VITE_API_URL;

const UpdateBus = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Bus ID from URL
    const [formData, setFormData] = useState({
        name: "",
        from: "",
        to: "",
        time: "",
        seats: "",
        price: "",
        amenities: [],
        busNumber: "",
        daysOfOperation: [],
        seatType: "",
        duration: "",
    });

    const daysOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const seatTypeOptions = ["Seater", "Sleeper"];

    useEffect(() => {
        fetch(`${API_URL}/admin`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => {
                if (response.status === 401 || response.status === 403) {
                    navigate('/adminlogin');
                }
            })
            .catch(error => {
                console.error('Error checking authorization:', error);
                navigate('/error');
            });
    }, [navigate]);

    // useEffect(() => {
    //     // Fetch existing bus data
    //     const fetchBus = async () => {
    //         try {
    //             const res = await fetch(`${API_URL}/admin/get-bus/${id}`, {
    //                 method: "GET",
    //                 credentials: 'include',
    //             });
    //             const data = await res.json();
    //             if (res.ok) {
    //                 setFormData({
    //                     ...data.bus,
    //                     seats: data.bus.seats.toString(),
    //                     price: data.bus.price.toString(),
    //                 });
    //             } else {
    //                 throw new Error(data.message || "Failed to fetch bus details");
    //             }
    //         } catch (err) {
    //             console.error(err.message);
    //             alert("Failed to load bus details");
    //         }
    //     };

    //     if (id) {
    //         fetchBus();
    //     }
    // }, [id]);
    useEffect(() => {
        // Fetch existing bus data
        const fetchBus = async () => {
            try {
                const res = await fetch(`${API_URL}/admin/get-bus/${id}`, {
                    method: "GET",
                    credentials: 'include',
                });
                const data = await res.json();
                if (res.ok) {
                    setFormData({
                        name: data.bus.name ?? "", // fallback to empty string if undefined
                        from: data.bus.from ?? "", // fallback to empty string if undefined
                        to: data.bus.to ?? "", // fallback to empty string if undefined
                        time: data.bus.time ?? "", // fallback to empty string if undefined
                        seats: data.bus.seats?.toString() ?? "0", // fallback to "0" if undefined or null
                        price: data.bus.price?.toString() ?? "0", // fallback to "0" if undefined or null
                        amenities: data.bus.amenities ?? [], // fallback to empty array if undefined
                        busNumber: data.bus.busNumber ?? "", // fallback to empty string if undefined
                        daysOfOperation: data.bus.daysOfOperation ?? [], // fallback to empty array if undefined
                        seatType: data.bus.seatType ?? "", // fallback to empty string if undefined
                        duration: data.bus.duration ?? "", // fallback to empty string if undefined
                    });
                } else {
                    throw new Error(data.message || "Failed to fetch bus details");
                }
            } catch (err) {
                console.error(err.message);
                alert("Failed to load bus details");
            }
        };

        if (id) {
            fetchBus();
        }
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAmenityChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            amenities: checked
                ? [...prev.amenities, value]
                : prev.amenities.filter(item => item !== value),
        }));
    };

    const handleDaysChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            daysOfOperation: checked
                ? [...prev.daysOfOperation, value]
                : prev.daysOfOperation.filter(day => day !== value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            seats: parseInt(formData.seats),
            price: parseFloat(formData.price),
        };

        try {
            const res = await fetch(`${API_URL}/admin/update-bus/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
                credentials: 'include',
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong while updating");
            }

            alert("Bus updated successfully");
            navigate('/admin/dashboard'); // Navigate after successful update (change path as needed)

        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };


    return (


        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center flex items-center justify-center gap-2">
                <Pencil className="w-5 h-5 text-green-600" /> Edit Bus
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Core Fields */}
                {[
                    { icon: Type, label: "Bus Name", name: "name", placeholder: "Enter bus name", type: "text" },
                    { icon: MapPin, label: "From", name: "from", placeholder: "Starting location", type: "text" },
                    { icon: MapPin, label: "To", name: "to", placeholder: "Destination", type: "text" },
                    { icon: Clock, label: "Departure Time", name: "time", placeholder: "", type: "time" },
                    { icon: Sofa, label: "Seats", name: "seats", placeholder: "Total seats", type: "number" },
                    { icon: DollarSign, label: "Price", name: "price", placeholder: "Ticket price", type: "number" },
                    { icon: Hash, label: "Bus Number", name: "busNumber", placeholder: "e.g. UP14AB1234", type: "text" },
                ].map(({ icon: Icon, label, name, type, placeholder }) => (
                    <div key={name}>
                        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                            <Icon className="w-4 h-4 text-green-500" /> {label}
                        </label>
                        <input
                            type={type}
                            name={name}
                            id={name}
                            value={formData[name]}
                            onChange={handleChange}
                            placeholder={placeholder}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-700"
                        />
                    </div>
                ))}

                {/* Seat Type */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                        <Sofa className="w-4 h-4 text-green-500" /> Seat Type
                    </label>
                    <select
                        name="seatType"
                        value={formData.seatType}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    >
                        <option value="">Select Seat Type</option>
                        {seatTypeOptions.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                {/* Duration */}
                <div>
                    <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                        <Clock className="w-4 h-4 text-green-500" /> Duration
                    </label>
                    <input
                        type="text"
                        name="duration"
                        id="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="e.g. 6h 30m"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-700"
                    />
                </div>

                {/* Amenities */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                        <Wifi className="w-4 h-4 text-green-500" /> Amenities
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {[
                            { label: "WiFi", icon: Wifi },
                            { label: "AC", icon: Sofa },
                            { label: "Charging Ports", icon: PlugZap },
                            { label: "Entertainment", icon: Tv2 },
                            { label: "Snacks", icon: Popcorn },
                        ].map(({ label, icon: Icon }) => (
                            <label key={label} className="flex items-center gap-2 text-gray-600">
                                <input
                                    type="checkbox"
                                    name="amenities"
                                    value={label}
                                    checked={formData.amenities.includes(label)}
                                    onChange={handleAmenityChange}
                                    className="accent-green-500"
                                />
                                <Icon className="w-4 h-4" /> {label}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Days of Operation */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                        <CalendarDays className="w-4 h-4 text-green-500" /> Days of Operation
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {daysOptions.map(day => (
                            <label key={day} className="flex items-center gap-2 text-gray-600">
                                <input
                                    type="checkbox"
                                    name="daysOfOperation"
                                    value={day}
                                    checked={formData.daysOfOperation.includes(day)}
                                    onChange={handleDaysChange}
                                    className="accent-green-500"
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <div className="md:col-span-2 pt-4">
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-green-700 transition"
                    >
                        <Pencil className="w-5 h-5" /> Update Bus
                    </button>
                </div>
            </form>
        </div>

    );
};

export default UpdateBus;
