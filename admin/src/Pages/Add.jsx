import React from 'react'
import { useState } from 'react'
import upload from '../Assets/cloud-upload.png'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Add = ({token}) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState('Men')
  const [Subcategory, setSubcategory] = useState('Topwear')
  const [description, setDescription] = useState('')
  const [bestSeller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])

  const handleSubmit = async (e)=>{
    e.preventDefault()
   try {
    const formData = new FormData()
    formData.append('name',productName)
    formData.append('description',description)
    formData.append('price',price)
    formData.append('category',category)
    formData.append('subCategory',Subcategory)
    formData.append('sizes',JSON.stringify(sizes))
    formData.append('bestSeller',bestSeller)
   
    image1 && formData.append('image1',image1)
    image2 && formData.append('image2',image2)
    image3 && formData.append('image3',image3)
    image4 && formData.append('image4',image4)

    
    const res = await axios.post(backendUrl + '/api/product/add',formData,{headers:{token}})
    if(res.data.success){
       toast.success(res.data.message, {style: {
                       backgroundColor: 'rgb(39 39 42 / 0.8)',
                       color: 'white',
                       fontSize: '16px',
                     }})     
      setProductName('')
      setDescription('')
      setPrice(0)
      setCategory('Men')
      setSubcategory('Topwear')
      setSizes([])
      setBestSeller(false)
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(false)}
      else{
        toast.error(res.data.message)
      }
   } 
   catch (error) {
    console.log(error)
    toast.error(error.message)
   }
   
  }
  
    useEffect(() => {
      window.scrollTo(0, 0);
    },[]);
  


  return (
    <>
      <form className='sm:px-8 px-4 py-16' onSubmit={handleSubmit}>
        <div className='main flex flex-col gap-6 sm:w-2/3  bg-zinc-800 px-6 py-10 rounded-xl shadow-lg border-t-4 border-[#C46E88]'>
          <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <i className="ri-add-box-line text-[#EEA8B3]"></i>
            Add New Product
          </h1>
          
          <div>
            <p className='text-xl mb-3 text-gray-300 flex items-center gap-2'>
              <i className="ri-image-add-line text-[#EEA8B3]"></i>
              Upload Images
            </p>

            <div className='flex gap-4 flex-wrap'>

              <label htmlFor="image1" className='sm:w-[7vw] w-[20vw] hover:scale-105 transition-transform cursor-pointer'>
               <img className='w-full h-full object-cover rounded-xl border-2 border-zinc-600 hover:border-[#c46e88]' src={!image1? upload :URL.createObjectURL(image1)} />
                <input onChange={(e)=>{setImage1(e.target.files[0])}} className='hidden' type="file" id="image1"/>
              </label>

              <label htmlFor="image2" className='sm:w-[7vw] w-[20vw] hover:scale-105 transition-transform cursor-pointer'>
              <img className='w-full h-full object-cover rounded-xl border-2 border-zinc-600 hover:border-[#c46e88]' src={!image2? upload :URL.createObjectURL(image2)}/>
                <input onChange={(e)=>{setImage2(e.target.files[0])}} className='hidden' type="file" id="image2" />
              </label>

              <label htmlFor="image3" className='sm:w-[7vw] w-[20vw] hover:scale-105 transition-transform cursor-pointer'>
              <img className='w-full h-full object-cover rounded-xl border-2 border-zinc-600 hover:border-[#c46e88]' src={!image3?upload:URL.createObjectURL(image3)} />
                <input onChange={(e)=>{setImage3(e.target.files[0])}} className='hidden' type="file" id="image3" />
              </label>

              <label htmlFor="image4" className='sm:w-[7vw] w-[20vw] hover:scale-105 transition-transform cursor-pointer'>
              <img className='w-full h-full object-cover rounded-xl border-2 border-zinc-600 hover:border-[#c46e88]' src={!image4?upload:URL.createObjectURL(image4)} />
                <input onChange={(e)=>{setImage4(e.target.files[0])}} className='hidden' type="file" id="image4" />
              </label>

            </div>
          </div>

          <div>
            <p className='text-xl mb-3 text-gray-300 flex items-center gap-2'>
              <i className="ri-price-tag-3-line text-[#EEA8B3]"></i>
              Product Name
            </p>
            <input onChange={(e)=>setProductName(e.target.value)} value={productName} type='text' required placeholder='Enter product name' className='w-full focus:outline-none text-gray-200 focus:ring-[#c46e88] focus:ring-2 bg-zinc-700 rounded-lg p-3 transition-all' />
          </div>

          <div>
            <p className='text-xl mb-3 text-gray-300 flex items-center gap-2'>
              <i className="ri-file-text-line text-[#EEA8B3]"></i>
              Product Description
            </p>
            <textarea onChange={(e)=>setDescription(e.target.value)} value={description} type='text' required placeholder='Enter product description' className='w-full focus:outline-none text-gray-200 focus:ring-[#c46e88] focus:ring-2 bg-zinc-700 rounded-lg p-3 min-h-[100px] transition-all' />
          </div>

          <div className='flex sm:flex-row flex-col gap-5'>
            
            <div>
              <p className='text-xl mb-3 text-gray-300 flex items-center gap-2'>
                <i className="ri-t-shirt-line text-[#EEA8B3]"></i>
                Category
              </p>
              <select onChange={(e)=>setCategory(e.target.value)} className='h-10 bg-zinc-700 text-gray-200 rounded-lg px-4 outline-none border-2 border-zinc-600 focus:border-[#c46e88] transition-all'>
                <option value='Men'>Men</option>
                <option value='Women'>Women</option>
                <option value='Kids'>Kids</option>
              </select>
            </div>

            <div>
              <p className='text-xl mb-3 text-gray-300 flex items-center gap-2'>
                <i className="ri-list-check text-[#EEA8B3]"></i>
                Sub-Category
              </p>
              <select onChange={(e)=>setSubcategory(e.target.value)} className='h-10 bg-zinc-700 text-gray-200 rounded-lg px-4 outline-none border-2 border-zinc-600 focus:border-[#c46e88] transition-all'>
                <option value='Topwear'>Topwear</option>
                <option value='Bottomwear'>Bottomwear</option>
                <option value='Winterwear'>Winterwear</option>
              </select>
            </div>

            <div>
              <p className='text-xl mb-3 text-gray-300 flex items-center gap-2'>
                <i className="ri-money-dollar-circle-line text-[#EEA8B3]"></i>
                Price
              </p>
              <input onChange={(e)=>setPrice(e.target.value)} value={price} type='Number' placeholder='00' className='py-2 px-4 text-gray-200 w-full sm:w-[100px] focus:outline-none focus:ring-[#c46e88] focus:ring-2 bg-zinc-700 rounded-lg transition-all' />
            </div>
          </div>

          <div>
            <p className='text-xl mb-3 text-gray-300 flex items-center gap-2'>
              <i className="ri-ruler-line text-[#EEA8B3]"></i>
              Sizes
            </p>
            <div className='flex gap-3'>
              {['S', 'M', 'L', 'XL',].map(size => (
                <p 
                  key={size}
                  onClick={()=>{setSizes(prev=>prev.includes(size)?prev.filter(s=>s!==size):[...prev,size])}} 
                  className={`${sizes.includes(size)?'bg-[#c46e88] shadow-lg shadow-[#c46e88]/30':'bg-zinc-700'} px-4 py-2 rounded-lg cursor-pointer transition-all hover:scale-105 text-white`}
                >
                  {size}
                </p>
              ))}
            </div>
          </div>

          <div className='flex gap-3 my-2'>
            <input onChange={()=>setBestSeller(prev=>!prev)} checked={bestSeller} type='checkbox' id='bestSeller' className='w-5 h-5 accent-[#c46e88]'/>
            <label htmlFor='bestSeller' className='text-gray-300 flex items-center gap-2'>
              <i className="ri-star-line text-[#EEA8B3]"></i>
              Add To BestSeller
            </label>
          </div>

          <button type='submit' className='w-fit bg-[#c46e88] active:scale-90 mb-5 hover:bg-[#EEA8B3] transition-all text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-[#c46e88]/30 flex items-center gap-2'>
            <i className="ri-add-line"></i>
            Add Product
          </button>

        </div>
      </form>
    </>
  )
}

export default Add
