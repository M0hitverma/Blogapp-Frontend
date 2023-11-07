"use client"
import React, { useRef, useState ,useEffect} from 'react';
import { Mousewheel, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import img  from '@/assets/peakpx-2.jpg'
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';
import Image from 'next/image';
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

const HomeSlider = () => {
  const [blogs,setBlogs] = useState<Blog[]>([]);
  // const [tempblogs,setTempBlogs]= useState<Blog[]>([]);
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

        setBlogs(response.data.blogs);
        // for(let i=1;i<=3 && i<response.data.blogs.length;i++){
            
        //     setTempBlogs([
        //       ...tempblogs,
        //       response.data.blogs[i]]) ;
        // }
     
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
    <div className='maincontainer'>
        <Swiper
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
      >
       {
         blogs.length>0 &&  blogs.map((blog)=>{
          return (
                 <SwiperSlide key={blog._id}  > 
               {  blog.imageUrl.length>0 && <Image src={blog.imageUrl} alt={blog.title} height={100} width={1000} /> }
                 <div className='titlecontainer rounded-lg  shadow-2xl'>
                 <p className='title text-black text-4xl font-extrabold '>{blog.title}</p>
                 <p className='titlecat text-zinc-300 font-extrabold opacity-75 rounded-md '>{blog.category}</p>

                 </div>
               
                  </SwiperSlide>
          )
         })
       }
      </Swiper>




    </div>
  )
}

export default HomeSlider
