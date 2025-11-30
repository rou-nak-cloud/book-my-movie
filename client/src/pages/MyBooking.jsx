import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../components/timeFormat'
import { dateFormat } from '../components/dateFormat'
import { useAppContext } from '../context/AppContext'

const MyBooking = () => {
  const currency = import.meta.env.VITE_CURRENCY

     const {axios, getToken,user, image_base_url} = useAppContext()

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getBookings = async ()=> {
    // setBookings(dummyBookingData)
    // setIsLoading(false)
    try {
      const {data} = await axios.get(`/api/user/bookings`, {
        headers: { Authorization: `Bearer ${await getToken()}`}
      })
      if(data.success){
        setBookings(data.bookings)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  useEffect (()=>{
    if(user){
      getBookings();
    }
  },[user])

  return !isLoading ? (
    <div className='relative px-6 md:px-16 lg:px-40 pt-20 md:pt-40 min-h-[85vh]'>
      <BlurCircle top='100px' left='100px' />
      <div>
        <BlurCircle bottom='70px' left='900px' />
      </div>
      <h1 className='text-lg font-semibold mb-4'>My Bookings</h1>

      {bookings.map((item,idx)=>(
        <div key={idx} className='flex flex-col md:flex-row justify-between bg-primary/10  border border-primary/20 rounded-lg mt-4 p-2 max-w-6xl'>
          <div className='flex flex-col md:flex-row'>
            <img src={image_base_url + item.show.movie.poster_path} alt="poster path" className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded' />
            <div className='flex flex-col p-4'>
              <p className='text-lg font-semibold'>{item.show.movie.title}</p>
              <p className='text-gray-300 text-sm'>{timeFormat(item.show.movie.runtime)}</p>
              <p className='text-gray-300 text-sm mt-auto'>{dateFormat(item.show.showDateTime)}</p>
            </div>
          </div>

          <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
            <div className='flex items-center gap-4'>
              <p className='text-2xl font-semibold mb-3 pr-1'>
                {currency}{item.amount}
              </p>
              {!item.isPaid && <button className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer hover:bg-primary-dull transition-all duration-150 ease-in-out'>
                Pay Now</button>}
            </div>
            <div className='text-sm'>
              <p><span className='text-gray-400'>Total Tickets:</span>{item.bookedSeats.length}</p>
              <p><span className='text-gray-400'>Seat Number:</span>{item.bookedSeats.join(", ")}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Loading />
  )
}

export default MyBooking