
import React, { useState } from "react";
import { BiShow, BiSolidHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";

import loginSignupImage from "../pictures/loginAnimation.gif";

import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProfileImage = async (e) => {
    const imageData = await ImagetoBase64(e.target.files[0]);
    setData((prev) => ({
      ...prev,
      image: imageData,
    }));
  };



console.log(process.env.REACT_APP_SERVER_DOMAIN)
  const handleSubmit = async(e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;
    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {


          const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Changed from "content-type" to "Content-Type"
            },
            body: JSON.stringify(data),
          });

          const dataRes = await fetchData.json()
          console.log(dataRes)
       // alert(dataRes.message);
        toast(dataRes.message);
        
        if(dataRes.alert){
          navigate("/login");
        }
        
      } else {
        alert("Password and Confirm Password do not match");
      }
    } else {
      alert("Please enter all the required fields");
    }
  };

  //or you can also give below:
// console.log(process.env.REACT_APP_SERVER_DOMAIN)
// const handleSubmit = async(e) => {
//   e.preventDefault();
//   const { firstName, email, password, confirmPassword } = data;
//   if (firstName && email && password && confirmPassword) {
//     if (password === confirmPassword) {
//       const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       const response = await fetchData.json();

//       if (response.alert) {
//         console.log("Successfully signed up!");
//         alert("Successfully signed up!");
//         // navigate("/login");
//       } else {
//         console.log("Email id is already registered");
//         alert("Email id is already registered");
//       }
//     } else {
//       alert("Password and Confirm Password do not match");
//     }
//   } else {
//     alert("Please enter all the required fields");
//   }
// };





  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md flex items-center m-auto relative">
          <label htmlFor="profileImage">
            <img
              src={data.image ? data.image : loginSignupImage}
              className="w-full h-full cursor-pointer"
              alt="Profile Image"
            />
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleUploadProfileImage}
            />
            <div className="absolute bottom-0 h-1/4 bg-slate-500 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
          </label>
        </div>

        
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="mt-1 mb-3 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.firstName}
            onChange={handleOnChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="mt-1 mb-3 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.lastName}
            onChange={handleOnChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 mb-3 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full bg-slate-200 border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiSolidHide />}
            </span>
          </div>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="w-full bg-slate-200 border-none outline-none"
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiSolidHide />}
            </span>
          </div>

          <button className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-5">
            Sign up
          </button>
        </form>
        <p className="text-left text-bs mt-2.5">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
