import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplicationTracker = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('/api/students/applications');
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'SHORTLISTED':
        return 'bg-blue-100 text-blue-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'SELECTED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Application Tracker</h2>
      <div className="space-y-4">
        {applications.length === 0 ? (
          <p className="text-center text-gray-500">No applications found</p>
        ) : (
          applications.map((application) => (
            <div key={application.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{application.companyName}</h3>
                  <p className="text-gray-600">{application.position}</p>
                  <p className="text-sm text-gray-500">
                    Applied on: {new Date(application.appliedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(application.status)}`}>
                    {application.status}
                  </span>
                </div>
              </div>
              {application.status === 'REJECTED' && application.feedback && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <h4 className="font-medium text-gray-700">Feedback:</h4>
                  <p className="text-sm text-gray-600">{application.feedback}</p>
                </div>
              )}
              {application.status === 'SELECTED' && (
                <div className="mt-4 p-3 bg-green-50 rounded-md">
                  <h4 className="font-medium text-green-700">Congratulations!</h4>
                  <p className="text-sm text-green-600">
                    You have been selected for this position. Further details will be communicated via email.
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ApplicationTracker; 