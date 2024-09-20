import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {  toast } from "react-toastify";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaEye ,FaEyeSlash} from "react-icons/fa";
function Signup() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [cPass,setCPass] = useState('');

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    const signupInfo = { ...userData };
    signupInfo[name] = value;
    setUserData(signupInfo);
  };
  
   const handleConfPass =(e)=>{
    const value=e.target.value;
    
   setCPass(value)
  
   }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = userData;
    if (password!==cPass) {
      toast.error("Password did not match"); // Notify user
      return; // Prevent submission
    }
    if (!name || !email || !password) {
      toast.error("All fields are required!"); // Notify user
      return; // Prevent submission
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
        userData
      );

      // Assuming success response has a message property
      toast.success("User created successfully!");
      

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      

      if (error.response) {
        // Check for specific error status
        if (error.response.status === 409) {
          toast.error(
            error.response.data.message || "User already registered."
          ); // User already registered
        } else {
          toast.error(
            error.response.data.error ||
              "An error occurred. Please try again."
          );
        }
      } else {
        toast.error("No response received from server. Please try again.");
      }
    }
  };
  //for password visibility functionalilty
  
  const[isVisible,setIsVisible] = useState(false);

  const togglePasswordVisibility=()=>{
    setIsVisible(!isVisible)
  }
  // this hook is used to after successful user creation we will navigate to login page
  const navigate = useNavigate();
  return (
    <div className="h-screen overflow-hidden"><nav className="w-full h-14 bg-black justify-around flex  items-center px-10">
    <div className="flex flex-row items-center gap-1"> 
<span className="text-white text-xl font-bold">Expenses <span className='text-blue-400'>Tracker</span>  </span><GiTakeMyMoney className="text-green-400 text-2xl"/>
</div>
</nav>
    <div className="flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-700 to-black min-h-screen">
      <div className="card bg-white bg-opacity-15 backdrop-blur-lg rounded-lg w-72 py-2 shadow-2xl shadow-black">
        <h1 className="text-xl font-bold tracking-tight text-center text-white">
          Create an account
        </h1>

        <h2 className="text-xs text-center text-white">Master Your Finances: Track Every Penny!</h2>

        <form className="flex flex-col justify-center items-center my-3 ">
          <div className="relative w-full px-7 ">
            <label htmlFor="name" className="block  font-semibold text-sm text-white">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              autoComplete="off"
              autoFocus
              value={userData.name}
              onChange={handleChange}
              className=" w-full bg-gray-700 font-semibold  placeholder:text-gray-400 placeholder:text-sm text-white  border border-zinc-800  p-1 mb-2 focus:outline-none focus:ring-2 focus:ring-slate-800 rounded-md  "
            />
          </div>
          <div className="relative w-full px-7">
            <label htmlFor="email"className="block  font-semibold text-sm text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="off"
              value={userData.email}
              onChange={handleChange}
              className=" w-full bg-gray-700 font-semibold  placeholder:text-gray-400 placeholder:text-sm text-white  border border-zinc-800  p-1 mb-2 focus:outline-none focus:ring-2 focus:ring-slate-800 rounded-md  "
            />
          </div>
          <div className="relative w-full px-7">
            <label htmlFor="password" className="block  font-semibold text-sm text-white">
              Password
            </label>
            <input
              type ={isVisible?'text':'password'}
              name="password"
              placeholder="Enter your password"
              autoComplete="off"
              value={userData.password}
              onChange={handleChange}
              className=" w-full bg-gray-700 font-semibold  placeholder:text-gray-400 placeholder:text-sm text-white  border border-zinc-800  p-1 mb-2 focus:outline-none focus:ring-2 focus:ring-slate-800 rounded-md  "
            />
            <span className="absolute right-9 top-8 cursor-pointer"onClick={togglePasswordVisibility}>{isVisible?<FaEye className="text-white" />:<FaEyeSlash className="text-white"/>}</span>
          </div>
          <div className="relative w-full px-7">
            <label htmlFor="congPassword" className="block  font-semibold text-sm text-white">
             Confirm Password
            </label>
            <input
              type ={isVisible?'text':'password'}
              name="cPass"
              placeholder="Confirm your password"
              autoComplete="off"
              value={cPass}
              onChange={handleConfPass}
              className=" w-full bg-gray-700 font-semibold  placeholder:text-gray-400 placeholder:text-sm text-white  border border-zinc-800  p-1 mb-2 focus:outline-none focus:ring-2 focus:ring-slate-800 rounded-md  "
            />
            <span className="absolute right-9 top-8 cursor-pointer"onClick={togglePasswordVisibility}>{isVisible?<FaEye className="text-white" />:<FaEyeSlash className="text-white"/>}</span>
          </div>
          <div className="relative w-full px-7">
          <button type="submit" className=" shadow-3xl shadow-blue-900 w-full bg-blue-500 rounded-lg px-3 py-2 font-bold text-xs text-white my-3 hover:bg-blue-700 " onClick={handleSubmit}>
            Sign Up
          </button>
          </div>
          <span className="text-xs text-white">
            Already have an account ? <Link className=" text-blue-500 font-semibold"to={"/login"}>Login </Link>
          </span>
        </form>
      
      </div>
    </div>
    </div>
  );
}

export default Signup;
