import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import ProductScreen from './ProductScreen';

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  useEffect(()=>{
    if(!token){
      navigate('/login');
    }
  },[token])
  return (
    <div className='flex flex-row w-screen iphone:flex-col'>
      {/* <Navbar/> */}
      <SideBar/>
        <div className='mt-12 w-[85%] iphone:w-[100%]'>
          {/* <h1 className='mb-12'>Welcome, <span className='font-bold'>Nick</span></h1> */}
            <ProductScreen/>
        </div>
    </div>
  )
}

export default Dashboard