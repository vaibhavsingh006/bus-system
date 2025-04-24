import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;

const SearchForm = () => {
    const navigate = useNavigate();

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [routes, setRoutes] = useState([]);
    const [fromSuggestions, setFromSuggestions] = useState([]);
    const [toSuggestions, setToSuggestions] = useState([]);
    const [showFromSuggestions, setShowFromSuggestions] = useState(false);
    const [showToSuggestions, setShowToSuggestions] = useState(false);
    const [fromActiveIndex, setFromActiveIndex] = useState(-1);
    const [toActiveIndex, setToActiveIndex] = useState(-1);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await fetch(`${API_URL}/search/buses`);
                const data = await response.json();
                setRoutes(data);

            } catch (err) {
                console.error("Error fetching routes", err);
            }
        };
        fetchRoutes();
    }, []);

    const uniqueFrom = [...new Set(routes.map(route => route.from))];
    const uniqueTo = [...new Set(routes.map(route => route.to))];

    const handleFromChange = (value) => {
        setFrom(value);

        const filtered = uniqueFrom.filter(item =>
            item.toLowerCase().includes(value.toLowerCase())
        );
        setFromSuggestions(filtered);
        setShowFromSuggestions(true);
        setFromActiveIndex(-1);
    };
    const handleToChange = (value) => {
        setTo(value);
        const filtered = uniqueTo.filter(item =>
            item.toLowerCase().includes(value.toLowerCase())
        );
        setToSuggestions(filtered);
        setShowToSuggestions(true);
        setFromActiveIndex(-1);
    };

    // keys
    const handleFromKeyDown = (e) => {
        if (!showFromSuggestions || fromSuggestions.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();

            setFromActiveIndex((prev) =>
                prev < fromSuggestions.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setFromActiveIndex((prev) =>
                prev > 0 ? prev - 1 : fromSuggestions.length - 1
            );
        } else if (e.key === "Enter") {
            if (fromActiveIndex >= 0) {
                setFrom(fromSuggestions[fromActiveIndex]);
                setShowFromSuggestions(false);
                setFromActiveIndex(-1);
                e.preventDefault();
            }
        }
    };
    const handleToKeyDown = (e) => {
        if (!showToSuggestions || toSuggestions.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();

            setToActiveIndex((prev) =>
                prev < toSuggestions.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setToActiveIndex((prev) =>
                prev > 0 ? prev - 1 : toSuggestions.length - 1
            );
        } else if (e.key === "Enter") {
            if (toActiveIndex >= 0) {
                setTo(toSuggestions[toActiveIndex]);
                setShowToSuggestions(false);
                setToActiveIndex(-1);
                e.preventDefault();
            }
        }
    };

    // keys

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!uniqueFrom.includes(from) || !uniqueTo.includes(to)) {
            alert("Please select valid From and To options from suggestions.");
            return;
        }
        navigate("/search-results", {
            state: { from, to, date },
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* FROM Field */}
                    <div className="relative">
                        <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">From</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="from"
                                value={from}
                                onKeyDown={(e) => handleFromKeyDown(e)}
                                onChange={(e) => handleFromChange(e.target.value)}
                                onBlur={() => setTimeout(() => setShowFromSuggestions(false), 100)}
                                onFocus={() => {
                                    const filtered = uniqueFrom.filter(item =>
                                        item.toLowerCase().includes(from.toLowerCase())
                                    );
                                    setFromSuggestions(filtered);
                                    setShowFromSuggestions(true);
                                }}
                                autoComplete="off"
                                className="block w-full pl-10 pr-3 py-2 border text-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="City or town"
                                required
                            />
                            {showFromSuggestions && fromSuggestions.length > 0 && (
                                <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-md shadow-lg max-h-48 overflow-y-auto">
                                    {fromSuggestions.map((suggestion, idx) => (
                                        <li
                                            key={idx}
                                            onMouseDown={() => {
                                                setFrom(suggestion);
                                                setShowFromSuggestions(false);
                                            }}
                                            className={`px-4 py-2 text-gray-600 cursor-pointer ${fromActiveIndex === idx ? "bg-blue-100 font-medium" : "hover:bg-gray-200"
                                                }`}
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* TO Field */}
                    <div className="relative">
                        <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">To</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="to"
                                value={to}
                                onKeyDown={(e) => handleToKeyDown(e)}
                                onChange={(e) => handleToChange(e.target.value)}
                                onBlur={() => setTimeout(() => setShowToSuggestions(false), 100)}
                                onFocus={() => {
                                    const filtered = uniqueTo.filter(item =>
                                        item.toLowerCase().includes(to.toLowerCase())
                                    );
                                    setToSuggestions(filtered);
                                    setShowToSuggestions(true);
                                }}
                                autoComplete="off"
                                className="block w-full pl-10 pr-3 py-2 border text-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="City or town"

                                required
                            />
                            {showToSuggestions && toSuggestions.length > 0 && (
                                <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-md shadow-lg max-h-48 overflow-y-auto">
                                    {toSuggestions.map((suggestion, idx) => (
                                        <li
                                            key={idx}
                                            onMouseDown={() => {
                                                setTo(suggestion);
                                                setShowToSuggestions(false);
                                            }}
                                            className={`px-4 py-2 text-gray-600 cursor-pointer ${toActiveIndex === idx ? "bg-blue-100 font-medium" : "hover:bg-gray-200"
                                                }`}
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* DATE Field */}
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="block text-gray-600 w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* BUTTON */}
                    <div className="flex items-end">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                        >
                            Search Buses
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;


