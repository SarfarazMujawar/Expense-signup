import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";
import { IoIosLogOut  } from "react-icons/io";
import { GiTakeMyMoney } from "react-icons/gi";

function Navbar({setUser,setTransactions,setIsAuthenticated}) {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
          await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/auth/logout`,
            {},
            { withCredentials: true }
          );
          setUser(null);
          setTransactions([]);
          Cookies.remove("token");
          setIsAuthenticated(false);
          navigate("/login");
        } catch (error) {
          console.log("Error to logout");
         
        }
      };
  return (
   
    <nav className="w-full h-14 bg-gradient-to-br from-gray-900  to-black justify-around flex  items-center px-10">
      <div className="flex flex-row items-center gap-1"> 
  <span className="text-white text-xl font-bold">Expenses <span className='text-blue-400'>Tracker</span>  </span><GiTakeMyMoney className="text-green-400 text-2xl"/>
  </div>
  <div className="flex flex-col items-center">
    <IoIosLogOut className="text-rose-500 text-3xl  cursor-pointer" onClick={handleLogout} />
    <span className="text-rose-500 text-xs font-bold ">Logout</span>
  </div>
</nav>
    
  )
}

export default Navbar
