import React from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon } from 'lucide-react'

const DateSelect = ({dateTime, id}) => {
  return (
    <div id='dateSelect' className='lg:pt-30 pt-20'>
        <div className='flex flex-col md:flex-row items-center justify-between md-max:w-lg gap-10 relative p-8 bg-primary/20 border border-primary/30 rounded-lg'>
          <BlurCircle top='-100px' left='-100px' />
          <BlurCircle top='-50px' right='0px' />
          <div>
            <p className='text-lg font-semibold'>Choose Date</p>
            <div className='lg:w-[180%] flex flex-wrap md:flex-nowrap items-center justify-between gap-6 text-sm mt-5'>
                <div className='flex items-center '>
                     <ChevronLeftIcon className='w-28 cursor-pointer' />
                    <span className='grid grid-cols-3 md:flex flex-wrap gap-4'>
                    {Object.keys(dateTime).map((date,idx)=>(
                        <button key={idx} className='flex flex-col items-center justify-center h-14 w-14 aspect-square rounded-md cursor-pointer'>
                           <span className=''>{new Date(date).getDate()}</span>
                           <span className=''>{new Date(date).toLocaleString("en-US", {
                            month: "short"
                           })}</span>
                        </button>
                    ))}
                </span>
                <ChevronLeftIcon className='w-28 rotate-180 cursor-pointer' />
                </div>
                <div className='flex items-center'>
                    <button className='bg-primary text-white px-8 py-2 mt-0 rounded hover:bg-primary/80 transition-all cursor-pointer'>
                    Book Now</button>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default DateSelect