/* eslint-disable no-sequences */
import './App.css';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React, { useState } from 'react';
import store from './redux/store';
import SeLogin from './pages/seeker/Login';
import SeSignup from './pages/seeker/Signup';
import LandingPage from './pages/seeker/LandingPage';
import SeHome from './pages/seeker/Home';
import ReLogin from './pages/recruiter/Login';
import ReSingup from './pages/recruiter/Signup';
import ReHome from './pages/recruiter/Home';
import AdLogin from './pages/admin/Login';
import AdDashboard from './pages/admin/Dashboard';
import AppContext from './context/AppContext';
import AdSeeker from './pages/admin/SeekerList';
import AdRecruiter from './pages/admin/RecruiterList';

function App() {
  const [userDetails, setUserDetails] = useState({});
  const [recruiterDetails, setRecruiterDetails] = useState({});

  return (
    <Provider store={store}>
      <AppContext.Provider value={userDetails, setUserDetails,
      recruiterDetails, setRecruiterDetails}
      >
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />

            <Route path="/login" element={<SeLogin />} />

            <Route path="/signup" element={<SeSignup />} />

            <Route path="/home" element={<SeHome />} />

            <Route path="/recruiter/login" element={<ReLogin />} />

            <Route path="/recruiter/signup" element={<ReSingup />} />

            <Route path="/recruiter/home" element={<ReHome />} />

            <Route path="/admin/login" element={<AdLogin />} />

            <Route path="/admin/home" element={<AdDashboard />} />

            <Route path="/admin/seeker" element={<AdSeeker />} />

            <Route path="/admin/recruiter" element={<AdRecruiter />} />

          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </Provider>
  );
}

export default App;
