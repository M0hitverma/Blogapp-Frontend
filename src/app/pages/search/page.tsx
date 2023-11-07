"use client"
import { Navbar } from "@/components/Navbar/Navbar"
import { useState,useEffect } from "react"
import { toast } from 'react-toastify'

import "./searchstyle.css"
import { BiSearchAlt} from 'react-icons/bi'
import Blogcard from '@/components/CategoryBlogCard/Cblogcard'
import ClockLoader from 'react-spinners/BarLoader'

interface ParagraphData{
  title: string,
  description: string,
  image: File | null;
  imageUrl: string,
  position: string,
  createdAt: Number | null;
}
interface Blog{
  _id: string;
  title: string;
  description: string;
  image: File| null;
  imageUrl: string;
  paragraphs: ParagraphData[];
  category: string;
}

export default function Home() {
  const [blogs,setBlogs] = useState<Blog[]>([]);
 const [loading,setLoading]= useState(false)
  const [name,setName]= useState<string>("");

  const get10latestblogs=()=>{
     setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/search/${name}`,{
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
     }
    })
    .then((res)=>{
     return res.json();
    })
    .then((response)=>{
     if(response.ok){

       setBlogs(response.data.blogs);
       setLoading(false);

      if(response.data.blogs.length===0){toast('Blog not Found',{
        type:'error',
        position:'top-right',
        autoClose: 2000,
      })
    }

     }
     else{
       toast(response.message,{
         type:'error',
         position:'top-right',
         autoClose: 2000,
       })

     }
    })
    .catch((error)=>{
        toast(error.message,{
         type:'error',
        })
    })
 }
 
  
    return (
      <main>
        <Navbar/>
         <div className="search-container flex justify-center flex-col">
          <div className="s-top pt-10" >
          <div className=" search-field-container rounded-2xl shadow-md">
          <input 
           type="text"
           placeholder="Search"
           value = {name}
           onChange={(e)=>{
                setName(e.target.value);
           }}
           className=" searchfield "
           />
           <BiSearchAlt 
            className="icon"
           onClick={()=>{
            get10latestblogs();
           }}
           />
         
              </div>
           </div>
       
{ loading ?
             <div className='loaderfullpages opacity-80'>
            <ClockLoader
            color='#000000'
            loading={loading}
            height={3}
            width={380}
            aria-label="Loading Spinner"
            data-testid='loader'
            />
              </div>
              :
            <div className="s-bottom flex flex-row justify-center items-center gap-3 pt-10 ">
            
            {blogs.map((blog)=>{
                return(
                    <Blogcard {...blog}/>
                )
            })}
        </div>
}
        
         </div>
      </main>
    )
  }