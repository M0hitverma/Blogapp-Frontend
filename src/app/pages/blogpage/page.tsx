"use client"
import React,{FC, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import Image from 'next/image'
// import {Footer }from '@/components/Footer/Footer'
import { Navbar } from "@/components/Navbar/Navbar"
// import { getCookies } from 'cookies-next'
import ClockLoader from 'react-spinners/DotLoader'
import './blogpagestyle.css'
import { constrainedMemory } from 'process'
import { Footer } from '@/components/Footer/Footer'

interface ParagraphData{
    _id:string,
    title: string,
    description: string,
    imageUrl: string,
    position: string,
    createdAt: Number | null;
  }
  interface Blog{
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    paragraphs: ParagraphData[];
    category: string;
    owner:string;
    createdAt: string;
    updatedAt: string;
  }
export default function Blogpage() {

    const searchParams = useSearchParams();
    const blogid= searchParams.get('blogid');
    const [blog, setBlog]=useState<Blog>({
        _id:'',
        title: '',
        description: '',
        imageUrl:'',
        paragraphs:[],
        category:'',
        owner:'',
        createdAt:'',
        updatedAt:'',
    });
const  [loading,setLoading]=useState(false);
const [blogcreatedat, setBlogcreatedat]=useState<String>('');

const getBlogbyId =()=>{
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/blog/${blogid}`,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((res)=>{
        return res.json();
    })
    .then((response)=>{
        setLoading(false);
        if(response.ok){
         setBlog(response.data.blog);
        let cdate= response.data.blog.createdAt;
         let tempdate  = formatDate(cdate);
         setBlogcreatedat(tempdate);
       
        }
        else{    
            toast(response.message,{
                type:'error'
            })
        }
    })
    .catch((error)=>{
        setLoading(false);
        toast(error.message,{
            type:'error',
        })
    })
}

useEffect(()=>{
        getBlogbyId();
        window.scrollTo(0,0);
},[])

function formatDate(inputDate: string){
    const date= new Date(inputDate);
    const day= date.getDate();
    const monthNames=[
        'January','February','March','April',
        'May','June','July','August','September',
        'October','November','December'
    ]
    const monthIndex= date.getMonth();
    const year  = date.getFullYear();
    return `${day} ${monthNames[monthIndex]} ${year}`;
}

    return (
      <div >
             <Navbar/>
         <div className='blogpg-container'>
        {loading && blog._id == '' ?
         <div className='loaderfullpage'>
            <ClockLoader
            color='#36d7b7'
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid='loader'
            />
             </div>
             :
        <div className='blogpage shadow-xl '>

            <div className='c1 rounded-lg'>
             <p className='blogdate tracking-tighter '>Created at {blogcreatedat}
             </p>
             <div className='blogtitle'>
             <p className='text-4xl '>{blog.title}</p>
             <p className=' text-xs opacity-100 text-gray-200  font-extrabold font-sans '>{blog.category}</p>
             </div>
            { blog.imageUrl.length>0 && <Image className="blogimg" src={blog.imageUrl} alt={blog.title} width={100} height={100} unoptimized/>}
            <div className='descriptioncontainer'>
            
            <div className="trigger bg-indigo-300  shadow-2xl rounded-full">
                <div className='insidetrigger1 bg-indigo-400  rounded-full'>
                <div className='insidetrigger2 rounded-full bg-indigo-500'>
                <div className='insidetrigger3 rounded-full bg-indigo-600'></div>
                </div>
                </div>
            </div>
            <p className='blogdescription rounded-md font-serif font-semibold hide'>{blog.description}</p>
            
             </div>
            </div>
            
            {
                blog.paragraphs.map((paragraph: ParagraphData, index)=>(

                    <div className= {index%2==0? 'c2left rounded-l-lg' : 'c2right rounded-r-lg'} key={index}>

                        { paragraph.imageUrl.length>0 &&  <Image src={paragraph.imageUrl} alt={paragraph.title} width={100} height={100} className="paragraph-img " unoptimized/>}

                        <div className='paragraph-td drop-shadow-lg'>
                            <p className=' font-bold font-sans text-lg '>{paragraph.title}</p>
                            <p className=' font-bold  text-md text-justify text-opacity-70 p-4 text-black  font-mono '>{paragraph.description}</p>
                        </div>
                        
                    </div>
                ))
            }

        </div>
         } 
         </div> 
       <Footer/>
      </div>
    )
  }

