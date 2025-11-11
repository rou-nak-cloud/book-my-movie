import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturedSelection from '../components/FeaturedSelection'
import TrailerSection from '../components/TrailerSection'
import Carousel from '../components/Carousel'

const home = () => {
  return (
    <>
     <Carousel />
     <HeroSection />
     <FeaturedSelection />
     <TrailerSection />
    </>
  )
}

export default home