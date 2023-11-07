import React from 'react';
import './CardStyle.css';


interface Category{
    name: string,
    path: string,
}


export const CategorieCard = (data:Category) => {
    const {name,path}=data;
  return (
    <div className='contanier1 bg-indigo-200 hover:bg-indigo-300 rounded-xl mb-10 font-mono  font-semibold drop-shadow-md'
    // onClick={()=>{
    //   window.location.href=`/pages/category?category=${name}`;
    //  }}
    >

        <div className='card1  flex items-center justify-center'>
        <h1>{name}</h1>
        </div>
     
    </div>
  )
}
