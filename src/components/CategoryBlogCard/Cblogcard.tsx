import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import './Cblogcardstyle.css'
import Image from 'next/image'
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


const Blogcard = (data: Blog) => {
   const {title , imageUrl, _id}=data;

  return (
        
       <div className='blogcard rounded-md shadow-2xl ' 
       onClick={()=>{
        window.location.href=`/pages/blogpage?blogid=${_id}`;
       }}
       >
       
        <div className='blogimg rounded-md ' 
        style={{
          backgroundImage:`url(${imageUrl})`
        }}>   </div>
       <p className='blogtitle '>{title}</p>
    
       </div>

  )
};

export default Blogcard;
