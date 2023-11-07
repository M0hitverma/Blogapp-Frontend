"use client"
import React, {useState} from 'react'
import { Navbar } from "@/components/Navbar/Navbar";
import './SigninStyle.css'
import Link from "next/link";
import { toast } from 'react-toastify';
import Image from 'next/image'
import logo from '@/assets/Screenshot 2023-10-30 at 8.44.54 PM.png'
// import { getCookie , setCookie } from 'cookies-next';
interface FormData {
  email: string;
  password: string;
};
export default function Signin() {
  const [formData,setFormData] =useState<FormData>({
    email:'',
    password:'',
  })
  
  const [errors, setErrors] =useState<Record<string,string>>({});
  const  handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
     const {name, value}= e.target;
     setFormData({
      ...formData,
      [name]:value,
  });
  };
  const handleSubmit =async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(formData);
    setErrors({});
    const validationErrors: Record<string,string>={};
     
    if(!formData.email){
      validationErrors.email= 'Email is required';
    }
    if(!formData.password){
      validationErrors.password='Password is required';
    }
    if(Object.keys(validationErrors).length>0){
      setErrors(validationErrors);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`,{
       method: 'POST',
       headers: {
        'Content-Type': 'application/json',
       },
       body: JSON.stringify(formData),
       credentials: 'include'
    })
    .then((res)=>{
       return res.json();
    })
    .then(async(response)=>{
      if(response.ok){
        toast(response.message,{
          type:'success',
          position:'top-right',
          autoClose: 2000
        })
       checkLogin();

      }else{
        toast(response.message,{
          type:'error',
          position:'top-right',
          autoClose: 2000
        });
      }
    })
    .catch((error)=>{
      toast(error.message,{
        type:'error',
        position:'top-right',
        autoClose: 2000
      });
    })
  
  }
  const checkLogin = async()=>{
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
    .then((res)=>{
      return res.json();
    })
    .then((response)=>{
        console.log(response);
        if(response.ok){
          toast(response.message,{
            type: 'success',
            position:'top-right',
            autoClose: 2000,
          })
         window.location.href ="/";
        }else{

        }
    })
    .catch((error)=>{
      console.log(error);
      
    })
     
  }

  return (
    <>
      
      <Navbar/>
     
      <div className="main-containersignin rounded-lg outline-none shadow-xl bg-indigo-500">

        <div className="left bg-white rounded-l-lg shadow-xl">
             <Image src={logo} alt="" className='left-image rounded-l-lg'/>
        </div>

        <div className="right">
            <form className="right-form font-mono" onSubmit={handleSubmit} >
                 
                <div className="form-input-contianer">
                    <label className="text-white font-semibold font-serif  ">Email:</label>
                    <div className='inputfield'>
                    <input className=" outline-none "  type="email"
                    placeholder="Enter Your Email"
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    />
                    {errors.email && <span className='text-orange-200 font-serif'>*{errors.email}</span>}
                    </div>
                </div>
                <div className="form-input-contianer ">
                  
                  <label className="text-white font-serif font-semibold">Password:</label>
                  <div className='inputfield'>
                    <input className=" outline-none " type="text"
                     placeholder="Enter Your Password"
                     name='password'
                     value={formData.password}
                     onChange={handleChange}
                     />
                     {errors.password && <span className='text-orange-200 font-serif'>*{errors.password}</span>}
                     </div>
                </div>
                
                <button className=" text-white font-semibold  bg-indigo-400 px-4 py-3  rounded shadow-xl hover:scale-95" type="submit" 
                >Login</button>
                <p className="text-white ">Don't have an account? <Link href="/pages/auth/signup" className="text-orange-200 hover:text-orange-300">Register</Link> </p>
                
            </form>
        </div>

      </div>
       
    </>
  )
}