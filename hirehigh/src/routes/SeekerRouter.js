import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SeLogin from '../pages/seeker/Login';
import SeSignup from '../pages/seeker/Signup';
import SeHome from '../pages/seeker/Home';
import LandingPage from '../pages/seeker/LandingPage';

function SeekerRouter() {
  return (
    <div>

      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<SeLogin />} />

        <Route path="/signup" element={<SeSignup />} />

        <Route path="/home" element={<SeHome />} />

      </Routes>

    </div>
  );
}

export default SeekerRouter;
