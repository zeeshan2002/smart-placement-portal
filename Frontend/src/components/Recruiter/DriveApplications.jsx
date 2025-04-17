import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DriveApplications = () => {
  const navigate = useNavigate();
  const { driveId } = useParams();
  const [applications, setApplications] = useState([]);
  const [drive, setDrive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const recruiterId = localStorage.getItem('recruiterId');
    if (!recruiterId) {
      navigate('/login');
      return;
    }
    fetchDriveAndApplications();
  }, [navigate, driveId]);

  const fetchDriveAndApplications = async () => {
    try {
      // Fetch drive details
      const driveResponse = await axios.get(`http://localhost:8080/api/recruiters/drive/${driveId}`);
      setDrive(driveResponse.data);
    //   console.log("driveResponse", driveResponse.data);

      // Fetch applications for this drive
      const applicationsResponse = await axios.get(`http://localhost:8080/api/recruiters/drives/${driveId}/applications`);
      setApplications(applicationsResponse.data);
    //   console.log("application", applicationsResponse.data)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load applications');
      setLoading(false);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/recruiters/applications/${applicationId}?status=${newStatus}`);
      fetchDriveAndApplications(); // Refresh the applications list
    } catch (error) {
      console.error('Error updating application status:', error);
      setError('Failed to update application status');
    }
  };

  const viewStudentProfile = (studentId) => {
    navigate(`/recruiter/students/${studentId}`);
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Applications for {drive?.companyName}</h2>
          <p className="text-gray-600">{drive?.position}</p>
        </div>
        <button
          onClick={() => navigate('/recruiter/drive-management')}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Back to Drives
        </button>
      </div>

      <div className="mb-6">
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4">
          <p className="font-bold">Drive Status: {drive?.status}</p>
          <p>Deadline: {new Date(drive?.deadline).toLocaleString()}</p>
          <p>Total Applications: {applications.length}</p>
        </div>
      </div>

      <div className="space-y-4">
        {applications.map((application) => (
          <div key={application.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{application.student.name}</h3>
                <p className="text-gray-600">{application.student.department}</p>
                <p className="text-sm text-gray-500">
                  Enrollment No: {application.student.enrollmentNo}
                </p>
                <p className="text-sm text-gray-500">
                  CGPA: {application.student.cgpa}
                </p>
                <p className="text-sm text-gray-500">
                  Applied on: {new Date(application.appliedDate).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <select
                  value={application.status}
                  onChange={(e) => handleStatusChange(application.id, e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm"
                >
                  <option value="PENDING">Pending</option>
                  <option value="SHORTLISTED">Shortlisted</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="SELECTED">Selected</option>
                </select>
                <button
                  onClick={() => viewStudentProfile(application.student.id)}
                  className="px-2 py-1 bg-indigo-600 text-white rounded-md"
                >
                  View Student Profile
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-medium">Application Status:</h4>
              <div className={`inline-block px-3 py-1 rounded-full text-sm ${
                application.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                application.status === 'SHORTLISTED' ? 'bg-blue-100 text-blue-800' :
                application.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                'bg-green-100 text-green-800'
              }`}>
                {application.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriveApplications; 