
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home'
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        
          const response = await axios.get('http://localhost:8000/auth/verify-token', {
            withCredentials: true});
          if (response.data.valid) {
            console.log(response.data.valid);
            setIsAuthenticated(true);
          }
          else {
            setIsAuthenticated(false);
          }
        }
      catch (error) {
        console.error("Authentication check failed", error);
        setIsAuthenticated(false);
      }

    }
    checkAuth();


  },[]);
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        
        {/* If authenticated, redirect to /home when trying to access login or signup */}
        <Route
          path='/login'
          element={isAuthenticated ? <Navigate to='/home' /> : <Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path='/signup'
          element={isAuthenticated ? <Navigate to='/home' /> : <Signup setIsAuthenticated={setIsAuthenticated} />}
        />
        
        {/* If not authenticated, redirect to /login when trying to access home */}
        <Route 
          path='/home' 
          element={isAuthenticated ? <Home setIsAuthenticated={setIsAuthenticated} /> : <Navigate to='/login' />} 
        />
      </Routes>
    </div>
  );
}

export default App;
