import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import CarPost from '../components/CarPost'
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import OwnerTable from '../components/OwnerTable';

function OwnerPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  // useEffect(()=>{
  //   if(!token){
  //     navigate('/login');
  //   }
  // },[token])
  return (
    <div className='flex flex-row w-screen'>
      <SideBar/>
        <div className='mt-12 w-[85%]'>
            <OwnerTable/>
        </div>
    </div>
  )
}

export default OwnerPage