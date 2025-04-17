import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('drives');
  const [recruitmentDrives, setRecruitmentDrives] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [studentProfile, setStudentProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const skills = ['Java', 'React', 'Spring Boot', 'MySQL', 'DSA', 'JavaScript']
  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get student ID from session storage (set during login)
      const studentId = localStorage.getItem('studentId');
      if (!studentId) {
        navigate('/studentLogin');
        return;
      }

      // Fetch recruitment drives
      const drivesResponse = await axios.get(`http://localhost:8080/api/students/recruitment-drives`);
      setRecruitmentDrives(drivesResponse.data);
      console.log(drivesResponse.data)

      // Fetch applied jobs
      const appliedResponse = await axios.get(`http://localhost:8080/api/students/${studentId}/applications`);
      setAppliedJobs(appliedResponse.data);
      console.log("response", appliedResponse.data)
      
      // // Fetch student profile
      const profileResponse = await axios.get(`http://localhost:8080/api/students/${studentId}`);
      setStudentProfile(profileResponse.data);
      console.log("student", profileResponse.data)

    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (driveId) => {
    try {
      const studentId = localStorage.getItem('studentId');
      
      // Check if student has already applied
      const hasApplied = appliedJobs.some(job => job.driveId === driveId);
      if (hasApplied) {
        alert('You have already applied for this position.');
        return;
      }

      // Check if the drive deadline has passed
      const drive = recruitmentDrives.find(d => d.id === driveId);
      if (new Date(drive.deadline) < new Date()) {
        alert('The application deadline has passed.');
        return;
      }

      await axios.post(`http://localhost:8080/api/students/${studentId}/apply/${driveId}`);
      
      // Show success message
      alert('Application submitted successfully!');
      
      // Refresh data
      fetchStudentData();
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('studentId');
    navigate('/studentLogin');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <button 
            onClick={fetchStudentData}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {studentProfile?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('drives')}
              className={`${
                activeTab === 'drives'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Recruitment Drives
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`${
                activeTab === 'applications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              My Applications
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              My Profile
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'drives' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recruitmentDrives.map((drive) => (
              <div key={drive.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900">{drive.companyName}</h3>
                <p className="mt-2 text-gray-600">{drive.description}</p>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Deadline: {new Date(drive.deadline).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">Location: {drive.location}</p>
                  <p className="text-sm text-gray-500">Package: {drive.salary * 12} per annum</p>
                  {/* <p className="text-sm text-gray-500">Min CGPA: {drive.minCgpa}</p> */}
                  <p className="text-sm text-gray-500">Required Skills: {drive.requirements.join(', ')}</p>
                </div>
                <button
                  onClick={() => handleApply(drive.id)}
                  className={`mt-4 w-full px-4 py-2 rounded-md ${
                    new Date(drive.deadline) < new Date()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                  disabled={new Date(drive.deadline) < new Date()}
                >
                  {new Date(drive.deadline) < new Date() ? 'Deadline Passed' : 'Apply Now'}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appliedJobs.map((application) => (
                  <tr key={application.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {application.drive.companyName}
                      {console.log(application)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.drive.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        application.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        application.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                        application.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {application.remarks || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'profile' && studentProfile && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Student Profile</h2>
              <button
                onClick={() => navigate('/edit-profile')}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="mt-1 text-sm text-gray-900">{studentProfile.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1 text-sm text-gray-900">{studentProfile.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Registration Number</p>
                <p className="mt-1 text-sm text-gray-900">{studentProfile.enrollmentNo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Branch</p>
                <p className="mt-1 text-sm text-gray-900">{studentProfile.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">CGPA</p>
                <p className="mt-1 text-sm text-gray-900">{studentProfile.cgpa}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone Number</p>
                <p className="mt-1 text-sm text-gray-900">{studentProfile.phone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Skills</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {skill}
                    </span>
                
                   ))}
                </div>
              </div>
              {/* <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Resume</p>
                <div className="mt-1">
                  <a
                    href={`http://localhost:8080/api/students/${studentProfile.id}/resume`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Resume
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
