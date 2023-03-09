import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/company/Home';
import Login from '../pages/company/Login';
import Otp from '../pages/company/Otp';
import Profile from '../pages/company/Profile';
import SingUp from '../pages/company/SignUp';

function CompanyRouter() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </div>
  );
}

export default CompanyRouter;
