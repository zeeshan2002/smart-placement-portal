import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecruitmentDrives = () => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const response = await axios.get('/api/recruitment/drives');
        setDrives(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching drives:', error);
        setLoading(false);
      }
    };
    fetchDrives();
  }, []);

  const handleApply = async (driveId) => {
    try {
      await axios.post(`/api/recruitment/drives/${driveId}/apply`);
      alert('Application submitted successfully!');
      // Refresh the drives list
      const response = await axios.get('/api/recruitment/drives');
      setDrives(response.data);
    } catch (error) {
      console.error('Error applying to drive:', error);
      alert('Failed to apply. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Available Recruitment Drives</h2>
      <div className="space-y-4">
        {drives.map((drive) => (
          <div key={drive.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{drive.companyName}</h3>
                <p className="text-gray-600">{drive.position}</p>
                <p className="text-sm text-gray-500">Deadline: {new Date(drive.deadline).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  drive.status === 'OPEN' ? 'bg-green-100 text-green-800' :
                  drive.status === 'CLOSED' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {drive.status}
                </span>
                {drive.status === 'OPEN' && !drive.hasApplied && (
                  <button
                    onClick={() => handleApply(drive.id)}
                    className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Apply Now
                  </button>
                )}
                {drive.hasApplied && (
                  <span className="mt-2 text-sm text-indigo-600">Applied</span>
                )}
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-medium">Requirements:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {drive.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitmentDrives; 