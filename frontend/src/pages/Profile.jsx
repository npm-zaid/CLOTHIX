import React, { useContext, useState, useEffect } from 'react'
import Title from '../Components/Title'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ShopContext } from '../Context/Context'
import axios from 'axios'


const Profile = () => {

  const { token , backendUrl} = useContext(ShopContext)
  const [user, setUser] = useState(null)
 
  const FetchUser = async () => {
    try {
      const res = await axios.post(backendUrl + '/api/user/SingleUser', {}, {
        headers: {
          token: token
        }
      })
      if(res.data.success){
        setUser(res.data.user)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Error fetching user data")
    }
  }

   useEffect(()=>{
    FetchUser()
    
   },[])

   useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  return (
    <div className='min-h-screen pt-[12vh] pb-5 px-4 max-w-7xl mx-auto'>
      <Title text1='My' text2='Profile' />

      <div className='mt-8 p-8 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/60 border border-[#C46E88]/20 hover:border-[#C46E88]/40 shadow-xl'>
        <div className='flex flex-col md:flex-row gap-10 items-center'>
          
          {/* Profile Image */}
          <div className='relative group'>
            <div className='w-36 h-36 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border-4 border-[#EEA8B3] shadow-xl transform transition hover:scale-105'>
              {user?.profilePic ? (
                <img 
                  src={user.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <i className="ri-user-heart-line text-6xl text-[#EEA8B3]"></i>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className='flex-1 space-y-6'>
            <div className='space-y-3'>
              <h2 className='text-3xl font-bold text-white flex items-center gap-3'>
                <i className="ri-shield-user-line text-[#EEA8B3]"></i>
                {user?.username || 'Loading...'}
              </h2>
              <p className='text-white/90 flex items-center gap-3 text-lg'>
                <i className="ri-mail-star-line text-[#EEA8B3]"></i>
                {user?.email || 'Loading...'}
              </p>
            </div>

            <div className='space-y-4 pt-4 border-t border-[#EEA8B3]/30'>
              <h4 className='text-white/80 font-medium'>Quick Actions</h4>
              <div className='flex flex-wrap gap-4'>
                <Link to='/orders' className='flex items-center gap-2 px-4 py-2 rounded-full bg-[#C46E88]/20 text-[#EEA8B3] hover:bg-[#C46E88]/30 transition-all duration-300'>
                  <i className="ri-shopping-bag-line"></i>
                  My Orders
                </Link>
                <Link to='/cart' className='flex items-center gap-2 px-4 py-2 rounded-full bg-[#C46E88]/20 text-[#EEA8B3] hover:bg-[#C46E88]/30 transition-all duration-300'>
                  <i className="ri-heart-line"></i>
                  Wishlist
                </Link>
                <Link to='/' className='flex items-center gap-2 px-4 py-2 rounded-full bg-[#C46E88]/20 text-[#EEA8B3] hover:bg-[#C46E88]/30 transition-all duration-300'>
                  <i className="ri-settings-4-line"></i>
                  Settings
                </Link>
                
              </div>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  )
}

export default Profile
