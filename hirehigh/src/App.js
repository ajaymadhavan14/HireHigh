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
            <Route exact path="/*" element={<SeekerRouter />} />
            <Route path="/admin/*" element={<AdminRouter />} />
            <Route path="/recruiter/*" element={<RecruiterRouter />} />

          </Routes>
        </BrowserRouter>

      </AppContext.Provider>
    </Provider>
  );
}

export default App;
