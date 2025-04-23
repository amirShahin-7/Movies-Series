import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../../redux/slices/moviesSlices/moviesSlice";
import Tilt from "react-parallax-tilt";
import { FaStar, FaCalendarAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const allGenres = [
  { id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" }, { id: 80, name: "Crime" }, { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" }, { id: 10751, name: "Family" }, { id: 14, name: "Fantasy" },
  { id: 36, name: "History" }, { id: 27, name: "Horror" }, { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" }, { id: 10749, name: "Romance" }, { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" }, { id: 53, name: "Thriller" }, { id: 10752, name: "War" }, { id: 37, name: "Western" }
];

const getGenres = (ids) =>
  ids.map(id => allGenres.find(g => g.id === id)?.name || "Unknown").join(", ");

const MoviesOnDesktop = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector(state => state.movies);
  const baseUrl = "https://image.tmdb.org/t/p/w500";

  const swiperRef = useRef(null);

  useEffect(() => {
    dispatch(getMovies());
  }, []);
  const goTo = idx => {
    if (swiperRef.current) swiperRef.current.slideTo(idx );
  };
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4] px-4 py-8 text-[#3D52A0]">
      <h2 className="text-3xl font-extrabold text-center mb-8 tracking-tight">
        🎨 Cinema Gallery
      </h2>

      {/* Desktop grid */}
      <div className="hidden md:flex flex-wrap justify-center gap-8">
        {movies.map((movie, i) => (
          <div key={i} className="w-[220px] bg-white/30 backdrop-blur-xl border border-[#ADBBDA]/40 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer">
            <img src={baseUrl + movie.poster_path} alt={movie.title} className="w-full h-auto object-contain rounded-t-2xl" />
          </div>
        ))}
      </div>

      {/* Mobile "Art Panel" Carousel with Parallax Tilt */}
      <div className="block md:hidden relative">
        <Swiper
          onSwiper={swiper => { swiperRef.current = swiper }}
          modules={[Pagination]}
          pagination={{ type: 'fraction', clickable: true }}
          spaceBetween={-40}
          slidesPerView={'auto'}
          centeredSlides
          grabCursor
          className="pb-16"
        >
          {movies.map((movie, idx) => (
            <SwiperSlide key={idx} className="w-[75%] mx-auto">
              <div className="relative overflow-visible">
                {/* Brace brush overlay */}
                <div className="absolute inset-0 rounded-3xl bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.2)0px,rgba(255,255,255,0.2)4px,transparent4px,transparent8px)] pointer-events-none mix-blend-overlay" />

                {/* Tilt wrapper for parallax */}
                <Tilt
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  glareEnable={true}
                  glareMaxOpacity={0.15}
                  className="relative z-10"
                  style={{ height: '100%', width: '100%' }}
                >
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 will-change-transform [&:not(.swiper-slide-active)]:rotate-[-4deg] [&.swiper-slide-active]:rotate-0 [&.swiper-slide-active]:scale-110 [&.swiper-slide-active]:ring-4 [&.swiper-slide-active]:ring-[#3D52A0]/40 [&.swiper-slide-active]:z-30" style={{ clipPath: 'polygon(0 0,100% 5%,100% 95%,0 100%)' }}>
                    <img src={baseUrl + movie.poster_path} alt={movie.title} className="w-full h-auto object-contain rounded-t-3xl" />
                    <div className="p-6 flex flex-col h-[220px] relative z-20">
                      <h3 className="text-xl font-black mb-1 bg-clip-text text-transparent bg-gradient-to-r from-[#3D52A0] to-[#7091E6]">{movie.title}</h3>
                      <p className="text-[12px] italic mb-3 text-[#8697C4]/90 truncate">{getGenres(movie.genre_ids)}</p>
                      <p className="text-[13px] text-[#3D52A0]/80 mb-4 line-clamp-4">{movie.overview}</p>
                      <p className="mt-auto flex items-center text-[13px] font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#ADBBDA] to-[#EDE8F5]"><FaCalendarAlt className="mr-2" /> {movie.release_date}</p>
                    </div>
                  </div>
                </Tilt>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Jump-to buttons */}
        <div className="mt-6 flex justify-center flex-wrap gap-2">
          {movies.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/30 text-[#3D52A0] font-bold shadow-md transition-all hover:bg-white/50">{i + 1}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesOnDesktop;
