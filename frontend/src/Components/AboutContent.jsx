import React, { useContext } from 'react'
import Title from './Title'
import {assets} from '../Assets/assets'
import NewsLetter from '../Components/NewsLetter'
import { ShopContext } from '../Context/Context'
import PolicyCard from './PolicyCard'
import Title2 from './Title2'


const AboutContent = () => {

    const {AboutAssets}= useContext(ShopContext)

  return (
    <div>
      <Title text1='ABOUT' text2='US'></Title>

      <div className='grid grid-cols-12 sm:p-8 p-6 gap-6  text-lg bg-zinc-800/50 backdrop-blur rounded-lg shadow-2xl text-gray-400  overflow-hidden'>  

        {/* LEFT IMAGE */}
        <div className='lg:col-span-5 col-span-12  overflow-hidden rounded-lg hover:scale-[1.02] transition-all duration-500 '>
          <div className='rounded-lg overflow-hidden'>
          <video 
              className="w-full h-[50vh] sm:h-[80vh] object-cover hover:scale-105 transition-transform duration-500"
              src={assets.v3}
              autoPlay
              loop
              muted
              playsInline
            ></video>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className='lg:col-span-7 col-span-12  sm:pl-0 text-md'>
            <div className=''>

                <p className='leading-relaxed   mb-4'>
                  Clothix was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
                </p>
                <p className='leading-relaxed  mb-4'>
                  Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
                </p>

                <div className='bg-zinc-800/80 p-4 rounded-lg shadow-inner  border border-[#C46E88]/20 hover:border-[#C46E88]/40 transition-all duration-300'>
                    <h5 className='text-2xl font-bold text-[#c46e88] mb-4  relative w-fit'>
                      Our Mission
                      <span className='absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#C46E88] to-transparent'></span>
                    </h5>
                    <p className='leading-relaxed hover:text-white transition-all duration-300 transform hover:translate-x-2'>
                      Our mission at Clothix is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
                    </p>
                </div>
            </div>
        </div>
      </div>
    

{/* Why Choose Us */}
      <div className='my-20'>
        <Title text1='WHY' text2='CHOOSE US'></Title>

        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-8'>        
       {[
          {
            icon: "ri-shield-check-line",
            title: "Quality Assurance",
            description: "Every product in our collection undergoes rigorous quality checks to ensure you receive only the finest items that meet our high standards.",
            borderColor: '#C46E88'
          },
          {
            icon: "ri-customer-service-2-line",
            title: "24/7 Support",
            description: "Our dedicated customer service team is available round the clock to assist you with any queries or concerns you may have.",
            borderColor: '#EEA8B3'
          },
          {
            icon: "ri-secure-payment-line",
            title: "Secure Payments",
            description: "Shop with confidence using our secure payment gateway that ensures your financial information remains protected.",
            borderColor: '#C46E88'
          },
          {
            icon: "ri-truck-line",
            title: "Fast Delivery",
            description: "Experience swift and reliable shipping services with real-time tracking to keep you updated on your order's journey.",
            borderColor: '#EEA8B3'
          },
          {
            icon: "ri-exchange-line",
            title: "Easy Returns",
            description: "We offer hassle-free returns within 30 days of purchase, ensuring your shopping experience remains worry-free.",
            borderColor: '#C46E88'
          },
          {
            icon: "ri-price-tag-3-line",
            title: "Best Prices",
            description: "Enjoy competitive prices and regular deals that make quality fashion accessible without compromising your budget.",
            borderColor: '#EEA8B3'
          }
        ].map((feature, index) => (
          <PolicyCard key={index} icon={feature.icon} title={feature.title} description={feature.description} borderColor={feature.borderColor}></PolicyCard>
        ))}

      </div>
        
      </div>




{/* Story */}
     
        <div className="bg-zinc-800/60 p-8 rounded-xl shadow-2xl border-l-4 border-[#C46E88] hover:shadow-2xl transition-all duration-300">
       <Title2 text='Our Story'></Title2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div className="text-lg  text-md text-gray-400">
              <p className="leading-relaxed hover:text-white transition-colors duration-300">
                Founded in 2020, Clothix emerged from a passion for making high-quality fashion accessible to everyone. What started as a small boutique has grown into a beloved brand, serving fashion enthusiasts across the country.
              </p>
              
              <p className="my-4 leading-relaxed hover:text-white transition-colors duration-300">
                Our mission is simple: to provide trendsetting fashion that doesn't compromise on quality or sustainability. We believe that great style shouldn't come at the expense of our planet, which is why we partner with ethical manufacturers and use eco-friendly materials whenever possible.
              </p>

              <p className="leading-relaxed hover:text-white transition-colors duration-300">
                At Clothix, we're more than just a fashion brand - we're a community. Our team of dedicated fashion experts works tirelessly to curate collections that help you express your unique style and confidence.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">

              <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/60 p-8 rounded-xl shadow-lg border-l-4 border-[#EEA8B3] hover:shadow-2xl transition-all duration-300 group text-center">
                <h3 className="sm:text-4xl text-3xl font-bold text-[#EEA8B3] mb-2 group-hover:scale-110 transition-transform duration-300">50K+</h3>
                <p className="text-zinc-400 group-hover:text-white transition-colors duration-300">Happy Customers</p>
              </div>
              
              <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/60 p-8 rounded-xl shadow-lg border-l-4 border-[#C46E88] hover:shadow-2xl transition-all duration-300 group text-center">
                <h3 className="text-4xl font-bold text-[#C46E88] mb-2 group-hover:scale-110 transition-transform duration-300">1000+</h3>
                <p className="text-zinc-400 group-hover:text-white transition-colors duration-300">Products</p>
              </div>
              
              <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/60 p-8 rounded-xl shadow-lg border-l-4 border-[#C46E88] hover:shadow-2xl transition-all duration-300 group text-center">
                <h3 className="text-4xl font-bold text-[#C46E88] mb-2 group-hover:scale-110 transition-transform duration-300">15+</h3>
                <p className="text-zinc-400 group-hover:text-white transition-colors duration-300">Categories</p>
              </div>
              
              <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/60 p-8 rounded-xl shadow-lg border-l-4 border-[#EEA8B3] hover:shadow-2xl transition-all duration-300 group text-center">
                <h3 className="text-4xl font-bold text-[#EEA8B3] mb-2 group-hover:scale-110 transition-transform duration-300">24/7</h3>
                <p className="text-zinc-400 group-hover:text-white transition-colors duration-300">Support</p>
              </div>
            </div>
          </div>
        </div>
    
     


{/* Values */}
        <div className="bg-zinc-800/60 my-20 backdrop-blur rounded-2xl p-8 shadow-2xl border-r-4 border-[#EEA8B3]">
      <Title2 text='Our Values'></Title2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: 'ri-heart-line',
                title: 'Customer First',
                description: 'Your satisfaction is our priority. We aim to exceed your expectations.'
              },
              {
                icon: 'ri-leaf-line',
                title: 'Sustainability',
                description: "We're committed to eco-friendly practices and sustainable sourcing."
              },
              {
                icon: 'ri-award-line',
                title: 'Quality Promise',
                description: 'Our products undergo rigorous quality checks to meet high standards.'
              },
              {
                icon: 'ri-team-line',
                title: 'Innovation',
                description: 'We embrace creativity to bring you the latest fashion trends.'
              }
            ].map((value, index) => (
             <PolicyCard key={index} icon={value.icon} title={value.title} description={value.description}></PolicyCard>
            ))}
          </div>
        </div>
    


{/* Process */}
        <div className="bg-zinc-800/60 backdrop-blur rounded-2xl p-8 shadow-2xl border-r-4 border-[#EEA8B3]">
            <Title2 text='Our Process'></Title2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: 'ri-pencil-ruler-2-line',
                title: 'Design',
                description: 'Crafting unique designs that blend contemporary trends with timeless elegance.'
              },
              {
                icon: 'ri-tools-line',
                title: 'Craft',
                description: 'Expert artisans bring designs to life using premium materials and techniques.'
              },
              {
                icon: 'ri-shield-check-line',
                title: 'Quality Check',
                description: 'Rigorous testing ensures each piece meets our exacting standards.'
              },
              {
                icon: 'ri-shopping-bag-line',
                title: 'Deliver',
                description: 'Carefully packaged and delivered to exceed your expectations.'
              }
            ].map((process, index) => (
             <PolicyCard key={index} icon={process.icon} title={process.title} description={process.description}></PolicyCard>
            ))}
          </div>
        </div>
   

     
   

      <NewsLetter></NewsLetter>

      
    </div>
    
  )
}

export default AboutContent
