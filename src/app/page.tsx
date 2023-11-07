"use client"
import { BlogSlider } from '@/components/BlogCard/BlogSlider'
import CategorySlider from '@/components/CategorySlider/CategorySlider'
import { Footer } from '@/components/Footer/Footer'
import HomeSlider from '@/components/Homeslider/Homeslider'
import { Navbar } from '@/components/Navbar/Navbar'
import Image from 'next/image'
import { useEffect , useState } from 'react'



export default function Home() {

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
        }
        else{
                window.location.href="/pages/auth/signin"
        }
    })
    .catch((error)=>{
      window.location.href="/"
    })
  } 
  useEffect(()=>{
          checkLogin();
       },[])
  



  return (
    <main className="">
    <Navbar/>
    <HomeSlider/>
    <CategorySlider/>
    <BlogSlider/>
    <Footer/>
    </main>
  )
}
