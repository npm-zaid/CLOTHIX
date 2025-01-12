import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/Context'
import Card from './Card'
import Title from './Title'

const RelatedProducts = ({category,subCategory}) => {
    const {products} = useContext(ShopContext)
    const [related,setrelated]= useState([])
   
    useEffect(()=>{
        if(products.length>0){
            setrelated(products.filter((item) => item.category === category && item.subCategory === subCategory).slice(0,5))
        }
    },[products])

  return (
    <div className=' my-16'>
        <Title text1='RELATED' text2='' />
        <div className='grid sm:grid-cols-5 grid-cols-2 gap-5'>
           {
            related.map((item) => (
              <Card key={item._id} id={item._id} name={item.name} img={item.images[0]} price={item.price} />
            ))
           }
        </div>
      
    </div>
  )
}

export default RelatedProducts
