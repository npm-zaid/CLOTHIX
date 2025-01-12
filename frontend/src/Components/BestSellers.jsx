import React, { useContext } from 'react'
import { ShopContext } from '../Context/Context'
import Card from './Card'
import Title from './Title'



function BestSellers() {

  

    const {products} = useContext(ShopContext)
  const BestPro = products.filter(item => item.bestSeller).slice(1,6)

  


  return (

    <div data-scroll data-scroll-speed="2"  className='w-full  rounded-lg my-20 '>

        {/* TITLE */}
        <Title text1='BEST' text2='SELLERS'></Title>

         {/* CARDS */}
         <div className='grid grid-cols-2 lg:grid-cols-5 gap-5'>
             {BestPro.map(item => (
                <Card id={item._id} name={item.name} img={item.images[0]} price={item.price}></Card>
             ))}
         </div>
      
    </div>
  )
}

export default BestSellers
