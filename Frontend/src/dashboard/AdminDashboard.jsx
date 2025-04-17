import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [pendingRecruiters, setPendingRecruiters] = useState([]);
  const [students, setStudents] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const adminId = localStorage.getItem('adminId');
    if (!adminId) {
      navigate('/adminLogin');
      return;
    }
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      // Fetch analytics
      const analyticsResponse = await axios.get('http://localhost:8080/api/admin/analytics');
      setAnalytics(analyticsResponse.data);

      // Fetch pending recruiters
      const pendingRecruitersResponse = await axios.get('http://localhost:8080/api/admin/recruiters/pending');
      setPendingRecruiters(pendingRecruitersResponse.data);

      // Fetch all students
      const studentsResponse = await axios.get('http://localhost:8080/api/admin/students');
      setStudents(studentsResponse.data);

      // Fetch all recruiters
      const recruitersResponse = await axios.get('http://localhost:8080/api/admin/recruiters');
      setRecruiters(recruitersResponse.data);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
      setLoading(false);
      if (error.response?.status === 401) {
        navigate('/adminLogin');
      }
    }
  };

  const handleRecruiterAction = async (recruiterId, action) => {
    try {
      if (action === 'approve') {
        await axios.put(`http://localhost:8080/api/admin/recruiters/${recruiterId}/approve`);
        alert('Recruiter approved successfully');
      } else if (action === 'reject') {
        await axios.put(`http://localhost:8080/api/admin/recruiters/${recruiterId}/reject`);
        alert ('Recruiter rejected successfully');
      }
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error updating recruiter status:', error);
      setError('Failed to update recruiter status');
    }
  };

  const handleDeactivate = async (type, id) => {
    try{
        const response = await axios.put(`http://localhost:8080/api/admin/recruiters/${id}/${type}`);
        if (response.data) {
          alert(`Recruiter ${type} successfully`);
        } else {
          throw new Error('Failed to deactivate recruiter');
        }
        fetchDashboardData(); // Refresh data
      } catch (error) {
      console.error('Error deactivating user:', error);
      setError('Failed to deactivate user');
      }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
  <div className="flex flex-col md:flex-row justify-between items-center mb-10">
    <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
    <div className="flex items-center gap-4 mt-4 md:mt-0">
      <span className="text-gray-600 text-base">Welcome, <span className="font-semibold">Zeeshan</span></span>
      <button
        onClick={() => {
          localStorage.removeItem('adminId');
          navigate('/adminLogin');
        }}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  </div>

  {/* Analytics Section */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
    <div className="bg-white p-6 rounded-xl shadow border">
      <h3 className="text-lg font-medium text-gray-600 mb-1">Total Students</h3>
      <p className="text-3xl font-bold text-indigo-600">{analytics?.totalStudents}</p>
    </div>
    <div className="bg-white p-6 rounded-xl shadow border">
      <h3 className="text-lg font-medium text-gray-600 mb-1">Total Recruiters</h3>
      <p className="text-3xl font-bold text-indigo-600">{analytics?.totalRecruiters}</p>
    </div>
    <div className="bg-white p-6 rounded-xl shadow border">
      <h3 className="text-lg font-medium text-gray-600 mb-1">Total Applications</h3>
      <p className="text-3xl font-bold text-indigo-600">{analytics?.totalApplications}</p>
    </div>
  </div>

  {/* Applications Status Section */}
  <div className="mb-10">
    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Applications Status</h3>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white p-5 rounded-lg shadow border">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Pending</h4>
        <p className="text-3xl font-bold text-yellow-600">{analytics?.applicationsByStatus?.PENDING || 0}</p>
      </div>
      <div className="bg-white p-5 rounded-lg shadow border">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Shortlisted</h4>
        <p className="text-3xl font-bold text-blue-600">{analytics?.applicationsByStatus?.SHORTLISTED || 0}</p>
      </div>
      <div className="bg-white p-5 rounded-lg shadow border">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Rejected</h4>
        <p className="text-3xl font-bold text-red-600">{analytics?.applicationsByStatus?.REJECTED || 0}</p>
      </div>
      <div className="bg-white p-5 rounded-lg shadow border">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Selected</h4>
        <p className="text-3xl font-bold text-green-600">{analytics?.applicationsByStatus?.SELECTED || 0}</p>
      </div>
    </div>
  </div>

  {/* Recruiters Status Section */}
  <div className="mb-10">
    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Recruiters Status</h3>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white p-5 rounded-lg shadow border">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Pending</h4>
        <p className="text-3xl font-bold text-yellow-600">{analytics?.recruitersByStatus?.PENDING || 0}</p>
      </div>
      <div className="bg-white p-5 rounded-lg shadow border">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Approved</h4>
        <p className="text-3xl font-bold text-green-600">{analytics?.recruitersByStatus?.APPROVED || 0}</p>
      </div>
      <div className="bg-white p-5 rounded-lg shadow border">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Rejected</h4>
        <p className="text-3xl font-bold text-red-600">{analytics?.recruitersByStatus?.REJECTED || 0}</p>
      </div>
      <div className="bg-white p-5 rounded-lg shadow border">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Deactivated</h4>
        <p className="text-3xl font-bold text-gray-500">{analytics?.recruitersByStatus?.DEACTIVATED || 0}</p>
      </div>
    </div>
  </div>

  {/* Pending Recruiters Section */}
  <div className="mb-10">
    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Pending Recruiter Approvals</h3>
    <div className="space-y-4">
      {pendingRecruiters.map((recruiter) => (
        <div key={recruiter.id} className="bg-white p-5 rounded-lg shadow flex justify-between items-center border">
          <div>
            <h4 className="font-semibold text-lg">{recruiter.name}</h4>
            <p className="text-gray-600">{recruiter.companyName}</p>
            <p className="text-sm text-gray-500">{recruiter.email}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleRecruiterAction(recruiter.id, 'approve')}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Approve
            </button>
            <button
              onClick={() => handleRecruiterAction(recruiter.id, 'reject')}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Students Section */}
  <div className="mb-10">
    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Students</h3>
    <div className="space-y-4">
      {students.map((student) => (
        <div key={student.id} className="bg-white p-5 rounded-lg shadow flex justify-between items-center border">
          <div>
            <h4 className="font-semibold text-lg">{student.name}</h4>
            <p className="text-gray-600">Department: {student.department}</p>
            <p className="text-sm text-gray-500">Email: {student.email}</p>
            <p className="text-sm text-gray-500">Enrollment No: {student.enrollmentNo}</p>
            <p className="text-sm text-gray-500">CGPA: {student.cgpa}</p>
          </div>
          {/* <button
            onClick={() => handleDeactivate('student', student.id)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Deactivate
          </button> */}
        </div>
      ))}
    </div>
  </div>

  {/* Recruiters Section */}
  <div className="mb-10">
    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Recruiters</h3>
    <div className="space-y-4">
      {recruiters.map((recruiter) => (
        <div key={recruiter.id} className="bg-white p-5 rounded-lg shadow flex justify-between items-center border">
          <div>
            <h4 className="font-semibold text-lg">{recruiter.name}</h4>
            <p className="text-gray-600">Company: {recruiter.companyName}</p>
            <p className="text-sm text-gray-500">Email: {recruiter.email}</p>
            <p className="text-sm text-gray-500">Designation: {recruiter.designation}</p>

            <p className="text-sm text-gray-500">Status: {recruiter.status}</p>
          </div>
          {recruiter.status === 'DEACTIVATED' ? (
          <button
            onClick={() => handleDeactivate('approved', recruiter.id)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Activate
          </button>
          ) : (
          <button
            onClick={() => handleDeactivate('deactivated', recruiter.id)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Deactivate
          </button>
          )}
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default AdminDashboard;
