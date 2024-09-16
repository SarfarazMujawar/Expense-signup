import React, { useState } from "react";
import axios from "axios";
import { Link,  useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { FaEye ,FaEyeSlash} from "react-icons/fa";


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
        "http://localhost:8000/auth/login",
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
    <div className="flex justify-center items-center bg-gradient-to-b from-indigo-900 to-indigo-950 h-screen ">
      <div className="card bg-white rounded-lg w-72">
        <h1 className="text-xl font-bold tracking-tight text-center">
          Hi, Welcome Back!
        </h1>

        <h2 className="text-xs text-center">
          Master Your Finances: Track Every Penny!
        </h2>

        <form className="flex flex-col justify-center items-center my-3 ">
          <div className="relative w-full px-7">
            <label
              htmlFor="email"
              className="block  text-xs text-gray-500 my-1 font-bold"
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
              className="w-full rounded-lg border border-gray-800 focus:outline-none focus:ring focus:ring-slate-200 px-3 py-2 text-xs "
            />
          </div>
          <div className="relative w-full px-7">
            <label
              htmlFor="password"
              className="block  text-xs text-gray-500 my-1 font-bold"
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
              className="w-full rounded-lg border border-gray-800 focus:outline-none focus:ring focus:ring-slate-200 px-3 py-2 text-xs "
            />
            <span
              className="absolute right-9 top-8 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {isVisible ? <FaEye /> :<FaEyeSlash /> }
            </span>
          </div>

          <div className="relative w-full px-7">
            <button
              type="submit"
              className=" w-full bg-blue-400 rounded-lg px-3 py-2 text-xs text-white my-3  "
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          <span className="text-xs">
            Don't have an account ?{" "}
            <Link className=" text-blue-500" to={"/signup"}>
              Sign Up{" "}
            </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
