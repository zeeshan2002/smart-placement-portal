import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecruiterProfile = () => {
  const navigate = useNavigate();
  const [recruiter, setRecruiter] = useState({
    name: '',
    email: '',
    companyName: '',
    designation: '',
    phone: '',
    emailVerified: false,
    status: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const recruiterId = localStorage.getItem('recruiterId');
    if (!recruiterId) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/recruiters/profile/${recruiterId}`);
        setRecruiter(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile');
        setLoading(false);
        if (error.response?.status === 401) {
          navigate('/recruiterLogin');
        }
      }
    };
    fetchProfile();
  }, [navigate]);

  const goToDrive = () => {
    navigate("/recruiter/drive-management");
  };

  const goToEdit = () => {
    navigate("/recruiter/edit-profile");
  };

  const handleLogout = () => {
    localStorage.removeItem('recruiterId');
    navigate('/');
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>;
  }

  return (
      <div className="max-w-full bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Recruiter Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm sm:text-base">Welcome, {'Sartaj Ahmed'}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base px-4 py-2 rounded-md transition duration-150"
            >
              Logout
            </button>
          </div>
        </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-2xl font-bold">Recruiter Profile</h2>
        
        
        <div className="mt-6 flex justify-end flex-row gap-4">
        <button
          onClick={goToDrive}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Go to Application Drive
        </button>
        <button
          onClick={goToEdit}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Edit Profile
        </button>
      </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <div className="mb-6">
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
          <p className="font-bold">Status: {recruiter.status}</p>
          <p>Email Verification: {recruiter.emailVerified ? 'Verified' : 'Not Verified'}</p>
        </div>
        
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <div className="mt-1 p-2 bg-gray-50 rounded-md">{recruiter.name}</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="mt-1 p-2 bg-gray-50 rounded-md">{recruiter.email}</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <div className="mt-1 p-2 bg-gray-50 rounded-md">{recruiter.phone}</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <div className="mt-1 p-2 bg-gray-50 rounded-md">{recruiter.companyName}</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Designation</label>
          <div className="mt-1 p-2 bg-gray-50 rounded-md">{recruiter.designation}</div>
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default RecruiterProfile; 