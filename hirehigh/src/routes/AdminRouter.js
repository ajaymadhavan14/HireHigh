import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdLogin from '../pages/admin/Login';
import AdDashboard from '../pages/admin/Dashboard';
import AdSeeker from '../pages/admin/SeekerList';
import AdRecruiter from '../pages/admin/RecruiterList';

function AdminRouter() {
  return (

    <Routes>

      <Route path="/login" element={<AdLogin />} />

      <Route path="/home" element={<AdDashboard />} />

      <Route path="/seeker" element={<AdSeeker />} />

      <Route path="/recruiter" element={<AdRecruiter />} />

    </Routes>

  );
}

export default AdminRouter;
