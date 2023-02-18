import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SeLogin from '../pages/seeker/Login';
import SeSignup from '../pages/seeker/Signup';
import SeHome from '../pages/seeker/Home';
import LandingPage from '../pages/seeker/LandingPage';
import JobViews from '../pages/seeker/JobViews';

function SeekerRouter() {
  return (
    <div>

      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<SeLogin />} />

        <Route path="/signup" element={<SeSignup />} />

        <Route path="/home" element={<SeHome />} />

        <Route path="/jobs" element={<JobViews />} />

      </Routes>

    </div>
  );
}

export default SeekerRouter;
