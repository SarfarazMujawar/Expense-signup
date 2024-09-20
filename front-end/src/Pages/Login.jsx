import React, { useState } from "react";
import axios from "axios";
import { Link,  useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { FaEye ,FaEyeSlash} from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";

function Login({setIsAuthenticated}) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
   
    const { name, value } = e.target;
    const signupInfo = { ...loginData };
    signupInfo[name] = value;
    setLoginData(signupInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginData;
    if (!email || !password) {
      toast.error("All fields are required!"); // Notify user
      return; // Prevent submission
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        loginData,
        { withCredentials: true }
      );
      toast.success(response.data.message); 
      setIsAuthenticated(true);
      // setLoginData({
      //   email: "",
      //   password: "",
      // });
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      //when we pass the wrong email then we will get 403 error so will handle that like
      // console.error(error.response.data.error)
      
      if (error.status === 403) {
        
        toast.error(error.response.data.message);
      } else {
        toast.error(error.response.data.error);
      }
    }
  };
  //for password visibility functionalilty

  const [isVisible, setIsVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsVisible(!isVisible);
  };
  // this hook is used to after successful user creation we will navigate to login page
  
  return (
<div className="h-screen overflow-hidden">
<nav className="w-full h-14 bg-black justify-around flex  items-center px-10">
      <div className="flex flex-row items-center gap-1"> 
  <span className="text-white text-xl font-bold">Expenses <span className='text-blue-400'>Tracker</span>  </span><GiTakeMyMoney className="text-green-400 text-2xl"/>
  </div>
  </nav>

    <div className="flex justify-center items-center  bg-gradient-to-br from-gray-900 via-gray-700 to-black min-h-screen">
     
      <div className="card bg-white bg-opacity-15 backdrop-blur-lg  mt-3 px-3  shadow-black rounded-lg w-72 py-5 shadow-2xl ">
        <h1 className="text-xl text-white font-bold tracking-tight text-center">
          Hi, Welcome Back!
        </h1>

        <h2 className="text-xs text-center text-white">
          Master Your Finances: Track Every Penny!
        </h2>

        <form className="flex flex-col justify-center items-center my-3 ">
          <div className="relative w-full px-4">
            <label
              htmlFor="email"
              className="font-semibold text-sm text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="off"
              value={loginData.email}
              onChange={handleChange}
              className=" w-full bg-gray-700 font-semibold  placeholder:text-gray-400 placeholder:text-sm text-white  border border-zinc-800  p-1 mb-2 focus:outline-none focus:ring-2 focus:ring-slate-800 rounded-md "
            />
          </div>
          <div className="relative w-full px-4">
            <label
              htmlFor="password"
              className="font-semibold text-sm text-white"
            >
              Password
            </label>
            <input
              type={isVisible ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              autoComplete="off"
              value={loginData.password}
              onChange={handleChange}
              className=" w-full bg-gray-700 font-semibold  placeholder:text-gray-400 placeholder:text-sm text-white  border border-zinc-800  p-1 mb-2 focus:outline-none focus:ring-2 focus:ring-slate-800 rounded-md "
            />
            <span
              className="absolute right-9 top-8 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {isVisible ? <FaEye className="text-white"/> :<FaEyeSlash className="text-white" /> }
            </span>
          </div>

          <div className="relative w-full px-4">
            <button
              type="submit"
              className=" shadow-3xl shadow-blue-900 w-full bg-blue-500 rounded-lg px-3 py-2 font-bold text-xs text-white my-3 hover:bg-blue-700  "
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          <span className="text-xs text-white">
            Don't have an account ?{" "}
            <Link className=" text-blue-500 font-semibold" to={"/signup"}>
              Sign Up{" "}
            </Link>
          </span>
        </form>
       
      </div>
    </div>
    </div>
  );
}

export default Login;
