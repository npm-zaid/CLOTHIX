import React, { useContext } from 'react'
import { ShopContext } from '../Context/Context'
import Card from './Card'
import Title from './Title'



function LatestCollection() {

    const {products} = useContext(ShopContext)

  return (
    <div className='min-h-screen w-full  rounded-lg '>

        {/* TITLE */}
        <Title text1='LATEST' text2='COLLECTION'></Title>

         {/* CARDS */}
         <div className='grid lg:grid-cols-5 grid-cols-2 gap-5 gap-y-10'>
             {products.slice(15, 25).map(item => (
                <Card id={item._id} name={item.name} img={item.images[0]} price={item.price}></Card>
             ))}
         </div>
      
    </div>
  )
}

export default LatestCollection
