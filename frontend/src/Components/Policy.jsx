import React, { useContext } from 'react'
import PolicyCard from './PolicyCard'
import { ShopContext } from '../Context/Context'
import Title from './Title'



const Policy = () => {

    const  {policyAssets} = useContext(ShopContext) 
  return (
    <div className='lg:py-3 py-5' >

      {/* TITLE */}
      <Title text1='OUR' text2='POLICIES'></Title>

      <div className='grid lg:grid-cols-3 gap-8 '>
        {policyAssets.map((asset,index) => (
          <PolicyCard speed={(3 - index) * 1} icon={asset.icon} title={asset.title} description={asset.description}  />
        ))}
      </div>
    </div>
  )
}

export default Policy
