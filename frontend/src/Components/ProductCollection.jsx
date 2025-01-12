import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { ShopContext } from '../Context/Context'
import Card from './Card'
import Title from './Title'

const ProductCollection = () => {

const {products,search,showsearch,send,setsend} = useContext(ShopContext)
const [showFilter,setshowFilter] = useState(false)
const func = () => {
  setshowFilter(!showFilter)
}


{/* FILTER LOGIC */}
const [category,setcategory] = useState([])
const [Subcategory,setSubcategory] = useState([])
const [FilterProduct,setFilterProduct] = useState([])

const [sortType,setsortType] = useState('default')

useEffect(()=>{
  setFilterProduct(products)
},[])


const toggleCategory = (e) => {
 
  if(category.includes(e.target.value)){
    setcategory(prev =>prev.filter(item => item!== e.target.value))
  }else{
    setcategory(prev => [...prev,e.target.value])
  }
}


const toggleSubCategory = (e) => {
 
  if(Subcategory.includes(e.target.value)){
    setSubcategory(prev =>prev.filter(item => item!== e.target.value))
  }else{
    setSubcategory(prev => [...prev,e.target.value])
  }
}

const applyFilter = () => {
  let ProductsCopy = products.slice()
  if(search && send){
    ProductsCopy = ProductsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
  }
  if(category.length > 0){
    ProductsCopy = ProductsCopy.filter(item => category.includes(item.category))
  }
  if(Subcategory.length > 0){
    ProductsCopy = ProductsCopy.filter(item => Subcategory.includes(item.subCategory))
  }
  setFilterProduct(ProductsCopy)
}

useEffect(() => {
  applyFilter()
}, [category,Subcategory,search,showsearch,send,setsend])

{/* SORTING LOGIC */}
const SortProduct =()=>{
  let copy = FilterProduct.slice()
  switch(sortType){
    case 'Low to High':
    setFilterProduct(copy.sort((a, b) => a.price - b.price))
    break;

    case 'High to Low':
      setFilterProduct(copy.sort((a, b) => b.price - a.price))
      break;

     default:
      applyFilter()
      break; 
  }
}
  
useEffect(()=>{
  SortProduct()
},[sortType])



  return (
    <div className='min-h-screen py-8'>
      <div className='grid grid-cols-12  gap-5 '>

        { /* LEFT */}
        <div className='md:col-span-3 col-span-12'>
          <div className='flex flex-col gap-3'>
            <h2 onClick={func} className='text-3xl cursor-pointer text-white font-bold flex items-center gap-2 group'>
              <i className="ri-filter-3-line text-[#C46E88] group-hover:text-[#EEA8B3] transition-colors duration-300"></i>
              FILTER
              <i className={`${showFilter ? 'rotate-90 text-[#C46E88]' : ''} ri-arrow-right-s-line sm:hidden transition-all duration-300`}></i>
            </h2>

              {/* CATEGORY */}
            <div className={`sm:block bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 mt-6 p-6 rounded-xl shadow-lg hover:shadow-3xl hover:scale-105 transition-all duration-500 border-l-4 border-[#C46E88] ${showFilter ? '' : 'hidden'}`}>
              <h3 className='text-xl mb-4 text-white font-semibold flex items-center'>
                <i className="ri-filter-3-line mr-2 text-[#C46E88]"></i>
                Category
              </h3>
              <ul className='text-md space-y-3'>
                <li className='flex items-center gap-3 text-zinc-300 hover:text-[#c46e88] transition-colors'>
                  <input type='checkbox' onChange={toggleCategory} value='Men' className='w-4 h-4 accent-[#C46E88] cursor-pointer'/>
                  <span className='flex items-center'>Men</span>
                </li>
                <li className='flex items-center gap-3 text-zinc-300 hover:text-[#c46e88] transition-colors'>
                  <input type='checkbox' onChange={toggleCategory} value='Women' className='w-4 h-4 accent-[#C46E88] cursor-pointer'/>
                  <span className='flex items-center'>Women</span>
                </li>
                <li className='flex items-center gap-3 text-zinc-300 hover:text-[#c46e88] transition-colors'>
                  <input type='checkbox' onChange={toggleCategory} value='Kids' className='w-4 h-4 accent-[#C46E88] cursor-pointer'/>
                  <span className='flex items-center'>Kids</span>
                </li>
              </ul>
            </div>

            {/* SUB-CATEGORY  */}
            <div className={`${showFilter ? '' : 'hidden'} sm:block bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 mt-4 p-6 rounded-xl shadow-lg hover:shadow-3xl hover:scale-105 transition-all duration-500  border-l-4 border-[#EEA8B3]`}>
              <h3 className='text-xl mb-4 text-white font-semibold flex items-center'>
                <i className="ri-t-shirt-2-line mr-2 text-[#EEA8B3]"></i>
                Type
              </h3>
              <ul className='text-md space-y-3'>
                <li className='flex items-center gap-3 text-zinc-300 hover:text-[#c46e88] transition-colors'>
                  <input type='checkbox' onChange={toggleSubCategory} value='Topwear' className='w-4 h-4 accent-[#c46e88] cursor-pointer'/>
                  <span className='flex items-center'>Topwear</span>
                </li>
                <li className='flex items-center gap-3 text-zinc-300 hover:text-[#c46e88] transition-colors'>
                  <input type='checkbox' onChange={toggleSubCategory} value='Bottomwear' className='w-4 h-4 accent-[#c46e88] cursor-pointer'/>
                  <span className='flex items-center'>Bottomwear</span>
                </li>
                <li className='flex items-center gap-3 text-zinc-300 hover:text-[#c46e88] transition-colors'>
                  <input type='checkbox' onChange={toggleSubCategory} value='Winterwear' className='w-4 h-4 accent-[#c46e88] cursor-pointer'/>
                  <span className='flex items-center'>Winterwear</span>
                </li>
              </ul>
            </div>
            

          </div>
        </div>

        { /* RIGHT */}
        <div className='md:col-span-9 col-span-12  '>
          
           <div className='flex sm:flex-row flex-col justify-end gap-5 '>
             {/* TITLE */}
           <Title text1='ALL' text2='COLLECTIONS'></Title>
           
             {/* SORT */}
             <div className='mx-auto mb-4 sm:mt-1'>
              <select 
                onChange={(e)=>setsortType(e.target.value)}
                className="w-48 h-12 bg-zinc-800/80 text-white rounded-lg px-4 pl-10
                          border-2 border-[#C46E88] cursor-pointer
                          hover:border-[#EEA8B3] hover:shadow-[0_0_15px_rgba(238,168,179,0.3)]
                          transition-all duration-300
                          focus:ring-2 focus:ring-[#EEA8B3] focus:ring-opacity-50
                          outline-none"
              >
                <option value="Default" className="bg-zinc-800">Sort Products</option>
                <option value="Low to High" className="bg-zinc-800">Low to High</option>
                <option value="High to Low" className="bg-zinc-800">High to Low</option>
                <option value="Newest" className="bg-zinc-800">Newest Arrivals</option>                                                                                          
              </select>
              
            </div>

            </div>

           <div className='grid lg:grid-cols-4 grid-cols-2 gap-3  gap-y-6'>
            {FilterProduct.map((item,index) => (
                <Card speed={(3 - index) * 1}  id={item._id} name={item.name} img={item.images[0]} price={item.price}></Card>
             ))}
            </div>


        </div>

      </div>

      
    </div>
  )
}

export default ProductCollection
