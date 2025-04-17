import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentLogin from "./login/StudentLogin";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer"
import EntitiesSection from "./components/EntitiesSection";
import RegistrationForm from "./login/RegistrationForm";
import StudentDashboard from "./dashboard/StudentDashboard";
import AdminLogin from "./login/AdminLogin";
import AdminSignUp from "./login/AdminSignUp";
import RecruiterSignUp from "./login/RecruiterSignUp";
import RecruiterLogin from "./login/RecruiterLogin";
import AdminDashboard from "./dashboard/AdminDashboard";
import RecruiterProfile from "./components/Recruiter/RecruiterProfile";
import DriveManagement from "./components/Recruiter/DriveManagement";
import EditProfile from "./components/Student/EditProfile";
import EditRecruiter from "./components/Recruiter/EditRecruiter";
import DriveApplications from "./components/Recruiter/DriveApplications";

export default function App() {
    return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element = {<Hero/>} />
        <Route path="/" element = {<EntitiesSection/>} />
        <Route path="/studentLogin" element= {<StudentLogin />} />
        <Route path="/signup" element= {<RegistrationForm />} />
        <Route path="/student/dashboard" element= {<StudentDashboard />} />
        <Route path="/adminLogin" element= {<AdminLogin />} />
        <Route path="/adminSignup" element= {<AdminSignUp />} />
        <Route path="/admin/dashboard" element= {<AdminDashboard />} />
        <Route path="/recruiterSignup" element= {<RecruiterSignUp />} />
        <Route path="/recruiterLogin" element= {<RecruiterLogin />} />
        <Route path="/recruiter/dashboard" element= {<RecruiterProfile />} />
        <Route path="/recruiter/drive-management" element= {<DriveManagement />} />
        <Route path="/edit-profile" element= {<EditProfile />} />
        <Route path="/recruiter/edit-profile" element= {<EditRecruiter />} />
        <Route path="/recruiter/drives/:driveId/applications" element= {<DriveApplications />} />
      </Routes>
      <Footer />
    </div>
  );
}