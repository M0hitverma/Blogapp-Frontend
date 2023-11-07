"use client"
import React,{useEffect, useState} from 'react'
import Link from 'next/link'
import {BiUserCircle,BiPlus,BiSearchAlt,BiMenu} from 'react-icons/bi'
import './Navbarstyle.css';
import { toast } from 'react-toastify';

import Image from 'next/image';
import profilepic from '@/assets/profile.png'
import { deleteCookie } from 'cookies-next';
export const Navbar = () => {
    
 const [auth, setAuth]= useState<Boolean>(false);
 const [temp,setTemp]=useState<Boolean>(true);
  
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
      if(response.ok){
              setAuth(true);
      }
      else{

              setAuth(false);
              
      }
  })
  .catch((error)=>{
      toast(error.message,{
              type: 'error',
              position: 'top-right',
              autoClose: 2000
      })
  })
} 
useEffect(()=>{
        checkLogin();
     },[])


const handleLogout= async()=>{
  await deleteCookie('authToken');
  await deleteCookie('refreshToken');       
  window.location.href="/pages/auth/signin"
}


  return (

    <>
    <div  className='navbar flex flex-row justify-between px-10 drop-shadow-lg shadow-md'>

{/* ---left-div ---*/}
        <div className=' navbar-left flex flex-row gap-4 justify-center items-center'>
        <Link className='  navbar-left-icon-profile shadow-xl'  href="/"> <Image src={profilepic} alt="" className='profile-logo '/> </Link>  
         <Link className='navbar-left-icon-plus ' href="/pages/addblog"> <BiPlus/></Link>
          <Link className='navbar-left-icon-search '  href="/pages/search"><BiSearchAlt/></Link>
        </div>

{/* ---middle div --- */}
        {/* <div className='navbar-middle mx-auto my-auto text-indigo-400 font-mono font-extrabold  text-xl'>BLOG TOGETHER */}
{/*         
        </div> */}

         <div className='navbar-middle flex flex-row gap-8 justify-center items-center text-lg '>
            
            <Link className='navbar-middle-item text-slate-700' href="/">Home </Link>
             <Link  className='navbar-middle-item text-slate-700' href="/pages/about">About</Link>
             <Link className='navbar-middle-item text-slate-700' href="/pages/contact">Contact</Link>
             </div>


{/* --- right div --- */}

{ auth ? 
            
               <div className='flex items-center justify-center flex-row gap-4'>


                                <div className='right-menu' >
                                 <BiMenu className='menu-icon'/>
                                <div className='menu-list rounded-lg'>
                                <Link className='menu-item text-slate-700' href="/">Home </Link>
                                <Link  className='menu-item text-slate-700' href="/pages/about">About</Link>
                                <Link className='menu-item text-slate-700' href="/pages/contact">Contact</Link>
                                </div>
                                </div>


                <button  className="text-white bg-indigo-400 px-5 py-3 rounded-lg hover:scale-95 font-bold " onClick={handleLogout} >Logout</button>
                </div>
         
 
      :
         <div className='navbar-right flex fles-row gap-8 justify-center items-center text-xl'>
            <Link className='navbar-right-item' href="/pages/auth/signin">
                <button>Login</button>
            </Link>
            <Link className='navbar-right-item' href="/pages/auth/signup">
                <button>SignUp</button>
            </Link>
        </div> 
}


    </div>
    </>
  )
}
