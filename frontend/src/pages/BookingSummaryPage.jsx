// import React from "react"
// import { useState } from "react"
// import { useLocation, useNavigate } from "react-router-dom"
// import Navbar from "../components/Navbar"
// import Footer from "../components/Footer"
// import { User, Mail, Phone, AlertCircle } from "lucide-react"
// const API_URL = import.meta.env.VITE_API_URL;

// const BookingSummaryPage = () => {

//   // api
//   const location = useLocation()
//   const navigate = useNavigate()

//   const { busDetails, selectedSeats, totalPrice } = location.state || {}
//   const busId = busDetails?._id || "123456" // fallback ID if testing dummy data

//   const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
//   const [errors, setErrors] = useState({})
//   const [loading, setLoading] = useState(false)

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }

//   const validateForm = () => {
//     const newErrors = {}
//     if (!formData.name.trim()) newErrors.name = "Name is required"
//     if (!formData.email) newErrors.email = "Email is required"
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email"
//     if (!formData.phone) newErrors.phone = "Phone number is required"
//     else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Invalid phone number"
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!validateForm()) return

//     setLoading(true)

//     try {
//       const response = await fetch(`${API_URL}/booking/book`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           busId,
//           selectedSeats,
//           passengerDetails: formData,
//           totalAmount: Number(totalPrice) + 5, // including booking fee
//         }),
//       })

//       console.log("Submitting booking with data:", {
//         busId,
//         selectedSeats,
//         passengerDetails: formData,
//         totalAmount: totalPrice + 5,
//       });

//       const result = await response.json()

//       if (response.ok) {
//         navigate("/payment", {
//           state: {
//             bookingId: result.bookingId,
//             busDetails,
//             selectedSeats,
//             totalPrice,
//             passengerDetails: formData,
//           },
//         })
//       } else {
//         alert(result.message || "Something went wrong while booking.")
//       }
//     } catch (error) {
//       console.error(error)
//       alert("Server error. Please try again later.")
//     } finally {
//       setLoading(false)
//     }
//   }
// api



import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { User, Mail, Phone, AlertCircle } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL;

const BookingSummaryPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { busDetails, selectedSeats, totalPrice } = location.state || {}
  const busId = busDetails?._id || "123456"

  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpStatus, setOtpStatus] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email"
    if (!formData.phone) newErrors.phone = "Phone number is required"
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Invalid phone number"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSendOtp = async () => {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ ...errors, email: "Enter a valid email to receive OTP" })
      return
    }

    try {
      const response = await fetch(`${API_URL}/auto/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: formData.email }),
      })

      const data = await response.json()
      if (response.ok) {
        setOtpSent(true)
        setOtpStatus("OTP sent to your email.")
      } else {
        setOtpStatus(data.message || "Failed to send OTP.")
      }
    } catch (error) {
      setOtpStatus("Server error while sending OTP.")
    }
  }

  const handleVerifyOtp = async () => {
    if (!otp) {
      setOtpStatus("Please enter the OTP")
      return
    }

    try {
      const response = await fetch(`${API_URL}/auto/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: formData.email, otp }),
      })

      const data = await response.json()
      console.log(data);
      if (response.ok) {
        setOtpVerified(true)
        setOtpStatus("OTP verified successfully ✅")
      } else {
        setOtpStatus(data.message || "Invalid OTP")
      }
    } catch (error) {
      setOtpStatus("Server error while verifying OTP")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    if (!otpVerified) {
      setOtpStatus("Please verify your OTP before proceeding.")
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/booking/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          busId,
          selectedSeats,
          passengerDetails: formData,
          totalAmount: Number(totalPrice) + 5,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        navigate(`/payment/${result.booking._id}`, {
          state: {
            busDetails,
            selectedSeats,
            totalPrice,
            passengerDetails: formData,
          },
        })
      } else {
        alert(result.message || "Something went wrong while booking.")
      }
    } catch (error) {
      alert("Server error. Please try again later.")
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-blue-600 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white">
            <h1 className="text-2xl font-bold">Booking Summary</h1>
            <p className="mt-1">Review your booking details before proceeding to payment</p>
          </div>
        </div>
      </div>

      <div className="flex-grow bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Trip Details</h2>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Bus</p>
                    <p className="font-medium text-gray-700">{busDetails.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Operator</p>
                    <p className="font-medium text-gray-700">{busDetails.operator}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-medium text-gray-700">{busDetails.from}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">To</p>
                    <p className="font-medium text-gray-700">{busDetails.to}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-gray-700">{busDetails.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium text-gray-700">
                      {busDetails.departureTime} - {busDetails.arrivalTime}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500 mb-2">Selected Seats</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.map((seat) => (
                      <span
                        key={seat}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        Seat {seat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold mb-4 pt-4 border-t">Passenger Details</h2>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className={`appearance-none text-gray-700 block w-full pl-10 pr-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"
                          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`appearance-none text-gray-700 block w-full pl-10 pr-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        placeholder="you@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`appearance-none text-gray-700 block w-full pl-10 pr-3 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300"
                          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>


                {/* OTP Button */}
                <div className="space-y-2">
                  {!otpSent && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-white hover:underline text-sm"
                    >
                      Send OTP to Email
                    </button>
                  )}

                  {/* <button
                    type="button"
                    disabled={otpSent}
                    onClick={handleSendOtp}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                  >
                    {otpSent ? "OTP Sent" : "Send OTP"}
                  </button> */}

                  {otpSent && !otpVerified && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full border text-gray-700 px-3 py-2 rounded-md text-sm"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                      >
                        Verify OTP
                      </button>
                    </div>
                  )}

                  {otpStatus && (
                    <p className="text-sm mt-1 text-gray-700">{otpStatus}</p>
                  )}
                </div>


                <h2 className="text-xl font-bold mb-4 pt-4 border-t">Price Details</h2>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span className="text-gray-600">Price per seat</span>
                    <span>${busDetails.price}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="text-gray-600">Number of seats</span>
                    <span>{selectedSeats.length}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="text-gray-600">Booking fee</span>
                    <span>$5.00</span>
                  </div>
                  <div className="pt-2 border-t flex justify-between text-gray-700 font-bold text-lg">
                    <span>Total</span>
                    <span>${totalPrice + 5}</span>
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {loading ? "Processing..." : "Proceed to Payment"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default BookingSummaryPage

