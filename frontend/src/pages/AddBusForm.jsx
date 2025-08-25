import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import {
  Bus,
  MapPin,
  Clock,
  Hash,
  User,
  DollarSign,
  Type,
  Sofa,
  Wifi,
  Tv2,
  PlugZap,
  Popcorn,
  CalendarDays,
  PlusCircle,
} from "lucide-react";

const AddBusForm = () => {
  const navigate = useNavigate();
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

  const daysOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const seatTypeOptions = ["Seater", "Sleeper"];

  useEffect(() => {
    fetch(`${API_URL}/admin`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          navigate("/adminlogin");
        }
      })
      .catch((error) => {
        console.error("Error checking authorization:", error);
        navigate("/error");
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, value]
        : prev.amenities.filter((item) => item !== value),
    }));
  };

  const handleDaysChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      daysOfOperation: checked
        ? [...prev.daysOfOperation, value]
        : prev.daysOfOperation.filter((day) => day !== value),
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
      const res = await fetch(`${API_URL}/admin/add-bus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert("Bus added successfully");

      setFormData({
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
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center flex items-center justify-center gap-2">
        <Bus className="w-6 h-6 text-blue-600" /> Add New Bus
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* LEFT SIDE */}
        <div className="space-y-4">
          {/* Basic Inputs */}
          {[
            {
              icon: Type,
              label: "Bus Name",
              name: "name",
              type: "text",
              placeholder: "e.g. Express Deluxe",
            },
            { icon: MapPin, label: "From", name: "from", type: "text" },
            { icon: MapPin, label: "To", name: "to", type: "text" },
            {
              icon: Clock,
              label: "Departure Time",
              name: "time",
              type: "time",
              placeholder: "e.g. 02:00",
            },
            {
              icon: Sofa,
              label: "Seats",
              name: "seats",
              type: "number",
              placeholder: "e.g. 30",
            },
            {
              icon: DollarSign,
              label: "Price",
              name: "price",
              type: "number",
              placeholder: "e.g. 1000",
            },
            {
              icon: Hash,
              label: "Bus Number",
              name: "busNumber",
              type: "text",
              placeholder: "e.g. VBUS001",
            },
          ].map(({ label, name, type, icon: Icon, placeholder }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
              >
                <Icon className="w-4 h-4 text-blue-500" /> {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                value={formData[name]}
                placeholder={placeholder}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 transition"
              />
            </div>
          ))}

          {/* Duration */}
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
            >
              <Clock className="w-4 h-4 text-blue-500" /> Duration
            </label>
            <input
              type="text"
              name="duration"
              id="duration"
              placeholder="e.g. 6h 30m"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">
          {/* Seat Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <Sofa className="w-4 h-4 text-blue-500" /> Seat Type
            </label>
            <select
              name="seatType"
              value={formData.seatType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Seat Type</option>
              {seatTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <Wifi className="w-4 h-4 text-blue-500" /> Amenities
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "WiFi", icon: Wifi },
                { label: "AC", icon: Sofa },
                { label: "Charging Ports", icon: PlugZap },
                { label: "Entertainment", icon: Tv2 },
                { label: "Snacks", icon: Popcorn },
              ].map(({ label, icon: Icon }) => (
                <label
                  key={label}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <input
                    type="checkbox"
                    name="amenities"
                    value={label}
                    checked={formData.amenities.includes(label)}
                    onChange={handleAmenityChange}
                    className="accent-blue-500"
                  />
                  <Icon className="w-4 h-4" /> {label}
                </label>
              ))}
            </div>
          </div>

          {/* Days of Operation */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <CalendarDays className="w-4 h-4 text-blue-500" /> Days of
              Operation
            </label>
            <div className="grid grid-cols-2 gap-2">
              {daysOptions.map((day) => (
                <label
                  key={day}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <input
                    type="checkbox"
                    name="daysOfOperation"
                    value={day}
                    checked={formData.daysOfOperation.includes(day)}
                    onChange={handleDaysChange}
                    className="accent-blue-500"
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button - Full Width */}
        <div className="md:col-span-2 pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <PlusCircle className="w-5 h-5" /> Add Bus
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBusForm;
