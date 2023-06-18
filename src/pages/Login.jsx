import { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import 'react-toastify/dist/ReactToastify.css';
import loginVector from '../assets/desiredVector.avif'
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading,setLoading]=useState(false)
  const handlePassword=(e)=>{
    setPassword(e.target.value)
  }
  const handleEmail=(e)=>{
    setEmail(e.target.value)
  }
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/dashboard")
    }
  })
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
      const response = await axios.post('/auth/login', {
        email,
        password,
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
    <div>
      <ToastContainer />
      {/* <h1 className='text-xl text-[#FF5353] font-black text-center my-12'>App Title</h1> */}
      <div className="flex iphone:flex-col justify-center h-[100vh]">
      <div className="w-1/2 iphone:w-full bg-gray-100 p-8">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center iphone:mt-4">Login</h2>
          {/* <CustomInput inputType={'text'} label={"Full names"} value={fullname} handleChange={handlenames}/>
          <CustomInput inputType={'text'} label={"username"} value={username} handleChange={handleusername}/> */}
          <CustomInput inputType={'text'} label={"Email"} value={email} handleChange={handleEmail}/>
          <CustomInput inputType={'password'} label={"Password"} value={password} handleChange={handlePassword}/> 
          <CustomButton text={"Login"} handleSubmit={handleSubmit} />
          <p className='mt-2 text-right'>Don't have an account? <Link className='text-mainColor' to={'/signup'}>Signup</Link> </p> 
        </form>
      </div>

      <div className="w-1/2 iphone:w-[98%]">
        <img src={loginVector} alt=""  className='ml-2 object-cover w-full h-full'/>
      </div>
    </div>
    </div>
  );
};

export default Login;
