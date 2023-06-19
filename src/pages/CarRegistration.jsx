import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import CarPost from '../components/CarPost'
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Employees from '../components/Employees';

function CarRegistration() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  // useEffect(()=>{
  //   if(!token){
  //     navigate('/login');
  //   }
  // },[token])
  return (
    <div className='flex flex-row w-screen iphone:flex-col'>
      <SideBar/>
        <div className='mt-12 w-[85%] iphone:w-full'>
            <Employees/>
        </div>
    </div>
  )
}

export default CarRegistration