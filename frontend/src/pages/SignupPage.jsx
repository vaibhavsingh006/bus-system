import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Lock, User, AlertCircle, Phone } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;

const SignupPage = () => {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   contact: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!contact) {
      newErrors.contact = "Phone number is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmpassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await fetch(`${API_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Important for cookie-based auth
          body: JSON.stringify({ name, email, password, contact }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Login failed");
        }

        if (data.redirectTo) {
          navigate(data.redirectTo); // Assuming you're using react-router's useNavigate()
        } else {
          alert("Login successful!");
          // Or navigate manually
          // navigate("/admin/dashboard");
        }

      } catch (err) {
        alert(err.message);
        console.log(err);
      }
    }
  };

  

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-500">Sign in</Link>
          </p>

          {/* <form className="space-y-6" onSubmit={handleSubmit}>
            {[
              { label: "Full Name", name: "name", type: "text", icon: <User className="h-5 w-5 text-gray-400" /> },
              { label: "Email", name: "email", type: "email", icon: <Mail className="h-5 w-5 text-gray-400" /> },
              { label: "Phone Number", name: "contact", type: "tel", icon: <Phone className="h-5 w-5 text-gray-400" /> },
              { label: "Password", name: "password", type: "password", icon: <Lock className="h-5 w-5 text-gray-400" /> },
              { label: "Confirm Password", name: "confirmPassword", type: "password", icon: <Lock className="h-5 w-5 text-gray-400" /> },
            ].map(({ label, name, type, icon }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {icon}
                  </div>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 text-gray-700 py-2 border ${errors[name] ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder={label}
                  />
                </div>
                {errors[name] && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors[name]}
                  </p>
                )}
              </div>
            ))}

            <button type="submit" className="w-full py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Create Account
            </button>
          </form> */}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
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
                    autoComplete="name"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                      errors.name ? "border-red-500" : "border-gray-300"
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

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
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

              <div className="mb-4">
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
                    autoComplete="tel"
                    value={contact}
                    onChange={(e)=> setContact(e.target.value)}
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
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

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="text"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="text"
                    value={confirmpassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Account
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.79-1.677-4.184-2.702-6.735-2.702-5.522 0-10 4.478-10 10s4.478 10 10 10c8.396 0 10.249-7.85 9.426-11.748l-9.426 0.082z"
                      fill="#4285F4"
                    />
                  </svg>
                  Google
                </button>
              </div>
            </div>
          </form>

          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;

          



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Mail, Lock, User, AlertCircle, Phone } from "lucide-react";

// const SignupPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     }

//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }

//     if (!formData.phone) {
//       newErrors.phone = "Phone number is required";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log("Signup submitted", formData);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />

//       <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
//           <div>
//             <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
//             <p className="mt-2 text-center text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
//                 Sign in
//               </Link>
//             </p>
//           </div>

//           <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//             <div className="rounded-md shadow-sm -space-y-px">
//               <div className="mb-4">
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <User className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="name"
//                     name="name"
//                     type="text"
//                     autoComplete="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
//                       errors.name ? "border-red-500" : "border-gray-300"
//                     } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     placeholder="John Doe"
//                   />
//                 </div>
//                 {errors.name && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <AlertCircle className="h-4 w-4 mr-1" />
//                     {errors.name}
//                   </p>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                   Email address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
//                       errors.email ? "border-red-500" : "border-gray-300"
//                     } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     placeholder="you@example.com"
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <AlertCircle className="h-4 w-4 mr-1" />
//                     {errors.email}
//                   </p>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Phone className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     autoComplete="tel"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
//                       errors.phone ? "border-red-500" : "border-gray-300"
//                     } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     placeholder="(123) 456-7890"
//                   />
//                 </div>
//                 {errors.phone && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <AlertCircle className="h-4 w-4 mr-1" />
//                     {errors.phone}
//                   </p>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     autoComplete="new-password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
//                       errors.password ? "border-red-500" : "border-gray-300"
//                     } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     placeholder="••••••••"
//                   />
//                 </div>
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <AlertCircle className="h-4 w-4 mr-1" />
//                     {errors.password}
//                   </p>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     autoComplete="new-password"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
//                       errors.confirmPassword ? "border-red-500" : "border-gray-300"
//                     } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                     placeholder="••••••••"
//                   />
//                 </div>
//                 {errors.confirmPassword && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <AlertCircle className="h-4 w-4 mr-1" />
//                     {errors.confirmPassword}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Create Account
//               </button>
//             </div>

//             <div className="mt-6">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">Or continue with</span>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <button
//                   type="button"
//                   className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 >
//                   <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
//                     <path
//                       d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.79-1.677-4.184-2.702-6.735-2.702-5.522 0-10 4.478-10 10s4.478 10 10 10c8.396 0 10.249-7.85 9.426-11.748l-9.426 0.082z"
//                       fill="#4285F4"
//                     />
//                   </svg>
//                   Google
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>

//       <Footer />
//     </div>
    
//   );
// };

// export default SignupPage;


