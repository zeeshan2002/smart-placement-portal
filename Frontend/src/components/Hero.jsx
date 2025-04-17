import React from 'react';
import { useNavigate } from 'react-router-dom';
import EntitiesSection from './EntitiesSection';

const Hero = () => {
  const navigate = useNavigate();
    return (
      <>
        <div 
        className="flex-1 flex flex-col items-center justify-center text-black text-center px-6 h-full bg-slate-300"
      >
        <div className=" p-12 rounded-lg max-w-4xl">
        <h2 className="text-5xl font-bold mb-6">Transform Campus Placements with Smart Technology</h2>
        <p className="text-xl mb-8 text-cyan-900">
          Streamline recruitment, discover top opportunities, and empower every student with real-time insights and intelligent tools—built for the future of career success.
        </p>
          <div className="flex gap-6 justify-center">
            <button className="bg-blue-600 px-8 py-4 rounded-full text-white font-semibold hover:bg-blue-800 transition duration-300 cursor-pointer"
            onClick={() => navigate("/")}>
              Get Started
            </button>
            <button className="bg-gray-700 px-8 py-4 rounded-full text-white font-semibold hover:bg-gray-800 transition duration-300 cursor-pointer"
            onClick={() => navigate("/")}>
              Learn More
            </button>
          </div>
        </div>
        </div>
      
      <EntitiesSection />
      
      </>
    );
};

export default Hero;