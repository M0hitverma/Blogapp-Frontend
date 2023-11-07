"use client"
import React, { useEffect, useState } from 'react'
import Blogcard from './Blogcard'
import { toast } from 'react-toastify';

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

export const BlogSlider = () => {
  const [blogs,setBlogs] = useState<Blog[]>([]);
  const get10latestblogs=()=>{
     fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/blog`,{
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
        console.log(response);
        setBlogs(response.data.blogs);
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
  useEffect(()=>{
    get10latestblogs();
  },[])

  return (
    <div className='lblogcontianer flex flex-col justify-center items-center '>
        <h1 className="mt-14 text-4xl opacity-50 font-extrabold   ">Latest Blogs</h1>
        
        <div className='flex flex-wrap flex-row px-2 gap-8 justify-center items-center py-10  '>

            {blogs.map((blog)=>{
              return (
                   <Blogcard key={blog._id} {...blog}/>
              )
            })}
       

        </div>
    
    </div>
  )
}
