import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const EntitiesSection = () => {
    const images = [
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ];
      
    const [bgImage, setBgImage] = useState(images[0]);

    useEffect(() => {
      // const randomImage = images[Math.floor(Math.random() * images.length)];
      setBgImage(bgImage);
    }, []);
    const navigate = useNavigate();

    return (
        <div className="py-20 bg-gray-100 text-center"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <h2 className="text-4xl font-bold mb-12">Who You Are?</h2>
        <div className="flex justify-center gap-10">
          {/* Student Card */}
          <div className="bg-white shadow-2xl rounded-lg p-8 w-80 transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold mb-4">Students</h3>
            <p className="text-gray-600 mb-6">Find job opportunities and track your applications.</p>
            <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 cursor-pointer" onClick={() => navigate("/studentLogin")} >
              Explore
            </button>
          </div>
          {/* Recruiter Card */}
          <div className="bg-white shadow-2xl rounded-lg p-8 w-80 transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold mb-4">Recruiters</h3>
            <p className="text-gray-600 mb-6">Discover top talent and manage hiring processes.</p>
            <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300 cursor-pointer"
            onClick={() => navigate("/recruiterLogin")}>
              Explore
            </button>
          </div>
          {/* Admin Card */}
          <div className="bg-white shadow-2xl rounded-lg p-8 w-80 transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold mb-4">Admin</h3>
            <p className="text-gray-600 mb-6">Oversee placements and ensure smooth operations.</p>
            <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-red-900 transition duration-300 cursor-pointer" onClick={() => navigate("/adminLogin")}>
              Explore
            </button>
            
          </div>
        </div>
      </div>
    );
};

export default EntitiesSection;