import React,{useEffect, useState} from 'react'
import {useDispatch } from 'react-redux'
import { Link ,useNavigate} from 'react-router-dom';
import { login } from '../../redux/authSlice';
import axiosApi from '../../axios/api';
const Login = ({}) => {
    const dispatch=useDispatch();
    const Navigate=useNavigate();
    const [formData,setFormData]=useState({
        email:'',
        password:''
    });
    const [showDialog,setShowDialog]=useState(false);
    const [showEmail,setShowEmail]=useState(false);
    const handleInputChange=(e)=>{
        const {name,value}=e.target;     
        setFormData({
            ...formData,
         [name]:value
        })
    };

    const handleFormSubmit=async (e)=>{
        e.preventDefault();
        dispatch(login(formData));
        if(!showDialog){
          const timer=setTimeout(()=>{
            Navigate('/dashboard');
         },1000)
        }
    };

    useEffect(()=>{
      if(showDialog){
        const timer=setTimeout(()=>{
           Navigate('/');
        },5000)
      }
    },[showDialog]);

    const handleReset= async(e)=>{
        try{
           e.preventDefault();
           if(!formData.email){
            setShowEmail(true);
            return;
           }
           const body=JSON.stringify({email:formData.email});
           const res=await axiosApi.post('user/auth/forgot-password',body);
           if(res.status===200){
              setShowDialog(true);
           }
        }catch(err){
          console.error(err.message);
        }
    };

  return (
<div>
      <div className="font-bold shadow hover:shadow-md hover:bg-blue-200 text-2xl border-2 text-center w-fit border-blue-200 rounded mx-auto mb-10 mt-6 p-4 h-16 flex items-center justify-center">
        ManageMate
      </div>
      <div className="w-full max-w-md mx-auto border-2 shadow rounded-lg p-6 bg-white">
        <form className="mx-2" onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border-2 border-gray-300 rounded-md p-2 mt-1 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium">Password:</label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border-2 border-gray-300 rounded-md p-2 mt-1 focus:border-blue-500 focus:ring-blue-500"
              required
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-blue-500 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </button>
            </div>
            {showEmail && (
              <div className="text-red-500 mt-2">
                Enter your email to reset password & click Forgot!
              </div>
            )}
          </div>
          {showDialog && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white border-2 text-center border-gray-700 rounded-md p-10 m-4">
                <h2 className="text-xl font-bold mb-4">Password Reset Link</h2>
                <p className="mb-4">
                  A password reset link has been sent to your email. Please click the link to reset your password.
                </p>
                <Link to="/">
                  <button className="bg-blue-600 text-white w-28 h-10 rounded hover:bg-blue-700">
                    Home
                  </button>
                </Link>
              </div>
            </div>
          )}
          <div className="my-5 text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 focus:bg-blue-800 w-28 h-10 text-xl font-medium rounded"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
