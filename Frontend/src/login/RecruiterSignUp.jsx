import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const RecruiterSignUp = () => {
  // const [register, setRegister] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState(null);
  const [formType, setFormType] = useState('signup')

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    try{
      const response = await axios.post("http://localhost:8080/api/recruiters/register", formData)
      console.log(response.data)
      alert(response.data)
      navigate("/recruiterLogin")
      // setFormData
      // You can add your form submission logic here
    }catch(error){
      setError("Failed to register. Please try again later.");
      console.error("Error fetching recruiter data:", error);
      alert("Error fetching recruiter data:", error);

    }
  };

  return (
     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100"> 
        {/* Toggle between Login and Sign Up */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => navigate('/recruiterLogin')}
            className={`text-lg font-semibold cursor-pointer ${formType === 'login' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/recruiterSignup")}
            className={`text-lg font-semibold cursor-pointer ${formType === 'signup' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Sign Up
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Recruiter Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Mobile Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default RecruiterSignUp;