/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-sequences */
import './App.css';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React, { useState } from 'react';
import store from './redux/store';
import AppContext from './context/AppContext';
import AdminRouter from './routes/AdminRouter';
import RecruiterRouter from './routes/RecruiterRouter';
import SeekerRouter from './routes/SeekerRouter';
import AllBest from './pages/tryPage';

function App() {
  const [userDetails, setUserDetails] = useState({});
  const [recruiterDetails, setRecruiterDetails] = useState({});
  const [userOtpConf, setUserOtpConf] = useState({});
  const [recruiterOtpConf, setRecruiterOtpConf] = useState([]);

  return (
    <Provider store={store}>
      <AppContext.Provider value={{
        userDetails,
        setUserDetails,
        recruiterDetails,
        setRecruiterDetails,
        userOtpConf,
        setUserOtpConf,
        recruiterOtpConf,
        setRecruiterOtpConf,
      }}
      >
        <BrowserRouter>
          <Routes>
            <Route exact path="/*" element={<SeekerRouter />} />
            <Route path="/admin/*" element={<AdminRouter />} />
            <Route path="/recruiter/*" element={<RecruiterRouter />} />

            <Route path="/try" element={<AllBest />} />

          </Routes>
        </BrowserRouter>

      </AppContext.Provider>
    </Provider>
  );
}

export default App;
