import React, { useEffect, useState } from 'react'
import MoviesOnDesktop from './MoviesOnDesktop';
import MoviesOnMobile from './MoviesOnMobile';

const MoviesCards = () => {
        const [isMobile, setIsMobile] = useState(false);
    
      useEffect(() => {
          const checkMobile = () => setIsMobile(window.innerWidth <= 768);
          window.addEventListener('resize', checkMobile);
          checkMobile();
          return () => window.removeEventListener('resize', checkMobile);
        }, []);
      
  return (
    <div className="px-6 py-12 bg-[#F4F6F9]">
    
     <MoviesOnDesktop/>
  </div>
  )
}

export default MoviesCards