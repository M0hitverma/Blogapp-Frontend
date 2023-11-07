"use client"
import { Navbar } from "@/components/Navbar/Navbar"
import Image from "next/image"
import headimg from '@/assets/towpeople.png'
import './aboutstyle.css'
// import { Footer } from "@/components/Footer/Footer"
import secitionlogo from '@/assets/papers.png'
import { Footer } from "@/components/Footer/Footer"
export default function Home() {
    return (
      <main>
        <Navbar/>
        <div className="about-container">
          <div className="about-head">
            <Image src={headimg} alt="" className="head-img"/>
            <div className="head-content">
              <p> Hey there !  </p>
              <p>Step into a</p>  
              <p>World of endless</p>
              <p>inspiration</p>
              <p>at our blog's </p>
              <p>doorstep</p>  
              <p>We're thrilled </p>
              <p>to have </p> 
              <p> you here</p>
              <p>- where words </p>
              <p>meet wisdom</p>
               </div>
          </div>
          <div className="text-white section1">
           <div className="section-img"> <Image src={secitionlogo} alt="" /> </div>
            <p className=" text-justify ">Your voice matters. We love hearing from you, whether it's your thoughts, questions, or even your own experiences. So don't be shy; join the conversation! Leave comments, share your stories, and connect with us on our social media channels.</p></div>
     
        </div>
        <Footer/>
      </main>
    )
  }