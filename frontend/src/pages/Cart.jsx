import React, { useContext, useState,useEffect } from 'react'
import { ShopContext } from '../Context/Context'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import { NavLink } from 'react-router-dom'
import { assets } from '../Assets/assets'


const Cart = () => {

  const {cartItems,products,updateCartItem}=useContext(ShopContext)
  const [cartData,setcartdata]=useState([])

  useEffect(()=>{
    if(products.length>0){
      let tempData = []
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            tempData.push({
              _id:items,
              size:item,
              qty:cartItems[items][item]
            })
          }
        }
      }
      setcartdata(tempData);
    }
  },[cartItems,products])

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  return (
    <div className='pt-[12vh] min-h-screen px-4 max-w-7xl mx-auto'>
      <Title text1='Your' text2='Cart'/>
      {
        cartData.length>0?
        <div>
          {
            cartData.map(item=>{
              const product = products.find(p=>p._id===item._id)
              
              return (
                <div className='group grid grid-cols-12 gap-4 mb-4 sm:p-6 p-2 rounded-xl bg-zinc-800/70 backdrop-blur border-l-4 border-[#EEA8B3] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-800'>
                 <div className='flex  gap-6 items-center sm:col-span-6 col-span-12   '>
                  <div className='sm:h-[20vh]  rounded-lg'>
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className='sm:w-[8vw] w-[30vw] h-full object-contain rounded-xl border-2  border-[#EEA8B3] shadow-xl  shadow-[#EEA8B3]/20 '
                    />
                    
                  </div>
                  <div className=' space-y-3  w-1/2'>
                    <h3 className='sm:text-xl text-md font-semibold text-white group-hover:text-[#EEA8B3] transition-colors'>{product.name}</h3>
                    <span className='inline-block px-4 py-1 bg-[#C46E88]/20 text-[#EEA8B3] rounded-full text-sm border border-[#C46E88]/20'>{item.size}</span>
                    <p className='text-[#EEA8B3] font-medium text-lg'>${product.price}</p>
                  </div>
                 </div>

                 <div className='sm:col-span-3 m-auto col-span-6'>
                  <div className='flex items-center  sm:gap-2 bg-zinc-900/50 rounded-lg p-2'>
                    <i className="ri-shopping-bag-line text-[#EEA8B3]"></i>
                    <input 
                      onChange={(e)=>e.target.value === '' || e.target.value === '0' ? null : updateCartItem(item._id,item.size,Number(e.target.value))}
                      className='w-16 px-2 py-1 text-center bg-transparent text-white placeholder-white/50 focus:outline-none'
                      type='number'
                      min={1}
                      value={item.qty}
                    />
                  </div>
                 </div>

                 <div className='sm:col-span-3 m-auto col-span-6 '>
                  <button
                    onClick={()=>updateCartItem(item._id,item.size,0)}
                    className='p-3 hover:bg-zinc-900/50 rounded-full transition-all duration-300 group'
                  >
                    <i className="ri-delete-bin-6-line sm:text-2xl text-3xl text-zinc-400 group-hover:text-[#EEA8B3]"></i>
                  </button>
                 </div>
                </div>
              )
            })
          }

          <div className='py-10 sm:w-1/2 ml-auto space-y-8'>
            <CartTotal/>
            <div className='text-end'>
              <NavLink 
                to='/placeOrder' 
                className='group inline-flex items-center gap-2 px-8 py-3 uppercase font-semibold text-white bg-zinc-800/80 backdrop-blur border-2 border-[#C46E88] rounded-lg hover:bg-[#C46E88] transition-all duration-300'
              >
                Proceed to Checkout
                <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
              </NavLink>
            </div>
          </div>

        </div>
        :
      <div className='flex flex-col items-center justify-center py-10'>
  <img src={assets.CartSvg} alt='cart' className='sm:w-[12vw] w-[30vw]'/>
        <h2 className='text-2xl font-semibold text-white my-2'>Your cart is empty</h2>
        <p className='text-zinc-400 mb-6 text-center'>Looks like you haven't added anything to your cart yet.</p>
        <NavLink 
          to='/collection' 
          className='group inline-flex items-center gap-2 px-8 py-3 uppercase font-semibold text-white bg-zinc-800/80 backdrop-blur border-2 border-[#C46E88] rounded-lg hover:bg-[#C46E88] transition-all duration-300'
        >
          Shop Now
          <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
        </NavLink>
      </div>
      }
    </div>
  )
}

export default Cart
