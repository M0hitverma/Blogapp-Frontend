"use client"
import { Navbar } from "@/components/Navbar/Navbar"
import { useSearchParams } from 'next/navigation'
// import {Footer }from '@/components/Footer/Footer'
import { toast } from "react-toastify"
import { useState ,useEffect} from "react";
import Image from "next/image";
import Blogcard from '@/components/CategoryBlogCard/Cblogcard'
import './categorystyle.css'
import { PuffLoader } from "react-spinners";
import errorImage from '@/assets/error.jpg'
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
  
export default function Category() {

    const [blogs,setBlogs] = useState<Blog[]>([]);
    const searchParams = useSearchParams();
    const category= searchParams.get('category');
   const [loading, setLoading]= useState(true);
    const get10latestblogs=()=>{
     
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/blog/category/${category}`,{
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
           if(response.data.blogs.length==0){
            toast("No data Found",{
              type:'error',
              position:'top-right',
              autoClose:2000
            })
           }
           setLoading(false);
         }
         else{
           toast(response.message,{
             type:'error',
             position:'top-right',
             autoClose: 2000,
           })
           setLoading(false);
         }
        })
        .catch((error)=>{
            toast(error.message,{
             type:'error',
            })
            setLoading(false);
        })
     }
     useEffect(()=>{
       get10latestblogs();
     },[])
   
    
    return (
      <main>
        <Navbar/>
        <div className="category-container  ">




        <h1 className="text-center font-extrabold text-3xl mb-10">{category}</h1>
  {loading?
   <div className='loaderfullpage'>
   <PuffLoader
   color='#36d7b7'
   loading={loading}
   size={150}
   aria-label="Loading Spinner"
   data-testid='loader'
   />
    </div>

  :
  <div>
    { blogs.length>0 ?
        <div className="flex flex-row justify-center items-center gap-3 py-5">
          {blogs.map((blog)=>{
              return(
                  <Blogcard key={blog._id} {...blog}/>
              )
          })}
      </div>

      :

      <Image src ={errorImage} alt="No data found" className="errorimage " />
       }
</div>

      }
        </div>
        {/* <Footer/> */}
      </main>
    )
  }