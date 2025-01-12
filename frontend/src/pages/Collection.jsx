import React from 'react'
import ProductCollection from '../Components/ProductCollection'
import SearchBar from '../Components/SearchBar'
import { useEffect } from 'react';


const Collection = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  return (
    <div className='pt-20'>
      <SearchBar></SearchBar>
      <ProductCollection></ProductCollection>
    </div>
  )
}

export default Collection
