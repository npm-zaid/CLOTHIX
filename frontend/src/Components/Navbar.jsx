import React, { useEffect , useContext } from 'react'
import {assets} from '../Assets/assets'
import { NavLink } from 'react-router-dom'
import gsap from 'gsap'
import { useState ,useRef} from 'react'
import { useGSAP } from '@gsap/react';
import { ShopContext } from '../Context/Context'

gsap.registerPlugin(useGSAP);
function Navbar() {

  const {token,settoken,navigate}=useContext(ShopContext)

  const [showNavbar, setShowNavbar] = useState(false);
  

  //HAMBURGER MENU LOGIC
    const [menu, setmenu] = useState(false)
    const togglemenu = () => setmenu(!menu)
    const tl = useRef();
    useGSAP(()=>{
  
        tl.current = gsap.timeline({paused:false})
        .to(".sidebar-wrapper",{
          transform: 'translateX(0%)',
          ease: "power4.in",
          duration:.7,
        })
        .from('.sidebar-data a',{
            x:100,
            opacity: 0,
            ease: "power4.in",
            duration:.5,
            stagger:.1,
        })
    })
    useEffect(()=>{
        if(menu){
          tl.current.play()
        }
        else{
          tl.current.reverse()
        }
    
      },[menu])

      

    //search bar logic
    const { setcartitems,setshowsearch,getCardCount} = useContext(ShopContext)
    
    const func = () => {
      setshowsearch(true)
    }



    //scroll up nav logic
    useEffect(() => {
      let prevScrollY = window.screenY
      
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY  > prevScrollY) {
          setShowNavbar(true); // Hide nav when scrolling down
          
        } else {
          setShowNavbar(false); // Show nav when scrolling up
        }
        
        prevScrollY = currentScrollY;
      }
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
  
    }, []);

    
    //Logout logic
    const Logout = () =>{
      localStorage.removeItem('token')
      settoken("")
setcartitems({})
      navigate('/login')
    }

 



  return (

    <nav className={`fixed z-50 top-0 left-0 ease-in-out lg:backdrop-blur-sm w-full px-[5vw] py-2 flex justify-between items-center transition-all duration-500  ${showNavbar ? 'translate-y-[-100%] ' : 'translate-y-0'}`}>

  {/* LOGO */}   
  <NavLink to='/'>
  <div className='flex items-center gap-2 justify-center'>
    <img className='sm:w-[3.5vw] object-contain w-[10vw]' src={assets.ClothixLogo}></img>
    <h1 className="sm:text-[2vw] text-[6vw] font-semibold  bg-gradient-to-r from-[#111111] via-[#EEA8B3] to-transparent  bg-clip-text text-transparent animate-gradient bg-[length:200%]">CLOTHIX</h1>
  </div>
  </NavLink>


 {/* NAVLINKS */} 
<div className='hidden sm:flex gap-6 text-black text-md'>
    <NavLink to='/' className="relative group px-2 py-1">
        <span >Home</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-[#C46E88] to-[#EEA8B3] group-hover:w-full transition-all duration-300"></span>
    </NavLink>

    <NavLink to='/collection' className="relative group px-2 py-1">
        <span className="">Collection</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-[#C46E88] to-[#EEA8B3] group-hover:w-full transition-all duration-300"></span>
    </NavLink>

    <NavLink to='/about' className="relative group px-2 py-1">
        <span>About</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-[#C46E88] to-[#EEA8B3] group-hover:w-full transition-all duration-300"></span>
    </NavLink>

    <NavLink to='/contact' className="relative group px-2 py-1">
        <span>Contact</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-[#C46E88] to-[#EEA8B3] group-hover:w-full transition-all duration-300"></span>
    </NavLink>
</div>


 {/* OPTIONS */} 

<div className='text-black flex gap-5 sm:text-[1.6vw] text-[5vw]'>
<NavLink to='/collection'><i onClick={func} className='ri-search-line hover:text-[#C46E88] block hover:rotate-45 transition-all duration-300' ></i></NavLink>

{/* USER ICON */}
<div className='relative group'>
          <i onClick={()=>token?null:navigate('/login')} className="ri-user-3-line hover:text-[#C46E88] transition-all duration-300 "></i>
          <div className='absolute -right-5 top-6 hidden group-hover:block mt-2'>
            {token && 
              <div className='flex flex-col bg-zinc-800/95 backdrop-blur-lg p-3 text-base rounded-xl text-zinc-300 border border-[#C46E88]/20 shadow-2xl min-w-[150px]'>
                <button onClick={()=>navigate('/orders')} className='flex items-center gap-2 hover:bg-[#C46E88]/10 px-4 py-2 rounded-lg transition-all duration-300'>
                  <i className="ri-shopping-bag-line text-[#EEA8B3]"></i>
                  Orders
                </button>
                <button onClick={()=>navigate('/profile')} className='flex items-center gap-2 hover:bg-[#C46E88]/10 px-4 py-2 rounded-lg transition-all duration-300'>
                  <i className="ri-user-settings-line text-[#EEA8B3]"></i>
                  Profile
                </button>
                {/* LOGOUT BUTTON */}
                <button onClick={Logout} className='flex items-center gap-2 hover:bg-[#C46E88]/10 px-4 py-2 rounded-lg transition-all duration-300'>
                  <i className="ri-logout-box-r-line text-[#EEA8B3]"></i>
                  Logout
                </button>
              </div>
            }
          </div>
        </div>

{/* CART ICON */}
<NavLink to='/cart' className='relative group'>
<i class="ri-shopping-cart-2-line group-hover:text-[#C46E88]"></i>
<p className='absolute bottom-[-6px] right-[-5px] bg-gradient-to-r from-[#C46E88] to-[#EEA8B3] rounded-full w-5 h-5 text-[.8rem] leading-5 text-center text-black font-bold shadow-lg transform hover:scale-110 transition-transform duration-300'>{getCardCount()}</p>
</NavLink>

 {/* HAMBURGER MENU */} 
<i onClick={togglemenu}  className="ri-menu-3-line sm:hidden active:text-[#C46E88] "></i>
</div>

 {/* SIDEBAR */} 
<div className='sm:hidden sidebar-wrapper absolute backdrop-blur-lg h-[100vh] w-full translate-x-[100%]  left-0 top-0 '>
          <div className='sidebar-data p-8 bg-zinc-900/95 h-full w-full flex flex-col'>
            <div className='flex justify-between items-center mb-12 border-b border-[#C46E88]/60 pb-4'>
              <h1 className='heading flex items-center gap-3'>
                <img className='w-10 object-contain' src={assets.ClothixLogo} alt="Clothix Logo" />
                <span className='font-bold text-2xl text-[#EEA8B3] hover:text-[#C46E88] transition-colors duration-300'>CLOTHIX</span>
              </h1>
              <button 
                onClick={togglemenu}
                className="bg-gradient-to-br from-[#C46E88]/20 to-transparent p-4 rounded-full w-12 h-12 flex items-center justify-center"
              >
                <i className="ri-close-line text-2xl text-[#EEA8B3]"></i>
              </button>
            </div>
            
            <div className='flex flex-col gap-6 text-2xl font-medium'>
              <NavLink 
                onClick={togglemenu} 
                to='/'
                className=" text-gray-400 active:text-[#EEA8B3]  flex items-center gap-3"
              >
                <i className="ri-home-4-line"></i>
                Home
              </NavLink>
              <NavLink 
                onClick={togglemenu} 
                to='/collection'
                className=" text-gray-400 active:text-[#EEA8B3]  flex items-center gap-3"
              >
                <i className="ri-shopping-bag-3-line"></i>
                Collection
              </NavLink>
              <NavLink 
                onClick={togglemenu} 
                to='/about'
                className=" text-gray-400 active:text-[#EEA8B3]  flex items-center gap-3"
              >
                <i className="ri-information-line"></i>
                About
              </NavLink>
              <NavLink 
                onClick={togglemenu} 
                to='/contact'
                className=" text-gray-400 active:text-[#EEA8B3]  flex items-center gap-3"
              >
                <i className="ri-customer-service-2-line"></i>
                Contact
              </NavLink>
            </div>
          </div>
        </div>

    </nav>
  )
}

export default Navbar
