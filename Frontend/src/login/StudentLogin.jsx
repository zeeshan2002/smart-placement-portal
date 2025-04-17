import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const StudentLogin = () => {
    const navigate = useNavigate();

    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    const [formType, setFormType] = useState('login')
    const [login, setLogin] = useState({
      email: '',
      password: ''
    })

    const handleChange = (e) => {
      const { name, value } = e.target;
      setLogin({
        ...login,
        [name]: value,
      });
    };
    const submitHandler = async (e) => {
      e.preventDefault()
      try{
        console.log("submitted", login)
        const response = await axios.get(`http://localhost:8080/api/students/login?email=${login.email}&password=${login.password}`)
        console.log(response.data)
        if(response.data){
        localStorage.setItem('studentId', response.data.id);
        navigate("/student/dashboard")
        } else{
          throw new Error("email or password is incorrect")
        }
        
      } catch(Error){
        throw new Error("email or password is incorrect")
      }
    }


  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        {/* Toggle between Login and Sign Up */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => navigate('/studentLogin')}
            className={`text-lg font-semibold cursor-pointer ${formType === 'login' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className={`text-lg font-semibold cursor-pointer ${formType === 'signup' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Sign Up
          </button>
        </div>
  
        {/* Login Form */}
        {formType === 'login' && (
          <form onSubmit={(e) => submitHandler(e)}>
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Student Login</h1>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                name="email"
                value={login.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
              />
            </div>
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                name="password"
                value={login.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              Login
            </button>
            <div className="text-right mt-4">
              <a href="#" className="text-sm text-blue-500 hover:text-blue-600 transition-colors duration-200">
                Forgot Password?
              </a>
            </div>
          </form>
        )}
  
        {/* Sign Up Form */}
        {/* {formType === 'signup' && (
          <form onSubmit={(e) => submitHandler(e)}>
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Student Sign Up</h1>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
              />
            </div>
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Sign Up
            </button> */}
          {/* </form> */}
        {/* )} */}
      </div>
    </div>
  </>
  )
}

export default StudentLogin