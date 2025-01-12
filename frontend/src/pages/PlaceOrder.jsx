import React, { useState } from 'react'
import CartTotal from '../Components/CartTotal'
import { useEffect,useContext  } from 'react';
import { ShopContext } from '../Context/Context'
import axios from 'axios'
import { toast } from 'react-toastify'



const PlaceOrder = () => {
  
  const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_yCdJquTC727i5J'
  console.log(key_id) 
  

  const [method,setmethod]=useState('cod')

  const {cartItems,setcartitems,navigate,products,getCardAmount,deliveryCharges,backendUrl,token,isSubscribed}=useContext(ShopContext)

  const [formData,setformData]=useState({
    name:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:'',
  })

  const handleChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setformData(data=>({...data,[name]:value}));
  }

  
  const initPay = (order)=>{
    const options = {
      key: key_id,
      amount: order.amount,
      currency: order.currency,
      name: "Clothix Store",
      description: "Order Payment",
      order_id: order.id,
      handler: async(response)=>{
        try {
          const {data} = await axios.post(backendUrl + '/api/order/verify-razorpay' ,response,{headers:{token}})
          if(data.success){
            setcartitems({})
            navigate('/orders')
          }
         
        } catch (error) {
          toast.error("Something went wrong")
        }
     
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone
      },
      theme: {
        color: "#c46e88"
      }
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      let orderItems=[]
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
           const itemInfo=structuredClone(products.find(product=>product._id===items))
           if(itemInfo){
            itemInfo.size=item
            itemInfo.qty=cartItems[items][item]
            orderItems.push(itemInfo)
          }
        }}
        }

        const orderData={
          address:formData,
          items:orderItems,
          amount:(getCardAmount() + deliveryCharges)*100,
        }

        switch(method) {

          case 'cod':
            const response = await axios.post(backendUrl + '/api/order/place-order',orderData,{headers:{token}})
            if(response.data.success){
              toast.success(response.data.message)
              setcartitems({})
              navigate('/orders')  
              
            }
            else{
              toast.error(response.data.message)
            }
            break;

          case 'razorpay':
            const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay-payment',orderData,{headers:{token}})
          if(responseRazorpay.data.success){
            initPay(responseRazorpay.data.order)
            console.log(responseRazorpay.data.order)
          }
            break;
          case 'stripe':
            break;
        }

        

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  return (
    <div className='pt-[12vh] mb-12  min-h-screen'>
      <div className='grid sm:grid-cols-2 bg-zinc-800/50 rounded-lg sm:p-8 p-4 gap-8'>
        {/* Left side - Shipping Form */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className='bg-zinc-800/80  rounded-lg p-5 transform transition-all hover:scale-[1.02] duration-300'>
            <h2 className='text-xl font-semibold text-gray-300 mb-4 flex items-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#c46e88]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Shipping Address
            </h2>

            <div className='flex flex-col gap-4'>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className='w-full p-3 rounded-lg bg-zinc-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c46e88] transition-all'
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className='w-full p-3 rounded-lg bg-zinc-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c46e88] transition-all'
                required
              />
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street Address"
                className='w-full p-3 rounded-lg bg-zinc-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c46e88] transition-all'
                required
              />
              <div className='grid grid-cols-2 gap-4'>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className='w-full p-3 rounded-lg bg-zinc-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c46e88] transition-all'
                  required
                />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className='w-full p-3 rounded-lg bg-zinc-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c46e88] transition-all'
                  required
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <input
                  type="text"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  placeholder="ZIP Code"
                  className='w-full p-3 rounded-lg bg-zinc-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c46e88] transition-all'
                  required
                />
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className='w-full p-3 rounded-lg bg-zinc-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c46e88] transition-all'
                  required
                />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className='w-full p-3 rounded-lg bg-zinc-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c46e88] transition-all'
                required
              />
              <button
                type="submit"
                className="w-full p-4 bg-gradient-to-r from-[#c46e88] to-[#EEA8B3] text-white font-semibold rounded-lg active:scale-95 transition-all"
              >
                Place Order
              </button>
            </div>

          
          </div>
        </form>
        

        {/*Right side*/}
        <div className='flex flex-col gap-8'>
          
          <CartTotal/>

          {/* Payment Method */}
          <div className='bg-zinc-800/80 rounded-lg p-5 transform transition-all hover:scale-[1.02] duration-300'>
            <h2 className='text-xl font-semibold text-gray-300 mb-4 flex items-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#c46e88]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Payment Method
            </h2>
            <div className='flex flex-col gap-3'>
             

              <button
                onClick={()=>setmethod('razorpay')} className={`group flex items-center justify-between p-4 rounded-lg bg-zinc-700  text-gray-300 transition-all duration-300 active:scale-95 ${method==='razorpay'?'bg-gradient-to-r from-zinc-700 to-[#c46e88]':''}`}
              >
                <img src="https://razorpay.com/assets/razorpay-logo.svg"
                     alt="Razorpay"
                     className="h-8" />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button 
                onClick={()=>setmethod('cod')}
                className={`group  flex items-center justify-between p-4 rounded-lg bg-zinc-700  text-gray-300 transition-all duration-300 active:scale-95 cursor-pointer ${method==='cod'?'bg-gradient-to-r from-zinc-700 to-[#c46e88]':''}`}
              >
                <div className="flex items-center gap-2">
                  <img src="https://cdn-icons-png.flaticon.com/512/1554/1554401.png"
                       alt="Cash on Delivery"
                       className="h-8" />
                  <span className="font-medium">Cash on Delivery</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
    
          
        </div>
      </div>

      
    </div>
  )
}

export default PlaceOrder
