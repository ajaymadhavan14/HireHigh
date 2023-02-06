import logo from './logo.svg';
import './App.css';

import Login from './pages/seeker/Login';
import Signup from './pages/seeker/Signup';
import { AppContext } from './context/AppContext';
import {Routes,Route,useNavigate, BrowserRouter} from 'react-router-dom'
import Home from './pages/seeker/LandingPage';

function App() {
  return (
     <AppContext.Provider>
      <BrowserRouter>
      <Routes>
        <Route  exact  path='/'   element={<Home/>}/>

        <Route path='/login' element={<Login/>}/> 
      
        <Route path='/signup' element={<Signup/>}/>
        
      </Routes>
      </BrowserRouter>
      
     </AppContext.Provider>
    
  );
}

export default App;
