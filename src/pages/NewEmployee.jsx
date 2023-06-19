import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import Vehicles from '../components/Employees'
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Home from '../components/Home';
import Employees from '../components/Employees';
import New from '../components/New';
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
        <div className='mt-5 w-[85%]'>
          {/* <h1 className='mb-12'>Welcome, <span className='font-bold'>Nick</span></h1> */}
            <New/>
        </div>
    </div>
  )
}

export default Dashboard