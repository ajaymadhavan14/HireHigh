import './App.css';

import SeLogin from './pages/seeker/Login';
import SeSignup from './pages/seeker/Signup';
import { AppContext } from './context/AppContext';
import {Routes,Route,useNavigate, BrowserRouter} from 'react-router-dom'
import LandingPage from './pages/seeker/LandingPage';
import SeHome from './pages/seeker/Home';
import ReLogin from './pages/recruiter/Login'
import ReSingup from './pages/recruiter/Signup'
import ReHome from './pages/recruiter/Home'
import AdLogin from './pages/admin/Login'
import AdDashboard from './pages/admin/Dashboard'

function App() {
  return (
     <AppContext.Provider>
      <BrowserRouter>
      <Routes>
        <Route  exact  path='/'   element={<LandingPage/>}/>

        <Route path='/login' element={<SeLogin/>}/> 
      
        <Route path='/signup' element={<SeSignup/>}/>

        <Route path='/home' element={<SeHome/>}/> 
        
        <Route path='/recruiter/login' element={<ReLogin/>}/> 

        <Route path='/recruiter/signup' element={<ReSingup/>}/> 

        <Route path='/recruiter/home' element={<ReHome/>}/> 

        <Route path='/admin/login' element={<AdLogin/>}/> 

        <Route path='/admin/home' element={<AdDashboard/>}/> 





        
      </Routes>
      </BrowserRouter>
      
     </AppContext.Provider>
    
  );
}

export default App;
