import Carousel from '@/components/Carousel'
import FancySlider from '@/components/FancySlider'
import NewReleases from '@/components/NewReleases'
import TopRated from '@/components/TopRated'

import React from 'react'


export default function page() {
  return (
    <div>
      <FancySlider/>
      
      <Carousel/>
      <NewReleases/>
      <TopRated/>

    </div>
  )
}
