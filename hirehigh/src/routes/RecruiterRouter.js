import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReLogin from '../pages/recruiter/Login';
import ReSingup from '../pages/recruiter/Signup';
import ReHome from '../pages/recruiter/Home';
import ProfileShow from '../pages/recruiter/ProfileShow';
import AddJobForm from '../pages/recruiter/AddJobForm';
import MyJobs from '../pages/recruiter/MyJobs';
import JobEdit from '../pages/recruiter/JobEdit';
import OtpSignUp from '../pages/recruiter/OtpSignUp';
import EditProfile from '../pages/recruiter/EditProfile';

function RecruiterRouter() {
  return (
    <div>

      <Routes>

        <Route path="/login" element={<ReLogin />} />

        <Route path="/signup" element={<ReSingup />} />

        <Route path="/otp" element={<OtpSignUp />} />

        <Route path="/home" element={<ReHome />} />

        <Route path="/profile" element={<ProfileShow />} />

        <Route path="/add_job" element={<AddJobForm />} />

        <Route path="/edit_jobs" element={<JobEdit />} />

        <Route path="/jobs" element={<MyJobs />} />

        <Route path="/edit_profile" element={<EditProfile />} />

      </Routes>

    </div>
  );
}

export default RecruiterRouter;
