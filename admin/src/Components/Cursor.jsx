import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handlePointerElement = () => {
      const hoveredElement = document.elementFromPoint(mousePosition.x, mousePosition.y);
      const isClickable = hoveredElement?.matches('button, a, input, select, textarea') || 
                         hoveredElement?.closest('button, a, input, select, textarea');
      setIsPointer(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handlePointerElement);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handlePointerElement);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <>
      <motion.div
        className="fixed  top-0 left-0 w-4 h-4 bg-[#EEA8B3] rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isPointer ? 2.5 : isClicking ? 0.8 : 1,
          opacity: isClicking ? 0.5 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5
        }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 border-2 border-[#EEA8B3] rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isPointer ? 1.5 : isClicking ? 1.8 : 1,
          rotate: isPointer ? 45 : 0,
          borderWidth: isClicking ? "4px" : "2px",
          opacity: 0.8
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 0.8
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 border border-[#EEA8B3]/30 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          scale: isPointer ? 0.8 : isClicking ? 1.5 : 1,
          rotate: isPointer ? -45 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 25,
          mass: 1
        }}
      />
    </>
  );
};

export default Cursor;
