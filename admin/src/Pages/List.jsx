import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const List = ({token}) => {

  const [list,setList] = useState([])
  
  const fetchProducts = async()=>{
    try {
      const res = await axios.get(backendUrl + '/api/product/list')
      if(res.data.success){
        setList(res.data.products)
        console.log(res.data.products)
      }
      else{
        toast.error(res.data.message)
      }
    } 
    catch (error) {
      toast.error(error.message)
    }
    
  }

  const deleteProduct = async(id)=>{
    try {
      const res = await axios.delete(backendUrl + `/api/product/remove/${id}`,{headers:{token}})
      if(res.data.success){
         toast.success(res.data.message, {style: {
                               backgroundColor: 'rgb(39 39 42 / 0.8)',
                               color: 'white',
                               fontSize: '16px',
                             }})     
        fetchProducts()
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchProducts()
  },[])
  
  return (
    <div className=' px-8 py-16' >
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white mb-8 flex items-center gap-3 "
      >
        <i className="ri-shopping-bag-3-line text-[#EEA8B3]"></i>
        All Products
      </motion.h1>
    
      <div className='flex flex-col gap-4 pb-5'>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='hidden md:grid grid-cols-[2fr_2fr_1fr_1fr_1fr] bg-zinc-800 p-4 rounded-lg border-l-4 border-[#C46E88] shadow-md'
        >
          <b className="text-gray-300 flex items-center gap-2">
            <i className="ri-image-2-line text-[#EEA8B3]"></i>
            Image
          </b>
          <b className="text-gray-300 flex items-center gap-2">
            <i className="ri-price-tag-3-line text-[#EEA8B3]"></i>
            Product Name
          </b>
          <b className="text-gray-300 flex items-center gap-2">
            <i className="ri-money-rupee-circle-line text-[#EEA8B3]"></i>
            Price
          </b>
          <b className="text-gray-300 flex items-center gap-2">
            <i className="ri-folder-3-line text-[#EEA8B3]"></i>
            Category
          </b>
          <b className='text-center text-gray-300 flex items-center justify-center gap-2'>
            <i className="ri-settings-3-line text-[#EEA8B3]"></i>
            Action
          </b>
        </motion.div>

        {list.map((item, index)=>(
          <motion.div 
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className='sm:grid grid-flow-col  group grid-cols-[2fr_2fr_1fr_1fr_1fr] bg-zinc-800/90 p-4 rounded-lg shadow-md hover:shadow-xl hover:bg-zinc-800 transition-all duration-300 sm:items-center  text-gray-200 border-l-2 border-transparent hover:border-[#EEA8B3]'
          >

            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex items-center  "
            >
              <img src={item.images[0]} alt='product' className=' mb-4 sm:mb-0 sm:w-24 sm:h-24 rounded-lg object-cover border-2 border-zinc-700 group-hover:border-[#EEA8B3] transition-all duration-300' />
            </motion.div>


            <motion.p 
              whileHover={{ x: 5 }}
              className="font-medium flex items-center gap-2"
            >
              <i className="ri-price-tag-3-line text-[#EEA8B3]"></i>
              {item.name}
            </motion.p>

            <p className="text-[#EEA8B3] font-medium ">
              ₹{item.price}
            </p>

            <p className="text-gray-400 ">
              {item.category}
            </p>

            <div className="flex justify-center">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={()=>deleteProduct(item._id)} 
                className='bg-zinc-700 hover:bg-red-500/90 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 hover:shadow-lg'
              >
                <i className="ri-delete-bin-line"></i>
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}

      </div>
     
    </div>
  )
}

export default List
