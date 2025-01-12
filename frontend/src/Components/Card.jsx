import React ,{ useEffect } from "react";
import { NavLink } from "react-router-dom";
import Tilt from 'react-parallax-tilt';

const Card = ({ id, img, name, price,speed }) => {


  
  return (
   <Tilt>
    <NavLink to={`/product/${id}`} className=" transition-all duration-300 relative group">
    <div   className="active:scale-95 bg-gradient-to-br from-zinc-800/40 to-zinc-900/60 rounded-xl shadow-lg hover:shadow-3xl hover:-translate-y-2 transition-all duration-300">
      <div className="relative sm:h-[40vh] h-[22vh] rounded-xl bg-gradient-to-br from-[#C46E88]/10 to-[#EEA8B3]/10">
        <img
          src={img}
          alt={name}
          className="object-contain w-full h-full group-hover:scale-110 transition-all duration-500 group-hover:translate-y-[-20px] group-hover:drop-shadow-[0px_10px_30px_#ffabb8]"
        />
        <div className="absolute rounded-xl inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Add to cart icon */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button className="bg-[#C46E88] hover:bg-[#EEA8B3] text-white p-2 rounded-full  shadow-lg hover:shadow-[#C46E88]/50 transition-all duration-300 hover:scale-110">
            <i className="ri-shopping-cart-2-fill text-xl"></i>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-white text-lg font-semibold truncate group-hover:text-[#EEA8B3] transition-colors duration-300">
          {name}
        </h2>
        <div className="flex items-center justify-between">
          <p className="text-[#C46E88] font-medium flex items-center">
            <i className="ri-price-tag-3-line mr-2"></i>
            ${price}
          </p>
          <span className="text-zinc-400 group-hover:text-[#EEA8B3] group-hover:-rotate-90   transition-all duration-300">
            <i className="ri-arrow-right-line"></i>
          </span>
        </div>
      </div>
    </div>
    </NavLink>
    </Tilt>
  );
};

export default Card;

/*

 <Link to={`/product/${id}`} className="active:scale-95 transition-all duration-500">
     
      <div className="border border-[#EEA8B3] rounded-tl-2xl rounded-br-2xl p-2  hover:shadow-3xl group   hover:translate-y-[-20px] transition-all  duration-500">
        <div className=" lg:h-[40vh] bg-gradient-to-b from-[#C46E88] via-[#EEA8B3] to-[#EEA8B3] rounded-lg ">
          <img
            src={img}
            alt={name}
            className="object-contain w-full h-full picture  group-hover:scale-125 transition-all duration-500  group-hover:translate-y-[-25px]"
          />
        </div>

        <div className="p-3 group-hover:shadow-3xl bg-zinc-600 group-hover:translate-y-[-20px] transition-all">
          <h2 className="text-gray-200 lg:text-lg text-md font-bold  ">
            {name}
          </h2>
          <p className="text-[#EEA8B3] text-md">Price: ${price}</p>
        </div>
      </div>
    </Link>



 
    

*/
