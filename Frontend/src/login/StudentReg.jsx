import { useState } from "react";

export default function StudentReg() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    college: "",
    contact: "",
    email: "",
    currentEducation: "",
    previousEducation: "",
    internshipExperience: "",
    skills: []
  });

  const skillsOptions = ["JavaScript", "React", "Node.js", "Python", "Java", "C++", "Machine Learning", "Data Science"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        skills: checked ? [...prev.skills, value] : prev.skills.filter((skill) => skill !== value)
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
        <h2 className="text-2xl font-bold text-center mb-6">Student Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="middleName" placeholder="Middle Name" onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <input type="date" name="dob" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="contact" placeholder="Contact Number" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full p-2 border rounded" required />
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="gender" value="Male" onChange={handleChange} required />
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="gender" value="Female" onChange={handleChange} required />
              <span>Female</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="gender" value="Third Gender" onChange={handleChange} required />
              <span>Third Gender</span>
            </label>
          </div>
          <input type="text" name="college" placeholder="College Name" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="currentEducation" placeholder="Current Education" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="previousEducation" placeholder="Previous Education" onChange={handleChange} className="w-full p-2 border rounded" />
          <textarea name="internshipExperience" placeholder="Internship or Work Experience" onChange={handleChange} className="w-full p-2 border rounded"></textarea>
          <div>
            <h3 className="font-bold mb-2">Skills</h3>
            <div className="grid grid-cols-2 gap-2">
              {skillsOptions.map((skill) => (
                <label key={skill} className="flex items-center space-x-2">
                  <input type="checkbox" name="skills" value={skill} onChange={handleChange} />
                  <span>{skill}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <button className="bg-gray-500 text-white p-2 rounded">Go Back</button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

