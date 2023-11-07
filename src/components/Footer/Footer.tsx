import Link from 'next/link'
import React from 'react'
import './FooterStyle.css'
import {FaFacebookF,} from 'react-icons/fa'
import {BsInstagram,BsTwitter,BsYoutube,BsGithub} from 'react-icons/bs'

export const Footer = () => {
  return (
    <div className='footer-maincontainer flex flex-row '>

      <div className=' footer-left flex flex-col '>

        <div className='left-top flex flex-row font-sans'>

        <div className='left-top-item text-lg'>
        <Link href='/'>FIND A BLOG</Link>
        <Link href='/' className=' '>BECOME A MEMBER</Link>
        <Link href='/'>SIGN UP FOR MAIL</Link>
        <Link href='/'>SEND US FEEDBACK</Link>
        <Link href='/'>HOT BLOGS</Link>

        </div>
        <div className='left-top-item'>
        
        <Link href='/' className=' '>GET HELP</Link>
        <Link href='/' className=' lightitems'>Writing</Link>
        <Link href='/' className='lightitems'>Posting</Link>
        <Link href='/' className='lightitems'>Add blog</Link>
        <Link href='/' className='lightitems'>Authenticaiton</Link>
        <Link href='/' className='lightitems'>Contact Us</Link>


        </div>
        <div className='left-top-item'>
        
        <Link href='/' className=' '>About US</Link>
        <Link href='/' className='lightitems'>News</Link>
        <Link href='/' className='lightitems'>Careers</Link>
        <Link href='/' className='lightitems'>Inverstors</Link>
        <Link href='/' className='lightitems'>Network</Link>
        </div>
       
        </div>

        <div className='left-bottom'>
          <h1 className='lightitems'>© Blog, Inc. All Rights Reserved</h1>
        </div>
        
      </div>


      <div className='footer-right flex flex-col gap-5 justify-between '>

        <div className='right-top flex flex-row'>
            <Link className=' right-icon p-3 rounded-full' href=""><FaFacebookF /></Link>
            <Link href="" className='right-icon p-3 rounded-full'><BsTwitter /></Link>
            <Link href="" className='right-icon p-3 rounded-full'><BsGithub /></Link>
            <Link href="" className='right-icon p-3 rounded-full'><BsYoutube /></Link>
            <Link href="" className='right-icon p-3 rounded-full'><BsInstagram /></Link>
        </div>
        <div className='right-bottom flex flex-row gap-4 justify-center '>
          <Link href=''>Search</Link>
          <Link href=''>+ New-BLog</Link>
          <Link href=''>Contact</Link>
          <Link href=''>About</Link>
        </div>

      </div>
 
      </div>
  )
}
