import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className=' text-[13vw] lg:text-[4vw] text-center relative mb-12 w-fit m-auto flex flex-wrap gap-2 justify-center'>
    <h1 className=' bg-gradient-to-r from-[#111111] via-[#EEA8B3] to-transparent  leading-[3rem]  animate-gradient bg-[length:200%] bg-clip-text text-transparent'>{text1}</h1>
    <h1 className='bg-gradient-to-r from-[#111111] via-[#C46E88] to-transparent leading-[3rem]  animate-gradient bg-[length:200%] bg-clip-text text-transparent'>{text2}</h1>
    <span className='absolute -bottom-3 left-1/2 -translate-x-1/2  w-full h-1 bg-gradient-to-r from-transparent via-[#EEA8B3] to-transparent'></span>
    </div>
  )
}

export default Title
