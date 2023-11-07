"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

import { CategorieCard } from './CategorieCard';
type Category = {
  name: string;
  path: string;
}
const CategoriesSlider = () => {
  const [categories,setCategories]=useState<Category[]>([])
    // const categories=[
    //     {
    //         name:"Category 1",
    //         path:"#",
    //     },
    //     {
    //         name:"Category 2",
    //         path:"#",
    //     },
    //     {
    //         name:"Category 3",
    //         path:"#",
    //     },
    //     {
    //         name:"Category 4",
    //         path:"#",
    //     },
    //     {
    //         name:"Category 5",
    //         path:"#",
    //     },
    //     {
    //         name:"Category 6",
    //         path:"#",
    //     },
    //     {
    //         name:"Category 7",
    //         path:"#",
    //     },
    //     {
    //         name:"Category 8",
    //         path:"#",
    //     },
    //     {
    //         name:"Category 9",
    //         path:"#",
    //     },
    //     {
    //         name:"Category 10",
    //         path:"#",
    //     }
    // ];

  const getCategories = ()=>{
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/blogcategories`)
    .then((res)=>{
        return res.json();
    })
    .then(async(response)=>{
      const tempcat= await Promise.all(
        response.categories.map(async(category: string)=>({
          name: category,
          path: category,

        }))
      );
       setCategories(tempcat);

    })
    .catch((error)=>{
      console.log(error);
    })
  }
  useEffect(()=>{
    getCategories();
  },[])

    return (

    <div className="category-container">
            <h1 className=' text-center text-4xl  py-3 my-5 font-extrabold opacity-50 '>Categories</h1>
<Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >

       {categories.map((category)=>{
          return (
            <SwiperSlide
             className=' cursor-pointer'
             key={category.name} onClick={()=>{
              window.location.href=`/pages/category?category=${category.name}`
             }}> 
             <CategorieCard {...category}/>

             </SwiperSlide>
            
           )
        })}  
      </Swiper>
      
    </div>
  )
}

export default CategoriesSlider
