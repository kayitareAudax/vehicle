import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TruckIcon, UserGroupIcon, ChartBarIcon, ArrowRightOnRectangleIcon,Bars3Icon, PlusCircleIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
import SideLink from './SideLink'
import rtb from '../assets/rtb.png'
const SideBar = () => {
  const [showSidebar,setShowSidebar]=useState(false);
  const navigate=useNavigate()
  const handleLogout=async()=>{
    localStorage.removeItem("token")
    navigate('/login')
  }
  const handleClick=()=>{
    setShowSidebar(!showSidebar);
  }
  return (
    <div className={`h-screen iphone:h-[5vh] iphone:w-full  sm:w-[13%] ${showSidebar?'iphone:h-[40vh] transition-all':'iphone:h-[5vh] transition-all'} mr-2 bg-[#F5F5F5] flex flex-col`}>
      <Bars3Icon className={`hidden mt-2 ml-2 flex-shrink-0 iphone:flex h-6 w-6 text-secondColor ${showSidebar ? 'hidden' : 'flex'}`} onClick={handleClick} />
      <div className={`logo m-auto h-[70px]`}>
        {/* <p className='text-[30px] text-secondColor font-bold text-center items-center'>E-vehicle</p> */}
        <img src={rtb} className='object-cover h-full iphone:h-0'/>
      </div>
      <div className={`sideLinks flex flex-col mt-3 flex-grow ${showSidebar?'iphone:flex-col iphone:h-full':'iphone:hidden'}`}>
        <SideLink text={"Employees"} icon={UserGroupIcon} to={'/dashboard'} />
        <SideLink text={"Add new employee"} icon={PlusCircleIcon} to={'/new'}/>
        <SideLink text={"Laptops"} icon={ComputerDesktopIcon} to={'/laptop'}/>
        <div className='flex-grow' />
        <div className='flex items-center justify-end px-4 mb-2 iphone:justify-center'>
          <button className='py-2 bg-mainColor text-white px-2 rounded flex' onClick={handleLogout}>
            <ArrowRightOnRectangleIcon className='h-6 w-6 text-white mr-4' />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default SideBar;
