import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TruckIcon, UserGroupIcon, ChartBarIcon, ArrowRightOnRectangleIcon,Bars3Icon } from '@heroicons/react/24/outline'
import SideLink from './SideLink'
import rra from '../assets/rra2.png'
const SideBar = () => {
  const navigate=useNavigate()
  const handleLogout=async()=>{
    localStorage.removeItem("token")
    navigate('/login')
  }
  return (
    <div className='h-screen w-full iphone:h-[10%] sm:w-[13%] mr-2 bg-[#F5F5F5] flex flex-col'>
      <Bars3Icon className='h-0 w-0 text-secondColor'/>
      <div className='logo m-auto h-[70px]'>
        {/* <p className='text-[30px] text-secondColor font-bold text-center items-center'>E-vehicle</p> */}
        <img src={rra} className='object-cover h-full'/>
      </div>
      <div className='sideLinks flex flex-col flex-grow'>
        <SideLink text={"Dashboard"} icon={ChartBarIcon} to={'/dashboard'} />
        <SideLink text={"Vehicles"} icon={TruckIcon} to={'/vehicles'}/>
        <SideLink text={"Owners"} icon={UserGroupIcon} to={"/owners"} />
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
