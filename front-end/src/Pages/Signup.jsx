import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

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
        "http://localhost:8000/auth/signup",
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
    <div className="flex justify-center items-center bg-gradient-to-b from-indigo-900 to-indigo-950 h-screen ">
      <div className="card bg-white rounded-lg w-72">
        <h1 className="text-xl font-bold tracking-tight text-center">
          Create an account
        </h1>

        <h2 className="text-xs text-center">Master Your Finances: Track Every Penny!</h2>

        <form className="flex flex-col justify-center items-center my-3 ">
          <div className="relative w-full px-7 ">
            <label htmlFor="name" className="block  text-xs text-gray-500 my-1 font-bold">
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
              className="w-full rounded-lg border border-gray-800 focus:outline-none focus:ring focus:ring-slate-200 px-3 py-2 text-xs "
            />
          </div>
          <div className="relative w-full px-7">
            <label htmlFor="email"className="block  text-xs text-gray-500 my-1 font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="off"
              value={userData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-800 focus:outline-none focus:ring focus:ring-slate-200 px-3 py-2 text-xs "
            />
          </div>
          <div className="relative w-full px-7">
            <label htmlFor="password" className="block  text-xs text-gray-500 my-1 font-bold">
              Password
            </label>
            <input
              type ={isVisible?'text':'password'}
              name="password"
              placeholder="Enter your password"
              autoComplete="off"
              value={userData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-800 focus:outline-none focus:ring focus:ring-slate-200 px-3 py-2 text-xs "
            />
            <span className="absolute right-8 top-1/2 cursor-pointer"onClick={togglePasswordVisibility}>{isVisible?'👁️':'🙈'}</span>
          </div>
          <div className="relative w-full px-7">
            <label htmlFor="congPassword" className="block  text-xs text-gray-500 my-1 font-bold">
             Confirm Password
            </label>
            <input
              type ={isVisible?'text':'password'}
              name="cPass"
              placeholder="Confirm your password"
              autoComplete="off"
              value={cPass}
              onChange={handleConfPass}
              className="w-full rounded-lg border border-gray-800 focus:outline-none focus:ring focus:ring-slate-200 px-3 py-2 text-xs "
            />
            <span className="absolute right-8 top-1/2 cursor-pointer"onClick={togglePasswordVisibility}>{isVisible?'👁️':'🙈'}</span>
          </div>
          <div className="relative w-full px-7">
          <button type="submit" className=" w-full bg-blue-400 rounded-lg px-3 py-2 text-xs text-white my-3  " onClick={handleSubmit}>
            Sign Up
          </button>
          </div>
          <span className="text-xs">
            Already have an account ? <Link className=" text-blue-500"to={"/login"}>Login </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;
