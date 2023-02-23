import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SeLogin from '../pages/seeker/Login';
import SeSignup from '../pages/seeker/Signup';
import SeHome from '../pages/seeker/Home';
import LandingPage from '../pages/seeker/LandingPage';
import JobViews from '../pages/seeker/JobViews';
import SingleJobView from '../pages/seeker/SingleJobView';
import OtpSignUp from '../pages/seeker/OtpSignUp';
import ProfileShow from '../pages/seeker/ProfileShow';
import AddProfile from '../pages/seeker/AddProfile';
import EditProfile from '../pages/seeker/EditProfile';

function SeekerRouter() {
  return (
    <div>

      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<SeLogin />} />

        <Route path="/signup" element={<SeSignup />} />

        <Route path="/otp" element={<OtpSignUp />} />

        <Route path="/home" element={<SeHome />} />

        <Route path="/jobs" element={<JobViews />} />

        <Route path="/job_view" element={<SingleJobView />} />

        <Route path="/profile" element={<ProfileShow />} />

        <Route path="/add_profile" element={<AddProfile />} />

        <Route path="/edit_profile" element={<EditProfile />} />

      </Routes>

    </div>
  );
}

export default SeekerRouter;
