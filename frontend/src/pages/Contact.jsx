import React from 'react'
import ContactContent from '../Components/ContactContent'
import Title from '../Components/Title'
import NewsLetter from '../Components/NewsLetter'
import { useEffect } from 'react';


const Contact = () => {
 
  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  return (
    <div className='pt-[10vh]'>
      <Title text1='CONTACT' text2='US'></Title>
      <ContactContent></ContactContent>
      <NewsLetter></NewsLetter>
    </div>
  )
}

export default Contact
