import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import logoOfApp from '../assets/img/logoOfApp.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthStore } from '../store/useAuthStore';
const NavbarComponent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const userAuth = useSelector((store)=> store.userAuth.userAuth);
//zustang
  const {logout , authUser} = useAuthStore();


  
  //this fn is used to logOut the user
  // const logoutUser = async()=>{
  //   const data = await fetch("http://localhost:5000/api/v1/auth/logout",
  //     {
  //       method:"POST",
  //       headers:{"Content-Type": "application/json",}
  //     }
  //   )
    
  //   const res = await data.json();
  //   if(res.success) navigate("/signup")
  //   localStorage.clear('userData')
    
  // }
  return (
    <div className='fixed flex w-[100%] '>
      <div className='sm:w-[90%] w-[95%] mx-auto z-99 flex justify-between items-center  '>
        <img className='sm:w-[200px] h-[70px]' src={logoOfApp} alt="" />
        <div className='flex gap-5'>
            <div onClick={()=> navigate("/profile")} className='flex items-center gap-1 hover:text-gray-500 cursor-pointer'>
              <FaUserAlt className=''/>
              <p className='hidden sm:flex'>Profile</p>
            </div>
            <div onClick={()=> navigate("/")} className='flex items-center gap-1 hover:text-gray-500 cursor-pointer'>
              <FaHome className='text-xl'/>
              <p className='hidden sm:flex'>Home</p>
            </div>
            <div onClick={()=>logout(navigate)} className='flex items-center gap-1 hover:text-gray-500 cursor-pointer'>
              <CiLogout className=''/>
              <p className='hidden sm:flex'>Logout</p>
            </div>
        </div>
      </div>
    </div>
  )
  
}

export default NavbarComponent