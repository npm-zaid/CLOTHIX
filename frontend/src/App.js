import React from 'react'
import { Routes, Route } from'react-router-dom'
import gsap from 'gsap'
import { AnimatePresence, motion } from 'framer-motion'
import Footer from './Components/Footer'
import { useEffect ,useRef} from 'react'


//navigation bar component
import Navbar from './Components/Navbar'

//routes
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Collection from './pages/Collection'
import Product from './pages/Product'
import Cart from './pages/Cart'
import LogIn from './pages/LogIn'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Orders'

import Profile from './pages/Profile'

//notifications
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Lenis from '@studio-freight/lenis';






const App = () => {

  const lenisRef = useRef();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Adjust as needed
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch:true,
      touchMultiplier: 2,
      infinite: false,
      lerp: 0.1, 
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenisRef.current = lenis; // Store Lenis instance in ref

    return () => {
      lenis.destroy(); // Clean up on unmount
    };
  }, []);

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Spinning circle animation
    tl.to(".loader-circle", {
      duration: 2,
      rotate: 720,
      ease: "elastic.out(1, 0.3)", 
      repeat: -1
    })
    
    // Pulsing shopping bag icon
    .to(".loader-icon", {
      duration: 1,
      scale: 1.5,
      opacity: 0.5,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    }, "<")
    
    // Floating animation
    .to(".loader-icon", {
      duration: 1.5,
      y: -20,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    }, "<")
    
    // Color pulse animation for circle border
    .to(".loader-circle", {
      duration: 2,
      borderColor: "#C46E88",
      repeat: -1,
      yoyo: true,
      ease: "none"
    }, "<")

    // Scale animation for circle
    .to(".loader-circle", {
      duration: 1.5,
      scale: 1.2,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    }, "<")

    // Text animations
    .to(".loader-text", {
      duration: 0.5,
      opacity: 1,
      y: -20,
      stagger: 0.1,
      ease: "back.out(1.7)"
    })
    .to(".loader-text", {
      duration: 1,
      color: ["#C46E88", "#EEA8B3", "#C46E88"],
      stagger: 0.2,
      repeat: -1,
      ease: "none"
    })
    .to(".loader-text", {
      duration: 1.5,
      scale: 1.1,
      yoyo: true,
      repeat: -1,
      stagger: 0.2,
      ease: "power1.inOut"
    }, "<")

    // Glow effect animation
    .to(".loader-circle", {
      duration: 2,
      boxShadow: "0 0 20px #C46E88",
      yoyo: true,
      repeat: -1,
      ease: "none"
    }, "<");

    // Cleanup after loading
    setTimeout(() => {
      tl.kill();
      setLoading(false);
    }, 5000);

    return () => {
      tl.kill();
    };
  }, []);


  if (loading) {
      return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-800">
        <div className="relative">
          <div className="loader-circle w-24 h-24 border-4 border-gray-300 border-t-zinc-500 rounded-full"></div>
          <div className="loader-icon absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src="./clothix_Logo.png" alt="Clothix Logo" className="h-12 w-12" />
          </div>
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2">
            {
              "CLOTHIX".split('').map((letter, index) => (
                <div key={index} className="loader-text text-2xl font-bold text-[#C46E88] opacity-0">
                  {letter}
                </div>
              ))
            }
          </div>
        </div>
      </div>
      );
  }

  


  return (
    
    
    
 
  <div  className='scroll-container bg-zinc-600 px-[5vw]  '>

    <ToastContainer/>
    
    <Navbar/>
  <Routes> 
    <Route path='/' element={
      <AnimatePresence mode='wait'>
        <motion.div
          key="home"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Home/>
        </motion.div>
      </AnimatePresence>
    }/>
    <Route path='/about' element={
      <AnimatePresence mode='wait'>
        <motion.div
          key="about" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <About/>
        </motion.div>
      </AnimatePresence>
    }/>
    <Route path='/contact' element={
      <AnimatePresence mode='wait'>
        <motion.div
          key="contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Contact/>
        </motion.div>
      </AnimatePresence>
    }/>
    <Route path='/collection' element={
      <AnimatePresence mode='wait'>
        <motion.div
          key="collection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Collection/>
        </motion.div>
      </AnimatePresence>
    }/>
    <Route path='/login' element={
      <AnimatePresence mode='wait'>
        <motion.div
          key="login"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <LogIn/>
        </motion.div>
      </AnimatePresence>
    }/>
    <Route path='/placeOrder' element={
      <AnimatePresence mode='wait'>
        <motion.div
          key="placeOrder"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <PlaceOrder/>
        </motion.div>
      </AnimatePresence>
    }/>
    <Route path='/product/:product_Id' element={
      <AnimatePresence mode='wait'>
        <motion.div
          key="product"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Product/>
        </motion.div>
      </AnimatePresence>
    }/>
    <Route path='/cart' element={
      <AnimatePresence mode='wait'>
        <motion.div
          key="cart"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Cart/>
        </motion.div>
      </AnimatePresence>
    }/>
    <Route path='/orders' element={
      <AnimatePresence mode='wait'>
        <motion.div
          key="orders"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Order/>
        </motion.div>
      </AnimatePresence>
    }/>
    <Route path='/profile' element={
      <AnimatePresence mode='wait'>
        <motion.div
          key="profile"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Profile/>
        </motion.div>
      </AnimatePresence>
    }/>
  </Routes>
  <Footer/>
  
</div>

  )
}

export default App
