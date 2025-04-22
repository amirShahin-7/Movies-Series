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
    <h2 className="text-3xl font-bold text-[#3D52A0] mb-8">Popular Series</h2>
    {isMobile ? <MoviesOnMobile/> : <MoviesOnDesktop/>}
  </div>
  )
}

export default MoviesCards