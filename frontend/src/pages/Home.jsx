import React from 'react'
import Hero from '../Components/Hero'
import LatestCollection from '../Components/LatestCollection'
import BestSellers from '../Components/BestSellers'
import Policy from '../Components/Policy'
import Excellence from '../Components/Excellence'
import NewsLetter from '../Components/NewsLetter'
import Marquee from '../Components/Marquee'
import { useEffect } from 'react'


const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);
 
  return (
    <div >
      <Hero></Hero>
      <Marquee></Marquee>
      <LatestCollection></LatestCollection>
      <BestSellers></BestSellers>
      <Policy></Policy>
      <Excellence></Excellence>
      <NewsLetter></NewsLetter>

    </div>
  )
}

export default Home
