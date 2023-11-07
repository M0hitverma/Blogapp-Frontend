"use client"
import { Navbar } from "@/components/Navbar/Navbar"
import './addblogStyle.css'
import { RiSendPlaneFill} from "react-icons/ri"
import { toast } from "react-toastify"
import ClockLoader from 'react-spinners/ClockLoader'
import { getCookie,setCookie } from "cookies-next"
import { useEffect, useState } from "react"
// import CategoriesSlider from "@/components/Categories/CategoriesSlider"
import {AiFillCloseCircle} from 'react-icons/ai'
// import { describe } from "node:test"

interface ParagraphData {
  title: string;
  description: string;
  image: File| null;
  imageUrl : string;
  position: string;
  createdAt: Number | null;
};
interface FormData{
  title: string;
  description: string;
  image: File | null;
  imageUrl: string;
  paragraphs: ParagraphData[];
  category: string;
};

export default function AddBlog() {

  const [loading, setLoading]=useState(false);

  const checkLogin = async()=>{

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
    .then((res)=>{
      return res.json();
    })
    .then((response)=>{
      console.log(response);
      if(response.ok){

      }
      else{
         window.location.href="/pages/auth/signin";
      }
    })
    .catch((error)=>{
      console.log(error) ;
      window.location.href="/pages/auth/sigin";
    })

  }
 useEffect(()=>{
  checkLogin();
 },[]);



  const [blog,setBlog]=useState<FormData>({
    title: '',
    description: '',
    image: null,
    imageUrl: '',
    paragraphs: [],
    category: '',
  })

  const [paragraphForm, setParagraphForm]=useState<ParagraphData>({
    title: '',
    description: '',
    image: null,
    imageUrl: '',
    position: '',
    createdAt: null,
  })
  
  const [categories,setCategories]=useState<string[]>([]);

  const getCategories =() =>{
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/blogcategories`)
  .then((res)=>{
    return res.json();
  })
  .then((response)=>{
      setCategories(response.categories);
  })
  .catch((error)=>{
    console.log(error);
  });
}
  useEffect(()=>{
     getCategories();
  },[]);

  const pushParagraphToBlog = ()=>{

    let temppg= paragraphForm;
    temppg.createdAt=new Date().getTime();

    setBlog({
         ...blog,
         paragraphs: [
          ...blog.paragraphs,
          paragraphForm
         ]
    })

    let nextPosition = String(parseInt(paragraphForm.position)+1);
  setParagraphForm({
    ...paragraphForm,
    title:'',
    description:'',
    position: nextPosition,
    createdAt: null,

  })

  }

  const sortParagraphs = (a: ParagraphData, b: ParagraphData)=>{
        // if(a.position==b.position){
        //   return (b.createdAt! - a.createdAt! );
        // }
        return a.position.localeCompare(b.position);
  }

  const deleteParagraph = (paragraph: ParagraphData)=>{
     const updatedParagraphs = blog.paragraphs.filter((p)=> p.createdAt!==paragraph.createdAt);

     setBlog({
      ...blog,
      paragraphs:updatedParagraphs,
     });
  }

  const uploadImage= async(image: File)=>{
     try{
         const formData = new FormData();
         formData.append('myimage',image);
         const response =await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/image/uploadimage`,{
          method: 'POST',
          body:formData,
         });
         if(response.ok){
                 const data=await response.json();
                console.log('Image uploaded successfull',data);
                return data.imageUrl;


         }else{
           console.log('Failed to upload the image');
           return null;
         }
     }catch(error){
      console.error('Error: ',error);
      return null;
     }

  }

  const uploadBlog = async()=>{
    checkLogin();
    if(!blog.title || !blog.description || !blog.category){
      toast('Please fill all required fields.',{
        type:'error',
        position:'top-right',
        autoClose: 2000,
      });
      return ;
    }
    setLoading(true);

     let tempblog=blog;
     if(blog.image){
      let imgUrl = await uploadImage(blog.image);
      tempblog.imageUrl=imgUrl;
     }
     for(let i=0;i<tempblog.paragraphs.length; i++){
       let tempimg= tempblog.paragraphs[i].image;
       if(tempimg){
        let imgURL = await uploadImage(tempimg);
        tempblog.paragraphs[i].imageUrl=imgURL;
       }
     }
console.log("Before upload",blog);
     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/blog`,{
      method: 'POST',
      headers: {
         'Content-Type' : 'application/json',
      },
      body: JSON.stringify(blog),
      credentials: 'include'

     });
     if(response.ok){
      const data= await response.json();
      toast('Blog post created Successfully');
      setLoading(false);
     }
     else{
      console.log(response);
       toast('Failed to create the blog post')
       setLoading(false);
     }

  }



    return (
      <>
         <Navbar/>
       { 
        loading ?
       <div className="loaderfullpage">
     <ClockLoader
        color='#509FD4'
         loading={loading}
         size={150}
         aria-label="Loading Spinner"
         data-testid="loader"
           />
        </div>
        :
     
        <div className="addblogmaincontaine ">
        
        <div className=" flex flex-row text-3xl justify-center items-center">
         <RiSendPlaneFill className=" -rotate-45 text-4xl mt-3"/><h1>dd Blog</h1></div>
        <div className="addblogcontainer font-serif rounded-md shadow-xl  ">

          <form className=" flex flex-col gap-14 p-10" >

             <div className="forminput-cont gap-24">
              <label className="font-serif" >Blog Title:</label>
              <input  className="rounded-lg px-3 py-2 outline-none border-none shadow-md w-80"
               type="text"
              placeholder="Enter Blog Title"
                value={blog.title}
                onChange={(e)=>{
                    setBlog({...blog,title:e.target.value});
                }}
                ></input>
             </div>

             <div className="forminput-cont gap-4">
                <label>Blog Category: </label>
                <select 
                value={blog.category}
                onChange={(e)=>  setBlog({...blog,category: e.target.value})}
               className="mt-2 ml-10"
                >
                  <option value="">Select a category</option>
                  { categories.map((category)=>(
                     <option key={category} value={category}>
                       {category}
                     </option>
                  ))
                  } 
                </select>

             </div>

             <div className="forminput-cont gap-4">
              <label>Blog Description:</label>
              <textarea  className="rounded-lg px-3 py-2 outline-none border-none shadow-md ml-3" rows={4} cols={30}
              placeholder="Enter Blog Title"
              value={blog.description}
              onChange={(e)=>setBlog({...blog,description:e.target.value})}
               />
             </div>
             <div className="forminput-cont gap-[5.5rem]">
              <label>Blog Image:</label>
              <input className="rounded-lg px-3 py-2 bg-indigo-200 outline-none border-none shadow-md" 
              type="file"
              onChange={(e)=>{
                const selectedImage=e.target.files?.[0];
                if(selectedImage){
                  setBlog({...blog,image:selectedImage});
                }
              }}
              />
              </div>


              <div className="Show-Paragrap-container">
                {
                  blog.paragraphs.sort(sortParagraphs).map((paragraph)=>(

                    <div key={String(paragraph.createdAt)} className="main-section">
                    <AiFillCloseCircle className="closebtn" onClick={()=>{
                      deleteParagraph(paragraph);
                     }} 
                     />
                     
                     <div className="sectioin1">
                          <h1>{paragraph.title}</h1>
                          <p>{paragraph.description}</p>

                          {paragraph.image && <img 
                          src={URL.createObjectURL(paragraph.image)}
                          alt={`Image for ${paragraph.title}`}
                          />
                          }
                     </div>
                     </div>
                  ))
                }

              </div>

              
             

             <div className="paragraph flex flex-col gap-14 border-t-2  border-b-2 py-14 ">

              <div className="forminput-cont gap-4">
                     <label>Paragraph Position:</label>
                     <input type='number'
                       className="bg-indigo-200 px-5 py-2 rounded-md text-white text-xl font-bold  ml-11 "
                     value={paragraphForm.position}
                 
                   
                     onChange={(e)=>
                       setParagraphForm({
                        ...paragraphForm,
                        position:e.target.value
                       })
                     }
                     />
              </div>

             <div className="forminput-cont gap-24">
              <label>Paragraph Title:</label>
              <input className="rounded-lg px-3 py-2 outline-none border-none shadow-md w-80 "
               type="text"
                placeholder="Enter Blog Title"
                value={paragraphForm.title}
                onChange={(e)=> setParagraphForm({
                  ...paragraphForm,
                  title: e.target.value
                }) }
                ></input>
             </div>

             <div className="forminput-cont gap-4">
              <label>Paragraph Description:</label>
              <textarea rows={8} cols={50} className="rounded-lg px-3 py-2 outline-none border-none shadow-md ml-3"
               placeholder="Enter Paragraph Description"
               value={paragraphForm.description}
               onChange={(e)=> setParagraphForm({
                ...paragraphForm,
                description: e.target.value
               })}
               />
             </div>

             <div className="forminput-cont gap-24">
              <label>Paragraph Image:</label>
              <input className="rounded-lg px-2 bg-indigo-200 py-2 outline-none border-none shadow-md" type="file"
              id='pgimg'
              onChange={(e)=>{
                const selectedImage = e.target.files?.[0];
                if(selectedImage){
                  setParagraphForm({
                    ...paragraphForm,
                    image: selectedImage
                  })
                }
              }}
              
              />
             </div>

             <button className="rounded-md bg-white outline-none shadow-md w-fit m-auto px-5 py-2 hover:text-indigo-400 font-bold" type="button"
             onClick={(e)=>{
              e.preventDefault();
               pushParagraphToBlog();
             }}
             >Add Paragraph To Blog</button>

             </div>
             <div className="btncontainer">
        <button className=" submitbtn font-bold bg-indigo-400 px-6 py-4 rounded-md shadow-lg font-mono hover:scale-90" 
        onClick={(e)=>{
          e.preventDefault();
          uploadBlog();

        }}
        >Submit</button>
        </div>
          </form>
        </div>
       
        </div>
}

      </>
    )
  }