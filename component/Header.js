

import React, { useState } from 'react';
import logo from '../pictures/1.png';
import { Link } from 'react-router-dom';

import { PiUserCircleFill } from 'react-icons/pi';
import { FaShoppingCart } from 'react-icons/fa'; // Corrected import


import { useSelector } from "react-redux"

import { logoutRedux } from "../redux/userSlice";

import { useDispatch } from "react-redux";

import toast, { Toaster, useToaster } from 'react-hot-toast';

const Header = () => {
const [showMenu, setShowMenu] = useState(false);

const userData=useSelector((state) => state.user);
console.log(userData.email)



const dispatch = useDispatch();

const handleShowMenu = () => {
  setShowMenu((preve) => !preve);
};
  const [isClicked, setIsClicked] = useState(false);
  
  
  const handleLogoClick = () => {
    setIsClicked(!isClicked);
  };

  //logout
  
  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem)
  
  console.log(process.env.REACT_APP_ADMIN_EMAIL)

  const logoClass = isClicked ? 'h-10 w-10 animate-bounce' : 'h-16 w-16';
  const userIconClass = 'text-4xl';
  const userIconCartClass = 'text-4xl';

  

  return (
    <header className='fixed shadow-md w-full h-16 px-10 md:px-10 z-50 bg-white'>
      <div className='flex items-center h-full justify-between'>
        <Link to={"cart"}>
          <div>
            <div className={logoClass} onClick={handleLogoClick}>
              <img src={logo} alt="Logo" className='h-full w-full cursor-pointer' />
            </div>
          </div>
        </Link>
        <div className='flex items-center gap-5 md: gap-7'>
          <nav className='gap-4 md:gap-7 text-base md:text-lg hidden md:flex'>
            <Link to={""}>Home</Link>
            <Link to={"menu/650fe0a1829baea1653e2534"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>

          <div className='text-2xl text-slate-600 relative'>
          <Link to={"cart"}>
            <FaShoppingCart className={userIconCartClass} /> 
            <div className='absolute -top-1.5 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center'>
              {cartItemNumber.length}
            </div>
          </Link> 
          </div>

          <div className='text-slate-600' onClick={handleShowMenu}> 
            <div className='text-4xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md'>
              {userData.image ? <img src = {userData.image} className="h-full w-full"/>: <PiUserCircleFill className={userIconClass} />}
            </div>
            {
              showMenu && ( 
                <div className='absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center'>
                  {
                    userData.email === process.env.REACT_APP_ADMIN_EMAIL &&  <Link to = {"newproduct"} className='whitespace-nowrap cursor-pointer px-2'>New Product</Link>
                  }

                  {
                    userData.image ? <p className='cursor-pointer text-white  px-2 bg-red-500' onClick={handleLogout}>Logout ({userData.firstName}) </p> : <Link to={"login"} className='whitespace-nowrap cursor-pointer px-2'>Login</Link>
                  }
                  <nav className='text-base md:text-lg flex flex-col md:hidden'>
                    <Link to={""} className="px-2 py-1">Home</Link>
                    <Link to={"menu/650fe0a1829baea1653e2534"} className="px-2 py-1">Menu</Link>
                    <Link to={"about"} className="px-2 py-1">About</Link>
                    <Link to={"contact"} className="px-2 py-1">Contact</Link>
                  </nav>
                </div>
            )}    
          </div>
        </div> 
      </div>
    </header>
  );
};

export default Header;



