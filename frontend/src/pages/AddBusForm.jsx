import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

const AddBusForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        from: "",
        to: "",
        date: "",
        time: "",
        seats: "",
        price: "",
        amenities: []
    });

    useEffect(() => {
        fetch(`${API_URL}/admin`, {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
        })
            .then((response) => {
                console.log(response)
                if (response.status === 401 || response.status === 403) {
                    // Redirect to login or unauthorized page if not allowed
                    navigate('/adminlogin'); // Redirect to login page
                }
            })
            .catch((error) => {
                console.error('Error checking authorization:', error);
                navigate('/error'); // Redirect in case of fetch errors
            });
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAmenityChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            if (checked) {
                return {
                    ...prev,
                    amenities: [...prev.amenities, value],
                };
            } else {
                return {
                    ...prev,
                    amenities: prev.amenities.filter((item) => item !== value),
                };
            }
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            seats: parseInt(formData.seats),
            availableSeats: parseInt(formData.seats),
            price: parseFloat(formData.price),
        };

        try {
            const res = await fetch(`${API_URL}/admin/add-bus`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
                credentials: 'include',

            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            alert("Bus added successfully");
            console.log(payload);
            setFormData({
                name: "",
                from: "",
                to: "",
                date: "",
                time: "",
                seats: "",
                price: "",
                amenities: []
            });

        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-10">
            <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">Add New Bus</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {["name", "from", "to", "time", "seats", "price", "date"].map(field => (
                    <div key={field}>
                        <label className="block mb-1 text-gray-700 capitalize font-medium" htmlFor={field}>
                            {field === "name" ? "Bus Name" : field}
                        </label>
                        <input
                            type={field === "seats" || field === "price" ? "number" : field === "date" ? "date" : field === "time" ? "time" : "text"}
                            name={field}
                            id={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded text-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                ))}
                <div className="-mx-3 mb-6">
                    <label className="block mb-1 text-gray-700 font-medium">Amenities:</label>
                    {["WiFi", "AC", "Charging Ports", "Entertainment", "Snacks"].map((item) => (
                        <label key={item} className="block text-gray-600">
                            <input
                                type="checkbox"
                                name="amenities"
                                value={item}
                                checked={formData.amenities.includes(item)}
                                onChange={handleAmenityChange}
                                className="mr-2"
                            />
                            {item}
                        </label>
                    ))}
                </div>


                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Add Bus
                </button>
            </form>
        </div>
    );
};

export default AddBusForm;
