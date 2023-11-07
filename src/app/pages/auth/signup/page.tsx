"use client"
import React ,{useState} from 'react';
import { Navbar } from "@/components/Navbar/Navbar";
import './SignupStyle.css'
import Link from "next/link";
import {toast} from 'react-toastify';
import Image from 'next/image'
import leftlogo from '@/assets/3236267.jpg'
interface FormData{
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {

 
 const [formData,setFormData]=useState<FormData>({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
 });

const [errors, setErrors]= useState<Record<string,string>>({});


const handleChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
     const {name, value}=e.target;
     setFormData({
      ...formData,
      [name]:value,
     });
};

const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  // console.log(process.env.NEXT_PUBLIC_BACKEND_API);
   console.log(formData);
  setErrors({});

   const validationErrors: Record<string,string> ={};
  if(!formData.email){
     validationErrors.email='Email is required';
  }
  if(!formData.password){
    validationErrors.password='Password is required';
  }
  if(formData.password!==formData.confirmPassword){
       validationErrors.confirmPassword='Passwords do not match';
  }
  if(Object.keys(validationErrors).length>0){
    setErrors(validationErrors);
    return;
  }
  
  
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/register`,{
    method:'POST',
    headers: {
       'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  }).then((res)=>{
    return res.json();
  })
  .then((response)=>{
    if(response.ok){
      toast(response.message,{
        type: 'success',
        position: 'top-right',
        autoClose: 2000
      });
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
       });

    }else{
       toast(response.message,{
        type:'error',
        position: 'top-right',
        autoClose: 2000
       });
    }
  })
  .catch((error)=>{
     toast(error.message,{
      type: 'error',
      position:'top-right',
      autoClose: 2000
     });
  })
}

  return (
    <>
      
      <Navbar/>
     
      <div className="main-container rounded-md outline-none shadow-xl  bg-indigo-500">

        <div className="left  bg-white rounded-l-md flex items-center justify-center  ">
        <Image src={leftlogo} alt="" className='left-logo rounded-l-md'/>
        </div>

        <div className="right">
            <form className="right-form font-mono" onSubmit={handleSubmit} >

                <div className="form-input-contianer">
                    <label className="text-white font-semibold font-serif ">Name:</label>
                    <input className=" outline-none" 
                    type="text"
                    placeholder="Enter Your Name"
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                     />
                     {errors.name && <span>{errors.name}</span>}
                </div>

                <div className="form-input-contianer">
                    <label className="text-white font-serif font-semibold">Email:</label>
                    <div className='inputfield'>
                    <input className=" outline-none "  
                    type="text"
                    placeholder="Enter Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                     />
                     {errors.email && <span className='font-serif text-orange-200'>*{errors.email}</span>}
                     </div>
                </div>

                <div className="form-input-contianer">
                    <label className="text-white font-serif font-semibold">Password:</label>
                    <div className='inputfield'>
                    <input className=" outline-none " type="password"
                    placeholder="Enter Your Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    />
                    {errors.password && (<span className='font-serif text-orange-200'>*{errors.password}</span>)}
                    </div>
                </div>

                <div className="form-input-contianer">
                    <label className="text-white font-serif font-semibold">Confirm Password:</label>
                    <input className=" outline-none " type="password"
                    placeholder="Enter Your Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    />
                  {errors.confirmPassword && (
                  <span>{errors.confirmPassword}</span>)}
                </div>

                <button className=" text-white font-semibold  bg-indigo-400 px-4 py-3 rounded shadow-xl hover:scale-95" type="submit">Register</button>

                <p className="text-white ">Already have an account? <Link    className="text-orange-200 hover:text-orange-300 " href="/pages/auth/signin">Login</Link> </p>
                
            </form>
        </div>

      </div>
       
    </>
  )
}