import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Employees from '../components/Employees';
import New from '../components/New';
import CartScreen from './CartScreen';
function Cart() {
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
            <CartScreen/>
        </div>
    </div>
  )
}

export default Cart