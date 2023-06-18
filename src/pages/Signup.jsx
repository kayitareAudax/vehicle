import { useState } from 'react';
import axios from 'axios';
import loginVector from '../assets/desiredVector.avif'
import API_URL from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import { Link } from 'react-router-dom';
import CustomInput from '../components/CustomInput';
const Signup = () => {
    const navigate = useNavigate();
    const [names, setNames] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const handlePasswordChange=(e)=>{
      setPassword(e.target.value)
    }
    const handleEmailChange=(e)=>{
      setEmail(e.target.value)
    }
    const handleNamesChange=(e)=>{
      setNames(e.target.value)
    }
    const handleUsernameChange=(e)=>{
      setUsername(e.target.value)
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
    if (!email || !password) {
      toast("Provide all fields",{
        position: "top-right",
        hideProgressBar : false,
        // theme: "dark",
        type: "error",
        closeOnClick: true,
      })
      return
    }
    setLoading(true)
    try {
      const response = await axios.post('/auth/register', {
        email,
        password,
        username,
        names
      });
      if(!response.data.success){
        setLoading(false);
        return toast(response.data.message,{position:'top-right',hideProgressBar:false,type:'error',closeOnClick:true})
      }
      else {
        setEmail('');
        setPassword('');
        const token = response?.data?.message;
      // console.log(token,"token")
      localStorage.setItem('token', token);
        setLoading(false);
        //redirect to dashboard
        navigate('/dashboard');
      }
      
    } catch (error) {
      console.log('catch error', error);
      setLoading(false);
      toast(error?.message || "An error occured",{
        position: "top-right",
        hideProgressBar : false,
        // theme: "dark",
        type: "error",
        closeOnClick: true,
      })
    }
    };

  return (
    <div className='pb-12'>
       <ToastContainer />
      {/* <h1 className='text-xl text-[#FF5353] font-black text-center my-12'>App Title</h1> */}
      <div className="flex iphone:flex-col justify-center h-[100vh]">
      <div className="w-1/2 iphone:w-full bg-gray-100 p-8">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center iphone:mt-4">Get started</h2>
          {/* <CustomInput inputType={'text'} label={"Full names"} value={fullname} handleChange={handlenames}/>
          <CustomInput inputType={'text'} label={"username"} value={username} handleChange={handleusername}/> */}
          <CustomInput inputType={'text'} label={"names"} value={names} handleChange={handleNamesChange}/>
          <CustomInput inputType={'text'} label={"username"} value={username} handleChange={handleUsernameChange}/> 
          <CustomInput inputType={'text'} label={"email"} value={email} handleChange={handleEmailChange}/> 
          <CustomInput inputType={'password'} label={"Password"} value={password} handleChange={handlePasswordChange}/>  
          <CustomButton text={"signup"} handleSubmit={handleSubmit} />
          <p className='mt-2 text-right'>Already have an account? <Link className='text-mainColor' to={'/'}>Login</Link> </p> 
        </form>
      </div>

      <div className="w-1/2 iphone:w-[98%]">
        <img src={loginVector} alt=""  className='ml-2 object-cover w-full h-full'/>
      </div>
    </div>
    </div>
  );
};

export default Signup;
