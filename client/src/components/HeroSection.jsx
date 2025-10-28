import React from 'react'
import { assets } from '../assets/assets'
import {  ArrowRight, CalendarIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col items-start justify-center gap-4  px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
        <img src={assets.marvelLogo} alt="marvelLogo" className='max-h-11 lg:h-11 mt-20' />
        <h1 className='text-3xl md:text-[50px] md:leading-12 font-semibold max-w-160'>A movie theater <br />of the Galaxy, where you can book tickets.</h1>
        <div className='flex items-center gap-4 text-gray-400'>
            <span>Action | Adventure | Sci-fi | Many more..</span>
            <div className='flex items-center gap-1'>
                <CalendarIcon className='w-4.5 h-4.5 pr-1'/> 2025
            </div>
        </div>
        <p className='max-w-md text-gray-200'>
            An online movie ticketing that allows peoples to explore various movies as well as reserve seats and buy tickets any time.
        </p>
        <button onClick={()=>navigate('/movies')} className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full tracking-widest cursor-pointer uppercase text-black/90 font-bold'>
            Explore Movies
            <ArrowRight className='w-5 h-5' />
        </button>
    </div>
  )
}

export default HeroSection