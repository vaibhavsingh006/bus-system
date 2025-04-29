// components/BusForm.jsx
import React from "react";

const BusForm = ({ formData, handleChange, handleAmenityChange, handleSubmit, buttonText }) => {
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-10">
            <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">{buttonText} Bus</h2>
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
                    {buttonText} Bus
                </button>
            </form>
        </div>
    );
};

export default BusForm;
