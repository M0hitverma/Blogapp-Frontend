"use client"
import { BlogSlider } from '@/components/BlogCard/BlogSlider'
import CategorySlider from '@/components/CategorySlider/CategorySlider'
import { Footer } from '@/components/Footer/Footer'
import HomeSlider from '@/components/Homeslider/Homeslider'
import { Navbar } from '@/components/Navbar/Navbar'
import Image from 'next/image'
import { useEffect , useState } from 'react'



export default function Home() {




  return (
    <main className="">
    <Navbar key={1}/>
    <HomeSlider key={2}/>
    <CategorySlider key={3}/>
    <BlogSlider key={4}/>
    <Footer key={5}/>
    </main>
  )
}
