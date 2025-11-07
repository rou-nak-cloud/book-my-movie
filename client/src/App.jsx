import React from 'react'
import {Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBooking from './pages/MyBooking'
import Favorites from './pages/Favorites'

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin')
  return (
    <>
    <Toaster />
     {!isAdminRoute && <Navbar />}

     <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/movies' element={<Movies />} />
       <Route path='/movies/:id' element={<MovieDetails />} />
       <Route path='/movies/:id/:date' element={<SeatLayout />} />
       <Route path='/my-bookings' element={<MyBooking />} />
       <Route path='/favorite' element={<Favorites />} />
     </Routes>

     {!isAdminRoute && <Footer />}
    </>
  )
}

export default App