import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import { dummyShowsData } from '../assets/assets'
import MovieCard from './MovieCard'
import { useAppContext } from '../context/AppContext'

const FeaturedSelection = () => {
    const navigate = useNavigate()
    const {shows} = useAppContext();

  return (
    <>
     <div className='px-6 md:px-15 lg:px-24 xl:px-44 overflow-hidden'>
        <div className='relative flex items-center justify-between pt-20 pb-10'>
            <BlurCircle top='0' right='-70px' />
            <BlurCircle top='500px' right='1000px' />
            <p className='text-gray-300 font-medium text-lg'>Now showing</p>
            <button onClick={()=>navigate('/movies')} className='group flex items-center gap-2 text-sm text-gray-300 cursor-pointer'>
                View All
                <ArrowRight className='group-hover:translate-x-1 transition-all duration-100 w-5 h-5' />
            </button>
        </div>

        <div className='flex flex-wrap max-sm:justify-center gap-8 mt-8'>
          {shows.slice(0,8).map((show)=>(
            <MovieCard key={show._id} movie={show} />
          ))}
        </div>

        <div className='flex justify-center mt-20'>
          <button onClick={()=>{navigate('/movies'); scrollTo(0,0)}} className='px-10 py-3 w-[30%] text-[.9vw] tracking-widest uppercase bg-primary hover:bg-primary-dull transition-all duration-150 rounded-4xl font-bold text-black cursor-pointer'>Show more..</button>
        </div>
     </div>
    </>
  )
}

export default FeaturedSelection