import React from 'react';
import StudentLogin from '../login/StudentLogin';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // const isLoggedIn = () => {
  //   return localStorage.getItem('studentId') || 
  //          localStorage.getItem('recruiterId') || 
  //          localStorage.getItem('adminId');
  // };
    return (
      <>
      {/* {isLoggedIn() && ( */}
        <nav className="bg-gray-900 text-white py-4 px-8 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">Smart Placement Portal</h1>
        <div className="flex items-center space-x-6">
          <Link to='/' className="hover:text-gray-400 transition duration-300">Home</Link>
          <Link to='/studentLogin' className="hover:text-gray-400 transition duration-300">Student</Link>
          <Link to='/recruiterLogin' className="hover:text-gray-400 transition duration-300">Recruiter</Link>
          <Link to='/adminLogin' className="hover:text-gray-400 transition duration-300">Admin</Link>
          <button className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
          onClick={() => navigate("/studentLogin")} >
            Login
          </button>
        </div>
      </nav>
      
      {/* )} */}
      </>
    );
};

export default Navbar;