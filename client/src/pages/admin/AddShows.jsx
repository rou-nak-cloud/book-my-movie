import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import { DeleteIcon, ShieldCheckIcon, StarIcon } from 'lucide-react'
import { kConverter } from '../../components/Kconverter'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY

  const {axios, getToken,user, image_base_url} = useAppContext()

  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [dateTimeSelection, setDateTimeSelection] = useState({})
  const [dateTimeInput, setDateTimeInput] = useState("")
  const [showPrice, setShowPrice] = useState("")
  const [addingShow, setAddingShow] = useState(false)

  const fetchNowPlayingMovies = async()=> {
    // setNowPlayingMovies(dummyShowsData) -> dummy data
      try {
        const {data} = await axios.get('/api/show/now-playing', {
          headers: { Authorization: `Bearer ${await getToken()}`}
        })
        if(data?.success){
          setNowPlayingMovies(data.movies)
        }
      } catch (error) {
        console.log(`Error in fetching movies`, error)
      }
  }
  const handleDateTimeAdd = () => {
    if(!dateTimeInput) return

    if (typeof dateTimeInput !== "string" || !dateTimeInput.includes("T")) {
    console.error("Invalid dateTimeInput:", dateTimeInput);
    return;
    }
    const [date,time] = dateTimeInput.split('T');
    if(!date || !time) return;

     setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if(!times.includes(time)) {
        return {...prev, [date] : [...times, time] };
      }
      return prev;
    })
      // console.log("Date:", date);
      // console.log("Time:", time);
  }
  const handleRemoveTime = (date,time) => {
    setDateTimeSelection((prev)=> {
      const filteredTimes = prev[date].filter((t)=> t !== time);
      if(filteredTimes.length === 0){
        const { [date] : _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [date]: filteredTimes,
      }
    })
  }
  const handleSubmit = async ()=> {
    try {
      setAddingShow(true)

      if(!selectedMovie || Object.keys(dateTimeSelection).length === 0 || !showPrice){
        return toast("Missing required details")
      } 
      const showInput = Object.entries(dateTimeSelection).map(([date,time])=> ({date,time}));

      const payload = {
        movieId:selectedMovie,
        showsInput,
        showPrice: Number(showPrice)
      }

      const { data } = await axios.post(`/api/show/add-show`, payload, {
        headers: { Authorization: `Bearer ${await getToken()}`}
      })
      if(data.success){
        toast.success(data.message),
        setSelectedMovie(null)
        setDateTimeSelection({})
        setShowPrice("")
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log("Submission Failed", error)
      toast.error("Please Try Again later")
    }
    setAddingShow(false)
  }

  useEffect(()=>{
    if(user){
      fetchNowPlayingMovies();
    }
  },[])


  return nowPlayingMovies.length > 0 ? (
    <>
      <Title text1='Add' text2='Shows or Movies' />
      <p className='mt-10 text-lg font-medium'>Now PLaying Movies</p>
      <div className='overflow-x-auto pb-4'>
        <div className='group flex flex-wrap gap-4 mt-4 w-max'>
          {nowPlayingMovies.map((movie,idx)=> (
            <div key={idx} className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition-all duration-300 ease-in-out`} onClick={() => setSelectedMovie(movie.id)} >
              <div className='relative rounded-lg overflow-hidden'>
                <img src={image_base_url + movie.poster_path} alt="poster image" className='w-full object-cover brightness-80' />
                <div className='text-sm flex items-center justify-between p-2 bg-black/80 w-full absolute bottom-0 left-0'>
                  <p className='flex items-center gap-1 text-gray-400'>
                    <StarIcon className='w-4 h-4 text-primary fill-primary' />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className='text-gray-300'>{kConverter(movie.vote_count)}votes</p>
                </div>
              </div>
              {selectedMovie === movie.id && (
                <div className='absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded'>
                  <ShieldCheckIcon className='w-4 h-4 text-white' strokeWidth={2.5} />
                </div>
              )}
              <p className='mt-2 font-medium truncate'>{movie.title}</p>
              <p className='mt-2 font-medium truncate'>{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Show Price Input */}
      <div className='mt-8'>
        <label className='block text-sm font-medium mb-2'>Show Price</label>
        <div className='inline-flex items-center gap-2 border border-gray-700 px-3 py-2 rounded-md'>
          <p className='text-gray-400 text-sm'>{currency}</p>
          <input min={0} type='number' value={showPrice} onChange={(e) => setShowPrice(e.target.value)} placeholder='Enter show price' className='outline-none' />
        </div>
      </div>

      {/* Date Time */}
      <div className='mt-6'>
          <label className='block text-sm font-medium mb-2'>Select Date and Time</label>
          <div className='inline-flex gap-5 border border-gray-700 p-1 pl-3 rounded-lg'>
            <input type="datetime-local" value={dateTimeInput} onChange={(e)=> setDateTimeInput(e.target.value)} className='outline-none rounded-md' />
            <button onClick={handleDateTimeAdd} 
            className='bg-primary/90 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary-90 cursor-pointer'>
              Add Time
            </button>
          </div>
      </div>

      {/* Display selected time */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div className='mt-6'>
          <h2 className='mb-2'>Selected Date-Time</h2>
          <ul className='space-y-3'>
            {Object.entries(dateTimeSelection).map(([date,times])=>(
              <li key={date}>
                <div className='font-medium'>{date}</div>
                <div className='flex flex-wrap gap-2 mt-1 text-sm'>
                  {times.map((time)=>(
                    <div key={time}
                     className='border border-primary px-2 py-1 flex items-center rounded'>
                      <span className=''>{time}</span>
                      <DeleteIcon onClick={() => handleRemoveTime(date,time)}
                      width={15} 
                      className='ml-2 text-red-600 hover:text-red-700 cursor-pointer' />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button 
       onClick={handleSubmit} disabled={addingShow}
      className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/80 transition-colors cursor-pointer'>
        Add Show
      </button>
    </>
  ) : <Loading />
}

export default AddShows