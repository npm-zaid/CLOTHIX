import React from 'react'

const Title = ({text}) => {
  return (
    <h4  className="text-4xl w-fit mb-8 font-semibold  relative leading-[3rem]  mx-auto bg-gradient-to-r from-[#111111] via-[#EEA8B3] to-transparent  bg-clip-text text-transparent animate-gradient bg-[length:200%]">
    {text}
    <span className='absolute -bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#C46E88] via-[#EEA8B3] to-transparent '></span>
</h4>
  )
}

export default Title
