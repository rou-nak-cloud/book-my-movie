import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'

const FeaturedSelection = () => {
    const navigate = useNavigate()
  return (
    <>
     <div className='px-6 md:px-15 lg:px-24 xl:px-44 overflow-hidden'>
        <div className='relative flex items-center justify-between pt-20 pb-10'>
            <BlurCircle top='0' right='-70px' />
            <p className='text-gray-300 font-medium text-lg'>Now showing</p>
            <button onClick={()=>navigate('/movies')} className='group flex items-center gap-2 text-sm text-gray-300 cursor-pointer'>
                View All
                <ArrowRight className='group-hover:translate-x-1 transition-all duration-100 w-5 h-5' />
            </button>
        </div>

        <div></div>

        <div className='flex justify-center mt-20'>
          <button onClick={()=>{navigate('/movies'); scrollTo(0,0)}} className='px-10 py-3 text-md tracking-wider bg-primary hover:bg-primary-dull transition-all duration-150 rounded-2xl font-bold text-black cursor-pointer'>Show more..</button>
        </div>
     </div>
    </>
  )
}

export default FeaturedSelection