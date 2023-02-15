import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReLogin from '../pages/recruiter/Login';
import ReSingup from '../pages/recruiter/Signup';
import ReHome from '../pages/recruiter/Home';
import ProfileShow from '../pages/recruiter/ProfileShow';
import AddJobForm from '../pages/recruiter/AddJobForm';

function RecruiterRouter() {
  return (
    <div>

      <Routes>

        <Route path="/login" element={<ReLogin />} />

        <Route path="/signup" element={<ReSingup />} />

        <Route path="/home" element={<ReHome />} />

        <Route path="/profile" element={<ProfileShow />} />

        <Route path="/add_job" element={<AddJobForm />} />

      </Routes>

    </div>
  );
}

export default RecruiterRouter;
