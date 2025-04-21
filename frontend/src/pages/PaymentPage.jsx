import React, { useEffect } from "react"
import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { CreditCard, Calendar, Lock, AlertCircle, CheckCircle } from "lucide-react"
const API_URL = import.meta.env.VITE_API_URL;

const PaymentPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams();
  const { busDetails, selectedSeats, totalPrice, passengerDetails } = location.state || {
    busDetails: {
      name: "Express Deluxe",
      operator: "National Express",
      departureTime: "08:00 AM",
      arrivalTime: "11:30 AM",
      from: "New York",
      to: "Boston",
      date: "2023-06-15",
    },
    selectedSeats: [5, 6],
    totalPrice: 95,
    passengerDetails: {
      name: "John Doe",
      email: "john@example.com",
      phone: "(123) 456-7890",
    },
  }

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaymentComplete, setIsPaymentComplete] = useState(false)
  const [bookingData, setBookingData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
      setPaymentData({
        ...paymentData,
        [name]: formattedValue,
      })
      return
    }

    // Format expiry date with slash
    if (name === "expiryDate") {
      const cleaned = value.replace(/\D/g, "")
      let formatted = cleaned

      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
      }

      setPaymentData({
        ...paymentData,
        [name]: formatted,
      })
      return
    }

    setPaymentData({
      ...paymentData,
      [name]: value,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!paymentData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required"
    } else if (paymentData.cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits"
    }

    if (!paymentData.cardName.trim()) {
      newErrors.cardName = "Name on card is required"
    }

    if (!paymentData.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required"
    } else if (!/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format"
    }

    if (!paymentData.cvv.trim()) {
      newErrors.cvv = "CVV is required"
    } else if (!/^\d{3,4}$/.test(paymentData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const res = await fetch(`${API_URL}/booking/bookingD/${id}`);
        if (res.ok) {
          const data = await res.json();
          console.log('data, ', data)
          setBookingData({
            busDetails: data.busDetails,
            selectedSeats: data.selectedSeats,
            totalPrice: data.totalPrice,
            passengerDetails: data.user,
          });
        } else {
          alert("Data not getting.");
        }
      } catch (error) {
        console.error("Error fetching payment data:", error);
        // navigate("/error"); // Optional: navigate to error page or show message
      }
    };

    fetchBookingData();
  }, [id, navigate]);


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     setIsProcessing(true);

  //     fetch(`${API_URL}/payment/pay`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         amount: totalPrice,
  //         bookingId: id,
  //         userId: bookingData.passengerDetails._id
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("Response from backend:", data);
  //         if (res.ok) {

  //           setIsProcessing(false);
  //           setIsPaymentComplete(true);

  //           setTimeout(() => {
  //             navigate("/dashboard");
  //           }, 3000);
  //         } else {
  //           setIsProcessing(false);
  //           alert("Payment failed. Please try again.");
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("Error:", err);
  //         setIsProcessing(false);
  //       });
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsProcessing(true);

      try {
        const response = await fetch(`${API_URL}/payment/pay`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            amount: totalPrice,
            bookingId: id,
            userId: bookingData.passengerDetails._id
          }),
        });

        const data = await response.json();
        console.log("Response from backend:", data);

        if (response.ok) {
          setIsProcessing(false);
          setIsPaymentComplete(true);

          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
        } else {
          setIsProcessing(false);
          alert(data.message || "Payment failed. Please try again.");
        }
      } catch (err) {
        console.error("Error:", err);
        setIsProcessing(false);
        alert("Something went wrong. Please try again.");
      }
    }
  };


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-blue-600 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white">
            <h1 className="text-2xl font-bold">Payment</h1>
            <p className="mt-1">Complete your booking by making a secure payment</p>
          </div>
        </div>
      </div>

      <div className="flex-grow bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isPaymentComplete ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your booking has been confirmed. A confirmation email has been sent to {passengerDetails.email}.
              </p>
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">
                  Booking Reference:{" "}
                  <span className="text-blue-600">
                    BUS
                    {Math.floor(Math.random() * 10000)
                      .toString()
                      .padStart(4, "0")}
                  </span>
                </p>
              </div>
              <p className="text-sm text-gray-500 mb-6">You will be redirected to your dashboard in a few seconds...</p>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Bus</p>
                      <p className="font-medium">{busDetails.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Route</p>
                      <p className="font-medium">
                        {busDetails.from} to {busDetails.to}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-medium">
                        {busDetails.date}, {busDetails.departureTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Seats</p>
                      <p className="font-medium">{selectedSeats.join(", ")}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t flex justify-between font-bold text-gray-700">
                    <span>Total Amount</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold mb-4 pt-4 border-t">Payment Method</h2>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CreditCard className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="cardNumber"
                          name="cardNumber"
                          type="text"
                          maxLength={19}
                          value={paymentData.cardNumber}
                          onChange={handleChange}
                          className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.cardNumber ? "border-red-500" : "border-gray-300"
                            } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      {errors.cardNumber && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card
                      </label>
                      <input
                        id="cardName"
                        name="cardName"
                        type="text"
                        value={paymentData.cardName}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-3 py-2 border ${errors.cardName ? "border-red-500" : "border-gray-300"
                          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        placeholder="John Doe"
                      />
                      {errors.cardName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.cardName}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="expiryDate"
                            name="expiryDate"
                            type="text"
                            maxLength={5}
                            value={paymentData.expiryDate}
                            onChange={handleChange}
                            className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.expiryDate ? "border-red-500" : "border-gray-300"
                              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            placeholder="MM/YY"
                          />
                        </div>
                        {errors.expiryDate && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.expiryDate}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="cvv"
                            name="cvv"
                            type="text"
                            maxLength={4}
                            value={paymentData.cvv}
                            onChange={handleChange}
                            className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.cvv ? "border-red-500" : "border-gray-300"
                              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            placeholder="123"
                          />
                        </div>
                        {errors.cvv && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.cvv}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-6">
                    <div className="flex items-center h-5">
                      <input
                        id="saveCard"
                        name="saveCard"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-2 text-sm">
                      <label htmlFor="saveCard" className="font-medium text-gray-700">
                        Save this card for future payments
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Lock className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm text-blue-800">Your payment information is secure and encrypted</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <img src="/placeholder.svg?height=20&width=30" alt="Visa" className="h-5" />
                      <img src="/placeholder.svg?height=20&width=30" alt="Mastercard" className="h-5" />
                      <img src="/placeholder.svg?height=20&width=30" alt="Amex" className="h-5" />
                    </div>
                  </div>

                  {/* <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full py-3 rounded-md font-medium ${isProcessing
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing Payment...
                      </span>
                    ) : (
                      "Pay Now"
                    )}
                  </button> */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full px-4 py-2 text-white rounded-md transition-colors duration-300 ${isProcessing ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                  >
                    {isProcessing ? "Processing..." : "Pay Now"}
                  </button>

                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PaymentPage

