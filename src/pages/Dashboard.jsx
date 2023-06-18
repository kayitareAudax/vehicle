import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import Vehicles from '../components/Vehicles'
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Home from '../components/Home';

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  useEffect(()=>{
    if(!token){
      navigate('/login');
    }
  },[token])
  return (
    <div className='flex flex-row w-screen'>
      {/* <Navbar/> */}
      <SideBar/>
        <div className='mt-12 w-[85%]'>
          {/* <h1 className='mb-12'>Welcome, <span className='font-bold'>Nick</span></h1> */}
            <Home/>
        </div>
    </div>
  )
}

export default Dashboard