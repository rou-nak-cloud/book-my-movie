import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react'
import timeFormat from '../components/timeFormat'
import DateSelect from '../components/DateSelect'

const MovieDetails = () => {
  const {id} = useParams()
  console.log(id)
  const [show, setShow] = useState(null)

  const getShow = async ()=> {
    const show = dummyShowsData.find(show => show._id === id)
   if(show){
      setShow({
      movie: show, // save the single show in movie
      dateTime: dummyDateTimeData // fetch the date from dummy time js 
    })
   }
  }
  // to change every time id changes of that movie
  useEffect(()=>{
    getShow()
  },[id])


  return show ?  (
    <div className='relative overflow-x-hidden'>
      {/* Background Image */}
      <div
        className='absolute inset-0 -z-10 opacity-40 blur-xs scale-100 bg-center bg-cover transition-all duration-700'
        style={{ backgroundImage: `url(${show.movie.backdrop_path || show.movie.poster_path})` }}
      ></div>
    <div className='px-6 md:px-10 lg:px-30 pt-30 md:pt-70 mb-5 md:mb-10'>
    <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
      <img src={show.movie.poster_path} alt="showImage" className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover' />
      <div className='relative flex flex-col gap-3'>
        <BlurCircle top='-100px' left='-200px' />
        <BlurCircle top='130px' left='-390px' />
        <p className='text-primary'>English</p>
        <h1 className='text-5xl font-semibold max-w-116 text-balance'>{show.movie.title}</h1>
        <div className='flex items-center gap-2 text-gray-300'>
          <StarIcon className='w-5 h-5 text-primary fill-primary' />
          {show.movie.vote_average.toFixed(1)} User Rating
        </div>
        <p className='text-gray-400 mt-2 text-md leading-tight max-w-xl'>{show.movie.overview}</p>
        <p className='text-gray-300'>
          {timeFormat(show.movie.runtime)} | {show.movie.genres.map(genre=> genre.name).join(", ")} | {show.movie.release_date.split("-")[0]}
        </p>

        <div className='flex items-center flex-wrap gap-4 mt-4'>
          <button className='flex items-center gap-2 px-7 py-3.5 text-md bg-gray-900/50 hover:bg-gray-900 transition-all rounded-md font-semibold cursor-pointer active:scale-95'>
            <PlayCircleIcon className='w-5 h-5' />
            Watch Trailer
          </button>
          <a href="#dateSelect" className='px-11 py-3 text-md bg-primary/80 hover:bg-primary-dull transition-all rounded-md font-semibold cursor-pointer active:scale:90'>
            Buy Tickets
          </a>
          <button className='bg-gray-700 p-3 rounded-full transition-all cursor-pointer active:scale:90'>
            <Heart className='w-5 h-5' />
          </button>
        </div>
      </div>
    </div>

    <p className='text-lg font-medium mt-20'>Your Favorite Cast</p>
    <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
      <div className='flex items-center gap-4 w-max px-4'>
        {show.movie.casts.slice(0,12).map((cast,idx) => (
          <div className='flex flex-col items-center text-center' key={idx}>
            <img src={cast.profile_path} alt="cast poster" className='rounded-full h-15 md:h-18 aspect-square object-cover' />
            <p className='mt-3 font-medium text-xs'>{cast.name}</p>
          </div>
        ))}
      </div>
    </div>

    <DateSelect dateTime={show.dateTime} id={id} />
    
   </div>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default MovieDetails