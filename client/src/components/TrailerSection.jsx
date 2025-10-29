import React, { useState } from 'react'
// import ReactPlayer from 'react-player'
import { dummyTrailers } from '../assets/assets'
import BlurCircle from './BlurCircle'

const TrailerSection = () => {
    const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);
    //   console.log(currentTrailer.videoUrl); // 🔍 check URL in console
  return (
    <>
     <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 '>
        <p className='text-gray-400 font-medium text-lg max-w-[960px] mx-auto'>Trailers</p>
        <div className='relative mt-6 flex justify-center'>
            <BlurCircle top='100px' right='-150px' />
            <iframe 
            src={currentTrailer.videoUrl}
            title="Trailer" 
            allowFullScreen
            allow="picture-in-picture"
             className='mx-auto max-w-full rounded-xl overflow-hidden shadow-lg' width="960px" height="540px" />
        </div>
     </div>
    </>
  )
}

export default TrailerSection