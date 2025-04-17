import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DriveManagement = () => {
  const navigate = useNavigate();
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    position: '',
    description: '',
    location: '',
    salary: '',
    deadline: '',
    requirements: [''],
    status: 'DRAFT'
  });

  useEffect(() => {
    const recruiterId = localStorage.getItem('recruiterId');
    if (!recruiterId) {
      navigate('/login');
      return;
    }
    fetchDrives();
  }, [navigate]);

  const fetchDrives = async () => {
    const recruiterId = localStorage.getItem('recruiterId');
    try {
      const response = await axios.get(`http://localhost:8080/api/recruiters/drives/${recruiterId}`);
      setDrives(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching drives:', error);
      setError('Failed to load drives');
      setLoading(false);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData(prev => ({
      ...prev,
      requirements: newRequirements
    }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index) => {
    const newRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      requirements: newRequirements
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recruiterId = localStorage.getItem('recruiterId');
    try {
      await axios.post(`http://localhost:8080/api/recruiters/drives/${recruiterId}`, formData);
      setShowForm(false);
      fetchDrives();
      alert('Drive created successfully!');
    } catch (error) {
      console.error('Error creating drive:', error);
      setError('Failed to create drive');
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleStatusChange = async (driveId, newStatus) => {
    const recruiterId = localStorage.getItem('recruiterId');
    try {
      const drive = drives.find(d => d.id === driveId);
      await axios.put(`http://localhost:8080/api/recruiters/drives/${driveId}`, 
        { ...drive, status: newStatus }
      );
      fetchDrives();
    } catch (error) {
      console.error('Error updating drive status:', error);
      setError('Failed to update drive status');
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleDelete = async (driveId) => {
    if (window.confirm('Are you sure you want to delete this drive?')) {
      const recruiterId = localStorage.getItem('recruiterId');
      try {
        await axios.delete(`http://localhost:8080/api/recruiters/drives/${driveId}`);
        fetchDrives();
      } catch (error) {
        console.error('Error deleting drive:', error);
        setError('Failed to delete drive');
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    }
  };

  const viewApplications = (driveId) => {
    navigate(`/recruiter/drives/${driveId}/applications`);
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
        <h2 className="text-2xl font-bold">Recruitment Drives</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Create New Drive
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-4">Create New Drive</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Deadline</label>
                <input
                  type="datetime-local"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Requirements</label>
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => handleRequirementChange(index, e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm"
                      required
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="px-2 py-1 bg-red-600 text-white rounded-md"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addRequirement}
                  className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md"
                >
                  Add Requirement
                </button>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                >
                  Create Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {drives.map((drive) => (
          <div key={drive.id} className="border rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{drive.companyName}</h3>
                <p className="text-gray-600">{drive.position}</p>
                <p className="text-sm text-gray-500">
                  Location: {drive.location}
                </p>
                <p className="text-sm text-gray-500">
                  Salary: ₹{drive.salary.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Deadline: {new Date(drive.deadline).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Created: {new Date(drive.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Last Updated: {new Date(drive.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <select
                  value={drive.status}
                  onChange={(e) => handleStatusChange(drive.id, e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="OPEN">Open</option>
                  <option value="CLOSED">Closed</option>
                </select>
                <button
                  onClick={() => viewApplications(drive.id)}
                  className="px-2 py-1 bg-green-600 text-white rounded-md"
                >
                  View Applications
                </button>
                <button
                  onClick={() => handleDelete(drive.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-medium">Description:</h4>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{drive.description}</p>
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

export default DriveManagement; 