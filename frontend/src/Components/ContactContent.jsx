import React from 'react'
import { assets } from '../Assets/assets'
import PolicyCard from './PolicyCard'
import Title2 from './Title2'



const ContactContent = () => {
  return (
    <>
    <div className='grid lg:grid-cols-2 items-center gap-6 sm:p-8 p-6 bg-zinc-800/50 rounded-lg shadow-2xl'>
        
        {/** Video */}
        <div className='overflow-hidden rounded-lg  hover:scale-[1.02] transition-all duration-500 '> 
          <video 
              className="w-full h-[50vh] sm:h-[80vh] object-cover hover:scale-105 transition-transform duration-500"
              src={assets.v2}
              autoPlay
              loop
              muted
              playsInline
            ></video>
        </div>

        {/** Text */}
     
            <div className='text-md flex flex-col gap-6 text-gray-400 p-6 h-full rounded-lg bg-zinc-800/60 backdrop-blur-sm'>
                
                    <div>
                    <h4 className="text-3xl w-fit leading-8 mb-3 font-semibold  relative bg-gradient-to-r from-[#111111] via-[#EEA8B3] to-transparent  bg-clip-text text-transparent animate-gradient bg-[length:200%]">
                        Our Store
                        <span className='absolute -bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#C46E88] via-[#EEA8B3] to-transparent animate-shine'></span>
                    </h4>
                        <div className='flex flex-col gap-2'>
                            <p className='flex items-center gap-2 hover:text-white transition-all duration-300 transform hover:translate-x-2'>
                                <i className="ri-map-pin-2-fill text-[#c46e88]"></i>
                                54709 Willms Station, Suite 350, Washington, USA
                            </p>
                            <p className='flex items-center gap-2 hover:text-white transition-all duration-300 transform hover:translate-x-2'>
                                <i className="ri-phone-fill text-[#c46e88]"></i>
                                (415) 555-0132
                            </p>
                            <p className='flex items-center gap-2 hover:text-white transition-all duration-300 transform hover:translate-x-2'>
                                <i className="ri-mail-fill text-[#c46e88]"></i>
                                admin@Clothix.com
                            </p>
                        </div>
                    </div>

                    <div className=''>
                    <h4 className="text-3xl w-fit leading-8 mb-3 font-semibold  relative bg-gradient-to-r from-[#111111] via-[#EEA8B3] to-transparent  bg-clip-text text-transparent animate-gradient bg-[length:200%]">
                        Follow Us
                        <span className='absolute -bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#C46E88] via-[#EEA8B3] to-transparent animate-shine'></span>
                    </h4>

<div className='flex gap-4 mt-4'>
                <a href="#" className="w-10 h-10 rounded-full bg-[#C46E88]/20 flex items-center justify-center group hover:bg-[#C46E88] transition-all duration-300">
                  <i className="ri-facebook-fill text-[#EEA8B3] group-hover:text-white transition-colors"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#C46E88]/20 flex items-center justify-center group hover:bg-[#C46E88] transition-all duration-300">
                  <i className="ri-twitter-fill text-[#EEA8B3] group-hover:text-white transition-colors"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#C46E88]/20 flex items-center justify-center group hover:bg-[#C46E88] transition-all duration-300">
                  <i className="ri-linkedin-fill text-[#EEA8B3] group-hover:text-white transition-colors"></i>
                </a>
                <a href="https://www.instagram.com/zaid_rehman_05" className="w-10 h-10 rounded-full bg-[#C46E88]/20 flex items-center justify-center group hover:bg-[#C46E88] transition-all duration-300">
                  <i className="ri-instagram-fill text-[#EEA8B3] group-hover:text-white transition-colors"></i>
                </a>
              </div>

</div>
                  

                    <div className=' flex flex-col gap-2'>
                    <h4 className="text-3xl w-fit leading-8 mb-3 font-semibold  relative bg-gradient-to-r from-[#111111] via-[#EEA8B3] to-transparent  bg-clip-text text-transparent animate-gradient bg-[length:200%]">
                        Careers
                        <span className='absolute -bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#C46E88] via-[#EEA8B3] to-transparent animate-shine'></span>
                    </h4>

                        <p className='hover:text-white transition-all duration-300'>Join our team and help shape the future of fashion.</p>
                        <button className='w-fit bg-gradient-to-r from-[#C46E88] to-[#EEA8B3] hover:from-[#EEA8B3] hover:to-[#C46E88] text-white px-8 py-3 rounded-lg flex items-center gap-2 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#C46E88]/50'>
                            Explore jobs
                            <i className="ri-arrow-right-line animate-bounce-x"></i>
                        </button>
                    </div>

      
           
        </div>
    </div>

   
        <div className='my-20 text-lg text-gray-300 p-6 rounded-lg bg-zinc-800/50 shadow-2xl transition-all duration-300 '>
            
                <div>
                   <div className='w-fit'><Title2 text='Customer Service'></Title2> </div>

                    <div className='  '>
                        <p className='mb-4'>We're here to help! Reach out to us through any of these channels:</p>
                        
                        <div className='grid md:grid-cols-2 gap-6'>
                        
                            <div className='p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800/70 transition-all duration-300 flex items-center gap-4'>
                                <div className='p-3 bg-gradient-to-br from-[#C46E88]/20 to-transparent rounded-full'>
                                    <i className="ri-customer-service-2-fill text-2xl text-[#EEA8B3]"></i>
                                </div>
                                <div>
                                    <h4 className='font-semibold text-white'>24/7 Support</h4>
                                    <p className='text-sm text-gray-400'>1-800-003332</p>
                                </div>
                            </div>

                            <div className='p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800/70 transition-all duration-300 flex items-center gap-4'>
                                <div className='p-3 bg-gradient-to-br from-[#C46E88]/20 to-transparent rounded-full'>
                                    <i className="ri-chat-1-fill text-2xl text-[#EEA8B3]"></i>
                                </div>
                                <div>
                                    <h4 className='font-semibold text-white'>Live Chat</h4>
                                    <p className='text-sm text-gray-400'>Available 9AM - 9PM</p>
                                </div>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <a href="https://www.instagram.com/zaid_rehman_05" className='w-full bg-gradient-to-r from-[#C46E88] to-[#EEA8B3] active:scale-95 hover:from-[#EEA8B3] hover:to-[#C46E88] text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2  transition-all duration-300 shadow-lg '>
                                Start a Conversation
                                <i className="ri-message-3-line"></i>
                            </a>
                        </div>

                        <div className='text-sm text-gray-400 mt-4'>
                            <p className='flex items-center gap-2'>
                                <i className="ri-time-line text-[#c46e88]"></i>
                                Average response time: 2-3 minutes
                            </p>
                        </div>
                    </div>
                </div>
            
        </div>
   

    

   
      
       
        
          <div className='grid md:grid-cols-3 gap-6'>
            {[
              {
                icon: 'ri-phone-line',
                title: 'Phone',
                description: '+1 (555) 123-4567 Mon-Fri : 9AM-6PM'
              },
              {
                icon: 'ri-mail-line',
                title: 'Email',
                description : 'support@Clothix.com 24/7 Support'
              },
              {
                icon: 'ri-map-pin-line',
                title: 'Address',
                description : '123 Fashion Street, New York, NY 10001'
              }
            ].map((contact, index) => (
              <PolicyCard  icon={contact.icon} title={contact.title} description={contact.description}  />
            ))}
          </div>
        
    
    
    </>


  )
}

export default ContactContent
