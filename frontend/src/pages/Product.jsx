import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShopContext } from '../Context/Context'
import RelatedProducts from '../Components/RelatedProducts'
import gsap from 'gsap'

const Product = () => {
  const navigate = useNavigate();
  const { product_Id } = useParams()
  const { products, addTocart, token } = useContext(ShopContext)
  const [productData, setproductData] = useState(false)
  const [imageData, setimageData] = useState()
  const [sizeData, setsizeData] = useState()
  const [activeTab, setActiveTab] = useState('description');

  const FetchProductdata = async () => {
    await products.map((item) => {
      if (item._id === product_Id) {
        setproductData(item)
        setimageData(item.images[0])
        return null;
      }
    })
  }
  useEffect(() => {
    FetchProductdata()
  }, [product_Id, products])


  const handleAddToCart = () => {
    if (token) {
      addTocart(productData._id, sizeData);
    } else {
      navigate('/login'); // Redirect to login page if token is not present
    }
  }

useEffect(()=>{
  gsap.from('.mainImg', { opacity: 0,y:-300,scale:0, duration: 0.5,ease: "expoScale(0.5,7,none)", });
 
},[product_Id,products])

useEffect(() => {
  window.scrollTo(0, 0);
},[product_Id]);

  return productData ? (
    <div className='min-h-screen pt-[12vh]'>
      <div className='sm:grid grid-cols-2 bg-zinc-800/50 rounded-xl shadow-2xl py-8 gap-6'>
        {/* left */}
        <div className='flex sm:mb-0 mb-8 sm:flex-row flex-col-reverse items-center sm:gap-4 gap-6 '>
          {/*Side Images*/}
          <div className=' sm:w-[25%] w-full  flex sm:flex-col flex-row gap-4 justify-center items-center'>
            {
              productData.images.map((image, index) => (
                <img
                  onClick={() => setimageData(image)}
                  key={index}
                  className=' sm:w-[70%] w-[20%] rounded-lg border-2 border-transparent hover:border-[#EEA8B3] transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#EEA8B3]/20'
                  src={image}
                  alt='product view'
                />
              ))
            }
          </div>

          {/*Main Image*/}
          <div className='sm:w-[75%] w-[90%]  group border-2 border-[#EEA8B3] overflow-hidden  shadow-lg hover:shadow-xl  rounded-xl'>
         
              <img
                className=' mainImg w-full h-full object-cover '
                src={imageData}
                alt='product main view'
              />
           
          </div>
        </div>

        {/* right */}
        <div className='px-8 text-gray-300'>
          <div className='flex flex-col justify-around gap-5 '>

            <h1 className='text-3xl font-bold tracking-wide bg-gradient-to-r from-[#EEA8B3] to-[#C46E88] bg-clip-text text-transparent'>
              {productData.name}
            </h1>

            <div className='flex items-center gap-3'>
              <div className='flex text-[#EEA8B3]'>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-half-fill"></i>
              </div>
              <span className='text-sm text-gray-400'>(122 verified reviews)</span>
            </div>

            <div>
              <p className='text-4xl font-bold text-[#EEA8B3] mb-2'>
                <i className="ri-money-dollar-circle-line mr-1"></i>
                {productData.price}
              </p>
              <p className='text-gray-300 leading-relaxed'>{productData.description}</p>
            </div>

            <div>
              <p className='font-medium flex items-center gap-2 mb-2'>
                <i className="ri-t-shirt-2-line text-[#EEA8B3]"></i>
                Select Size
              </p>
              <div className='flex gap-3'>
                {productData.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setsizeData(size)}
                    className={`sm:px-5 px-4 py-3 rounded-lg font-medium transition-all duration-300
                      ${sizeData === size
                      ? 'bg-[#C46E88] text-white shadow-lg shadow-[#C46E88]/30'
                      : 'bg-zinc-800/80 hover:bg-[#C46E88]/80 text-gray-300'}
                      focus:ring-2 focus:ring-[#EEA8B3] active:scale-95`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className='flex gap-4'>
              <button
                onClick={handleAddToCart}
                disabled={!sizeData}
                className='flex-1 bg-gradient-to-r from-[#C46E88] to-[#EEA8B3] hover:from-[#EEA8B3] hover:to-[#C46E88] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 text-white sm:px-6 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl focus:ring-2 focus:ring-[#EEA8B3] active:scale-95'
              >
                
                <i className="ri-shopping-cart-line mr-2"></i>
               <span className='sm:inline hidden'>Add to Cart</span>
              </button>
              <button className='flex-1 bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-[#C46E88] active:scale-95'>
                <i className="ri-bank-card-line mr-2"></i>
                Buy Now
              </button>
            </div>

            <hr className='border border-[#EEA8B3]/20' />

            <div className='text-sm text-gray-400 space-y-2'>
              <div className='flex items-center gap-3 hover:text-[#EEA8B3] transition-colors duration-300'>
                <i className="ri-shield-check-line text-xl text-[#EEA8B3]"></i>
                <p>100% Original product guaranteed</p>
              </div>
              <div className='flex items-center gap-3 hover:text-[#EEA8B3] transition-colors duration-300'>
                <i className="ri-truck-line text-xl text-[#EEA8B3]"></i>
                <p>Free shipping on orders over $500</p>
              </div>
              <div className='flex items-center gap-3 hover:text-[#EEA8B3] transition-colors duration-300'>
                <i className="ri-refresh-line text-xl text-[#EEA8B3]"></i>
                <p>Easy 30-day returns & exchanges</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/*Description & Reviews */}
      <div className='p-3 my-10'>
        <div className='flex sm:justify-start justify-center gap-4'>
          <button
            onClick={() => setActiveTab('description')}
            className={`px-3 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-medium rounded-t-xl transition-all duration-300 flex items-center gap-1 sm:gap-2 whitespace-nowrap
              ${activeTab === 'description'
              ? 'bg-[#c46e88] text-white shadow-lg shadow-[#c46e88]/30'
              : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-white'}`}
          >
            <i className="ri-file-text-line"></i>
            <span className="hidden sm:inline">Description</span>
            <span className="sm:hidden">Info</span>
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-3 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-medium rounded-t-xl transition-all duration-300 flex items-center gap-1 sm:gap-2 whitespace-nowrap
              ${activeTab === 'reviews'
              ? 'bg-[#c46e88] text-white shadow-lg shadow-[#c46e88]/30'
              : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-white'}`}
          >
            <i className="ri-chat-3-line"></i>
            Reviews
            <span className='bg-[#EEA8B3] text-white text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md'>122</span>
          </button>
        </div>

        <div className='bg-zinc-800/50 rounded-tl-none rounded-xl p-6 text-zinc-400 text-md shadow-lg'>
          {/* Description */}
          {activeTab === 'description' && (
            <div className="space-y-8">
              {/* Product Overview */}
              <div className="bg-zinc-900/50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <i className="ri-information-line text-[#EEA8B3]"></i>
                  Product Overview
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  Experience unparalleled comfort and style with our latest collection. This piece features premium materials and expert craftsmanship, ensuring both durability and fashion-forward design. Perfect for any occasion, it's designed to make you look and feel your best.
                </p>
              </div>

              {/* Key Features */}
              <div className="bg-zinc-900/50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <i className="ri-award-line text-[#EEA8B3]"></i>
                  Key Features
                </h3>
                <ul className="grid md:grid-cols-2 gap-4 text-zinc-400">
                  <li className="flex items-center gap-2 hover:text-[#EEA8B3] transition-colors duration-300">
                    <i className="ri-shield-check-line text-[#EEA8B3]"></i>
                    Premium Quality Material
                  </li>
                  <li className="flex items-center gap-2 hover:text-[#EEA8B3] transition-colors duration-300">
                    <i className="ri-heart-2-line text-[#EEA8B3]"></i>
                    Comfortable Fit
                  </li>
                  <li className="flex items-center gap-2 hover:text-[#EEA8B3] transition-colors duration-300">
                    <i className="ri-tools-line text-[#EEA8B3]"></i>
                    Durable Construction
                  </li>
                  <li className="flex items-center gap-2 hover:text-[#EEA8B3] transition-colors duration-300">
                    <i className="ri-refresh-line text-[#EEA8B3]"></i>
                    Easy Maintenance
                  </li>
                </ul>
              </div>

              {/* Care Instructions */}
              <div className="bg-zinc-900/50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <i className="ri-hand-heart-line text-[#EEA8B3]"></i>
                  Care Instructions
                </h3>
                <ul className="space-y-3 text-zinc-400">
                  <li className="flex items-center gap-2 hover:text-[#EEA8B3] transition-colors duration-300 group">
                    <i className="ri-drop-line text-[#EEA8B3] group-hover:rotate-12 transition-transform duration-300"></i>
                    Machine wash in cold water
                  </li>
                  <li className="flex items-center gap-2 hover:text-[#EEA8B3] transition-colors duration-300 group">
                    <i className="ri-sun-line text-[#EEA8B3] group-hover:rotate-45 transition-transform duration-300"></i>
                    Tumble dry on low heat
                  </li>
                  <li className="flex items-center gap-2 hover:text-[#EEA8B3] transition-colors duration-300 group">
                    <i className="ri-forbid-2-line text-[#EEA8B3] group-hover:scale-110 transition-transform duration-300"></i>
                    Do not bleach
                  </li>
                  <li className="flex items-center gap-2 hover:text-[#EEA8B3] transition-colors duration-300 group">
                    <i className="ri-t-shirt-line text-[#EEA8B3] group-hover:translate-x-1 transition-transform duration-300"></i>
                    Iron on medium heat if needed
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Reviews */}
          {activeTab === 'reviews' && <div>
            {/* Review 1 */}
            {/* Reviews Grid */}
            <div className='grid sm:grid-cols-2 grid-cols-1 gap-6 '>
              {/* Review 1 */}
              <div className='bg-gradient-to-br bg-zinc-900/50 to-zinc-900/90 rounded-xl p-6 shadow-lg hover:shadow-xl border border-[#C46E88]/20 hover:border-[#C46E88]/40 transition-all duration-300 transform hover:-translate-y-1'>
                <div className='flex justify-between   items-start mb-4'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-full bg-gradient-to-br from-[#C46E88] to-[#EEA8B3] flex items-center justify-center text-white font-bold shadow-md'>
                      SJ
                    </div>
                    <div>
                      <h4 className='text-white font-medium'>Sarah Johnson</h4>
                      <div className='flex items-center gap-1 text-[#EEA8B3]'>
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="ri-star-fill"></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className='text-sm text-[#EEA8B3] bg-[#C46E88]/10 px-3 py-1 rounded-full font-medium truncate'>2 days ago</span>
                </div>
                <p className='text-zinc-300 border-l-2 border-[#EEA8B3] pl-4 leading-relaxed'>Absolutely love this product! The quality is outstanding and it fits perfectly. Will definitely be ordering more in different colors.</p>
              </div>

              {/* Review 2 */}
              <div className='bg-gradient-to-br bg-zinc-900/50 to-zinc-900/90 rounded-xl p-6 shadow-lg hover:shadow-xl border border-[#C46E88]/20 hover:border-[#C46E88]/40 transition-all duration-300 transform hover:-translate-y-1'>
                <div className='flex justify-between items-start mb-4'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-full bg-gradient-to-br from-[#C46E88] to-[#EEA8B3] flex items-center justify-center text-white font-bold shadow-md'>
                      MP
                    </div>
                    <div>
                      <h4 className='text-white font-medium'>Mike Peters</h4>
                      <div className='flex items-center gap-1 text-[#EEA8B3]'>
                        {[...Array(4)].map((_, i) => (
                          <i key={i} className="ri-star-fill"></i>
                        ))}
                        <i className="ri-star-line"></i>
                      </div>
                    </div>
                  </div>
                  <span className='text-sm text-[#EEA8B3] bg-[#C46E88]/10 px-3 py-1 rounded-full font-medium truncate'>1 week ago</span>
                </div>
                <p className='text-zinc-300 border-l-2 border-[#EEA8B3] pl-4 leading-relaxed'>Great product for the price. Shipping was fast and the customer service was excellent when I had questions.</p>
              </div>

              {/* Review 3 */}
              <div className='bg-gradient-to-br bg-zinc-900/50 to-zinc-900/90 rounded-xl p-6 shadow-lg hover:shadow-xl border border-[#C46E88]/20 hover:border-[#C46E88]/40 transition-all duration-300 transform hover:-translate-y-1'>
                <div className='flex justify-between items-start mb-4'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-full bg-gradient-to-br from-[#C46E88] to-[#EEA8B3] flex items-center justify-center text-white font-bold shadow-md'>
                      EC
                    </div>
                    <div>
                      <h4 className='text-white font-medium'>Emily Chen</h4>
                      <div className='flex items-center gap-1 text-[#EEA8B3]'>
                        {[...Array(4)].map((_, i) => (
                          <i key={i} className="ri-star-fill"></i>
                        ))}
                        <i className="ri-star-half-fill"></i>
                      </div>
                    </div>
                  </div>
                  <span className='text-sm text-[#EEA8B3] truncate bg-[#C46E88]/10 px-3 py-1 rounded-full font-medium'>2 weeks ago</span>
                </div>
                <p className='text-zinc-300 border-l-2 border-[#EEA8B3] pl-4 leading-relaxed'>The material quality is exceptional and the design is exactly as pictured. Would highly recommend to anyone considering this purchase.</p>
              </div>

              {/* Review 4 */}
              <div className='bg-gradient-to-br bg-zinc-900/50 to-zinc-900/90 rounded-xl p-6 shadow-lg hover:shadow-xl border border-[#C46E88]/20 hover:border-[#C46E88]/40 transition-all duration-300 transform hover:-translate-y-1'>
                <div className='flex justify-between items-start mb-4'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-full bg-gradient-to-br from-[#C46E88] to-[#EEA8B3] flex items-center justify-center text-white font-bold shadow-md'>
                      RJ
                    </div>
                    <div>
                      <h4 className='text-white font-medium'>Rachel Johnson</h4>
                      <div className='flex items-center gap-1 text-[#EEA8B3]'>
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="ri-star-fill"></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className='text-sm text-[#EEA8B3] truncate bg-[#C46E88]/10 px-3 py-1 rounded-full font-medium'>3 weeks ago</span>
                </div>
                <p className='text-zinc-300 border-l-2 border-[#EEA8B3] pl-4 leading-relaxed'>I'm absolutely thrilled with this purchase! The attention to detail is remarkable, and the comfort level exceeds expectations. The size guide was spot on.</p>
              </div>
            </div>

            {/* Add Review Button */}

          </div>}

        </div>
      </div>

      {/*Related Products*/}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : null;
}

export default Product
