import logo from './logo.svg';
import './App.css';

import SeLogin from './pages/seeker/Login';
import SeSignup from './pages/seeker/Signup';
import { AppContext } from './context/AppContext';
import {Routes,Route,useNavigate, BrowserRouter} from 'react-router-dom'
import LandingPage from './pages/seeker/LandingPage';
import Home from './pages/seeker/Home';
import ReLogin from './pages/recruiter/Login'

function App() {
  return (
     <AppContext.Provider>
      <BrowserRouter>
      <Routes>
        <Route  exact  path='/'   element={<LandingPage/>}/>

        <Route path='/login' element={<SeLogin/>}/> 
      
        <Route path='/signup' element={<SeSignup/>}/>

        <Route path='/home' element={<Home/>}/> 
        
        <Route path='/recruiter/Login' element={<ReLogin/>}/> 

        
      </Routes>
      </BrowserRouter>
      
     </AppContext.Provider>
    
  );
}

export default App;
