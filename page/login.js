import React, { useState } from "react";
import {BiShow,BiSolidHide} from "react-icons/bi"

import { Link, useNavigate } from "react-router-dom";

import loginSignupImage from "../pictures/loginAnimation.gif";

import toast, { Toaster, useToaster } from 'react-hot-toast';

import { useDispatch, useSelector } from "react-redux"; //// Import useDispatch from react-redux

import { loginRedux } from "../redux/userSlice";

const Login = () => {
        const [showPassword, setShowPassword] = useState(false);
        const [data, setData] = useState({
            email: "",
            password: "",
        });
        const navigate = useNavigate(); // Define navigate using useNavigate
        const dispatch = useDispatch() // Get the dispatch function & copy 'dispatch' and pase it on handleSubmit()

        const userData = useSelector(state => state)
        console.log(userData.user)

        







        const handleShowPassword = () => {
            setShowPassword((preve) => !preve);
        };  
        const handleOnChange = (e) => {
            const { name, value } = e.target;
            setData((preve) => {
              return {
                ...preve,
                [name]: value,
              };
            });
        };


        const handleSubmit = async (e) => {
            e.preventDefault();
            const { email, password } = data;
          
            if (email && password) {
              console.log('Entered the if loop')
              console.log('email and pwd are',email)
              console.log('pwd is',password)
              const fetchData = await fetch(
                `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                }
              );
                console.log('came till here')
              const dataRes = await fetchData.json();
              console.log(dataRes);
              
              toast(dataRes.message);
              if (userData.user + dataRes.alert) {
                
                dispatch(loginRedux(dataRes)) // Dispatch your Redux action here with the user data

                setTimeout(() => {
                    navigate("/");
                }, 1000)
                
              }
              console.log(userData)
            } 
            else {
              toast("Please enter the required fields");
            }
          };
          
        
  return ( 
    <div className='p-3 md:p-4'>
    <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md flex items-center m-auto relative'>
            <img src={loginSignupImage} className = "w-full" />
        </div>
        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
            
            <label htmlFor='email'>Email</label>
            <input type={"email"} id="email" name='email' className='mt-1 mb-3 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.email} onChange={handleOnChange}></input>

            <label htmlFor='password'>Password</label>
            <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>              
            <input type={showPassword ? "text" : "password"} id="password" name='password' className=' w-full bg-slate-200 border-none outline-none' value={data.password} onChange={handleOnChange}></input>
            <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiShow /> : <BiSolidHide/>}</span>
            </div>          
            <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-5">Login</button>
        </form>
        <p className="text-left text-bs mt-2.5">Don't have an account? <Link to={"/signup"} className="text-red-500 underline">Sign-up</Link></p>
    </div>
</div>
  )
}
export default Login

















// import React, { useState } from "react";
// import { BiShow, BiSolidHide } from "react-icons/bi";
// import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
// import loginSignupImage from "../pictures/loginAnimation.gif";

// import toast, { Toaster, useToaster } from 'react-hot-toast';

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate(); // Define navigate using useNavigate

//   const handleShowPassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => {
//       return {
//         ...prev,
//         [name]: value,
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password } = data;

//     if (email && password) {
//       const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       const dataRes = await fetchData.json();
//       console.log(dataRes);
//       toast(dataRes.message);

//       if (dataRes.alert) {
//         navigate("/");
//       }
//     } else {
//       toast("Please enter the required fields");
//     }
//   };

//   return (
//     <div className='p-3 md:p-4'>
//       <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
//         <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md flex items-center m-auto relative'>
//           <img src={loginSignupImage} className="w-full" alt="Login and Signup" />
//         </div>
//         <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
//           <label htmlFor='email'>Email</label>
//           <input type={"email"} id="email" name='email' className='mt-1 mb-3 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.email} onChange={handleOnChange}></input>

//           <label htmlFor='password'>Password</label>
//           <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
//             <input type={showPassword ? "text" : "password"} id="password" name='password' className=' w-full bg-slate-200 border-none outline-none' value={data.password} onChange={handleOnChange}></input>
//             <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiShow /> : <BiSolidHide />}</span>
//           </div>
//           <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-5">Login</button>
//         </form>
//         <p className="text-left text-bs mt-2.5">Don't have an account? <Link to={"/signup"} className="text-red-500 underline">Sign-up</Link></p>
//       </div>
//     </div>
//   );
// };

// export default Login;
