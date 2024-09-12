import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'

function Home({setIsAuthenticated}) {
  const[user,setUser] = useState(null);
  const navigate = useNavigate(); 
  useEffect( ()=>{
    
    const fetchData =async ()=>{
    try{
      const response = await axios.get("http://localhost:8000/auth/home",{withCredentials:true});
      setUser(response.data);
      console.log(response.data);
    }
    catch (error) {
      console.error("failed to fetch home page");
      navigate('/login'); // Redirect to login if fetching fails
    }
   
  }
  fetchData();

},[navigate]);

const handleLogout = async ()=>{
  try{
    await axios.post('http://localhost:8000/auth/logout',{},{withCredentials:true});
    Cookies.remove('token')
    setIsAuthenticated(false);
    navigate('/login');
  }
  catch(error){
    console.log("Error to logout" );
    console.error(error);
    
    
  }

}
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
    <h1 className="text-4xl font-bold text-gray-800 mb-8">Home</h1>

    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      {/* Conditional rendering to check if user exists */}
      {user ? (
        <>
          <p className="text-lg text-gray-700 mb-4">{user.message}</p>
          <p className="text-md text-gray-600">
            Name: <span className="font-semibold">{user.user.name}</span>
          </p>    {/* Display message from user data */}
          <p className="text-md text-gray-600">
            Email: <span className="font-semibold">{user.user.email}</span>
          </p>  {/* Display email from user data */}
        </>
      ) : (
        <h1 className="text-xl text-gray-600">Loading...</h1> // Display loading state while user data is being fetched
      )}
    </div>

    <button 
      onClick={handleLogout} 
      className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
    >
      Logout
    </button>
  </div>
  )
}

export default Home
