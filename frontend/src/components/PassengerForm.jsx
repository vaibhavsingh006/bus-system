import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react'

const PassengerForm = ({ selectedSeats, onSubmit }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [passengers, setPassengers] = useState(
        selectedSeats.map(seat => ({
            name: '',
            age: '',
            gender: '',
            seatNumber: seat,
        }))
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updated = [...passengers];
        updated[currentIndex][name] = value;
        setPassengers(updated);
    };

    const handleNext = () => {
        if (
            !passengers[currentIndex].name ||
            !passengers[currentIndex].age ||
            !passengers[currentIndex].gender
        ) {
            alert("Please fill all details for this passenger.");
            return;
        }

        if (currentIndex < selectedSeats.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onSubmit(passengers); // Final submit before OTP
            setSubmitted(true)
        }
    };

    if (submitted) {
        return (
            <div className="max-w-md mx-auto bg-green-100 p-6 rounded-xl shadow-md flex items-center gap-4">
                <CheckCircle className="text-green-600 w-8 h-8" />
                <div>
                    <h2 className="text-lg font-semibold text-green-700">Passenger details submitted successfully!</h2>
                    <p className="text-sm text-green-600">Proceed to OTP verification or payment.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Passenger {currentIndex + 1} Details
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-gray-600 font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={passengers[currentIndex].name}
                        onChange={handleChange}
                        className="w-full text-gray-600 border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-600">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={passengers[currentIndex].age}
                        onChange={handleChange}
                        className="w-full border p-2 rounded text-gray-600"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-600">Gender</label>
                    <select
                        name="gender"
                        value={passengers[currentIndex].gender}
                        onChange={handleChange}
                        className="w-full border p-2 rounded text-gray-600"
                        required
                    >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-600 font-medium">Seat Number</label>
                    <input
                        type="text"
                        value={passengers[currentIndex].seatNumber}
                        disabled
                        className="w-full border p-2 text-gray-600 rounded bg-gray-100"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
                >
                    {currentIndex === selectedSeats.length - 1 ? 'Submit' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default PassengerForm;
