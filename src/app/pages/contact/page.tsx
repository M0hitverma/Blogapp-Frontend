"use client"
import { Navbar } from "@/components/Navbar/Navbar"
import './contactstyle.css'
import Image from "next/image"
import chatbot from '@/assets/chatbot.png'

import { useState } from "react"
import { toast } from "react-toastify"



export default function Home() {

  const [email,setEmail] =useState("");
  const [message,setMessage]=useState("");
  const [loading, setLoading]= useState(false);
const handlesubmit= ()=>{
  setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/contact`,{
       method: 'POST',
       headers:{
        'Content-Type' : 'application/json',
       },
       body:JSON.stringify({
        email: email,
        message: message,
       })
    })
    .then((res)=>{
      return res.json();
    })
    .then((response)=>{
      if(response.ok){
        setLoading(false);
         toast(response.message,{
          type:'success',
          position:'top-right',
          autoClose: 2000,
         })
         setEmail("");
         setMessage("");
      }
      else{
        setLoading(false);
        toast(response.message,{
          type:'error',
          position:'top-right',
          autoClose:2000,
        });
      }
    })
    .catch((error)=>{
      setLoading(false);
      toast(error.message,{
        type:'error',
        position: 'top-right',
        autoClose:2000,
      });

    })
}

    return (
      <main>
        <Navbar/>
 { loading && <div className="processing bg-teal-500 rounded-xl text-white text-xl shadow-3xl drop-shadow-2xl" >Processing...</div>}

        <div className="contact-container" >
          <div className=" drop-shadow-xl">
            <Image src={chatbot} alt=""/>
            </div>
            <form className="formcontainer rounded-xl">
              <input
               type="text"
               value={email}
               onChange={(e)=>{
                setEmail(e.target.value)
               }}
                placeholder="Your Email"
                 required
                 className="mail drop-shadow-xl"
                 />
              <textarea
               placeholder="Drop us a message!"
               value={message}
               onChange={(e)=>{
                setMessage(e.target.value);
               }}
               className="msgcnt drop-shadow-xl shadow-xl rounded-2xl p-4"
                rows={7}  />
            </form>
             <div className="submitbtn rounded-full bg-emerald-600 drop-shadow-md" 
             onClick={handlesubmit}
             >
              <div className="inner1 rounded-full bg-emerald-500 drop-shadow-md">
                <div className="inner2 rounded-full bg-emerald-400 drop-shadow-md">
                  <div className="inner3 rounded-full bg-emerald-300 drop-shadow-md">

                  </div>
                </div>
              </div>
             </div>
        </div>
      </main>
    )
  }