import React, { useContext ,useState} from 'react'
import Title from '../Components/Title'
import { ShopContext } from '../Context/Context'
import axios from 'axios'
import { useEffect } from 'react'


const Orders = () => {

  const {backendUrl,token}= useContext(ShopContext);
  const [orderData,setorderData]=useState([])

  const FetchOrderData=async()=>{
    try{
      if(!token){
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/listfrontend',{},{headers:{token}})
      console.log(response.data)
      if(response.data.success){
        let allOrdersItems = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{ 
              item['status'] = order.status;
              item['paymentStatus'] = order.paymentStatus;
              item['paymentMethod'] = order.paymentMethod;
              item['date'] = order.date;
              allOrdersItems.push(item)
                   })
        })
        setorderData(allOrdersItems.reverse())
      
      }
    }
    
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    FetchOrderData()
  },[token])

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);
  return (
    <div className='min-h-screen py-20 px-4 max-w-7xl mx-auto'>
      <div className='space-y-6'>
        <Title text1='My' text2='Orders'/>
        
        {
          orderData.map((item)=>(
            <div 
            key={item._id}
            className='flex flex-col sm:gap-4 gap-2 sm:flex-row p-6 rounded-lg bg-gradient-to-br from-zinc-800/50 to-zinc-900/60 border-l-2 border-transparent hover:border-[#EEA8B3] transition-all duration-300  shadow-xl hover:shadow-2xl'>
              <div className='w-full flex gap-6  group'>
                <div className=' overflow-hidden sm:block hidden rounded-lg'>
                  <img 
                    className='sm:w-[8vw] w-[30vw]  h-full object-cover shadow-md border border-transparent group-hover:border-[#EEA8B3] transition-all duration-300' 
                    src={item.images[0]} 
                    alt={item.name}
                  />
                  
                </div>
                <div className='space-y-3'>
                  <h3 className='text-xl font-semibold text-[#EEA8B3]'>{item.name}</h3>
                  <div className='flex gap-4 items-center'>
                    <p className='text-white/90 font-medium'>$ {item.price}</p>
                    
                    <span className='px-3 py-1 bg-[#C46E88]/20 text-[#EEA8B3] rounded-full text-sm font-medium'>{item.size} X {item.qty}</span>
                  </div>
                  <div className='space-y-2 text-zinc-400 text-sm truncate'>
                    <h3 className='flex items-center gap-2'>
                      <i className="ri-fingerprint-line text-[#C46E88]"></i>
                      Order ID: <span className='font-mono text-white/70'>{item._id.slice(5)}</span>
                    </h3>
                    <h3 className='flex items-center gap-2'>
                      <i className="ri-calendar-line text-[#C46E88]"></i>
                      Date: {new Date(item.date).toLocaleDateString()}
                    </h3>
                    <h3 className='flex items-center gap-2'>
                      <i className="ri-bank-card-line text-[#C46E88]"></i>
                      Payment Method: {item.paymentMethod}
                    </h3>
                  </div>
                </div>
              </div>

              <div className='w-full  flex flex-row justify-between items-center gap-4 sm:border-l sm:border-[#C46E88]/20 sm:pl-6'>
                <div className={`px-3 py-2 rounded-full flex gap-1 ${item.status === 'processing' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-600' :
                   item.status === 'completed' ? 'bg-green-900/50 text-green-300 border border-green-600' :
                   item.status === 'cancelled' ? 'bg-red-900/50 text-red-300 border border-red-600' :
                   item.status === 'shipped' ? 'bg-blue-900/50 text-blue-300 border border-blue-600' :
                   item.status === 'out for delivery' ? 'bg-blue-900/50 text-blue-300 border border-blue-600' :
                   item.status === 'returned' ? 'bg-purple-900/50 text-purple-300 border border-purple-600' :
                ''}`}>
                <i className={`${item.status==='processing'?'ri-restart-line':
                  item.status === 'completed' ? 'ri-checkbox-circle-line' :
                  item.status === 'cancelled' ? 'ri-close-circle-line' :
                  item.status === 'shipped' ? 'ri-ship-line' :
                  item.status === 'out for delivery' ? 'ri-truck-line' :
                  item.status === 'returned' ? 'ri-arrow-go-back-line' :
                  'ri-question-line'

                }`}></i>
                  <h3 className=' font-medium capitalize'>{item.status}</h3>
                </div>
                <button onClick={FetchOrderData} className='group outline-none relative w-fit sm:w-auto bg-gradient-to-r from-[#C46E88] to-[#EEA8B3] hover:from-[#EEA8B3] hover:to-[#C46E88] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#c46e88] focus:ring-offset-2 focus:ring-offset-zinc-800 overflow-hidden transform hover:-translate-y-0.5 transition-all duration-300'>
                  <span className='relative z-10 flex items-center justify-center gap-2 font-medium'>
                    <i className="ri-route-line text-lg group-hover:rotate-12 transition-transform duration-300"></i>
                   <span className='sm:inline hidden'>Track Order</span>
                    <i className="ri-arrow-right-line sm:inline hidden text-lg group-hover:translate-x-1 transition-transform duration-300"></i>
                  </span>
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
