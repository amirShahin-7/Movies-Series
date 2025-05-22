import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../../redux/slices/moviesSlices/moviesSlice";
import Tilt from "react-parallax-tilt";
import { FaStar, FaCalendarAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

// قائمة الأنواع
const allGenres = [
  { id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" }, { id: 80, name: "Crime" }, { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" }, { id: 10751, name: "Family" }, { id: 14, name: "Fantasy" },
  { id: 36, name: "History" }, { id: 27, name: "Horror" }, { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" }, { id: 10749, name: "Romance" }, { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" }, { id: 53, name: "Thriller" }, { id: 10752, name: "War" }, { id: 37, name: "Western" }
];
const getGenres = (ids) => ids.map(id => allGenres.find(g => g.id === id)?.name || "Unknown").join(", ");

const MoviesOnDesktop = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector(state => state.movies);
  const [page, setPage] = useState(1);
  const swiperRef = useRef(null);
  const baseUrl = "https://image.tmdb.org/t/p/w500";
if (localStorage.id) {
  setPage(localStorage.id)
  console.log(55);
  
}
  useEffect(() => {
    if (localStorage.page) {
      setPage(localStorage.page)
      console.log(55);
      
    }
    dispatch(getMovies(page));
  }, [dispatch, page]);

  const goTo = (idx) => {
    if (swiperRef.current) swiperRef.current.slideTo(idx);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4] px-4 py-8 text-[#3D52A0]">
      <h2 className="text-3xl font-extrabold text-center mb-8 tracking-tight">
        🎞️ Featured Movies (Page {page})
      </h2>

      {/* Desktop Grid */}
      <div className="hidden md:flex flex-wrap justify-center gap-8">
        {movies.map((movie, i) => (
          <Link
            key={movie.id}
            to={`/movies/${movie.id}`}
            className="w-[220px] bg-white/30 backdrop-blur-xl border border-[#ADBBDA]/40 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="relative">
              <img
                src={baseUrl + movie.poster_path}
                alt={movie.title}
                className="w-full h-52 object-cover rounded-t-2xl"
              />
              <div className="absolute top-2 right-2 bg-gradient-to-r from-[#7091E6] to-[#3D52A0] text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow">
                <FaStar /> {movie.vote_average.toFixed(1)}
              </div>
            </div>
            <div className="p-3 flex flex-col h-[180px]">
              <h3 className="text-sm font-bold truncate mb-1">{movie.title}</h3>
              <p className="text-[10px] text-[#8697C4] italic mb-1 truncate">{getGenres(movie.genre_ids)}</p>
              <p className="text-[11px] text-[#3D52A0]/80 mb-2 line-clamp-3">{movie.overview}</p>
              <p className="text-[10px] text-[#7091E6] flex items-center mt-auto">
                <FaCalendarAlt className="mr-1" /> {movie.release_date}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="block md:hidden relative">
        <Swiper
          onSwiper={(swiper) => swiperRef.current = swiper}
          spaceBetween={-40}
          slidesPerView={'auto'}
          centeredSlides
          grabCursor
          className="pb-16"
        >
          {movies.map((movie, idx) => (
            <SwiperSlide key={movie.id} className="w-[75%] mx-auto">
              <Link to={`/movies/${movie.id}`} className="relative block w-full h-full">
                <Tilt
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  glareEnable
                  glareMaxOpacity={0.15}
                  className="relative z-10"
                  style={{ height: '100%', width: '100%' }}
                >
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 ring-0 will-change-transform [&:not(.swiper-slide-active)]:rotate-[-4deg] [&.swiper-slide-active]:scale-110 [&.swiper-slide-active]:ring-4 [&.swiper-slide-active]:ring-[#3D52A0]/40 [&.swiper-slide-active]:z-30" style={{ clipPath: 'polygon(0 0,100% 5%,100% 95%,0 100%)' }}>
                    <img src={baseUrl + movie.poster_path} alt={movie.title} className="w-full h-auto object-contain rounded-t-3xl" />
                    <div className="p-6 flex flex-col h-[220px] relative z-20">
                      <h3 className="text-xl font-black mb-1 bg-clip-text text-transparent bg-gradient-to-r from-[#3D52A0] to-[#7091E6]">{movie.title}</h3>
                      <p className="text-[12px] italic mb-3 text-[#8697C4]/90 truncate">{getGenres(movie.genre_ids)}</p>
                      <p className="text-[13px] text-[#3D52A0]/80 mb-4 line-clamp-4">{movie.overview}</p>
                      <p className="mt-auto flex items-center text-[13px] font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#ADBBDA] to-[#EDE8F5]">
                        <FaCalendarAlt className="mr-2" /> {movie.release_date}
                      </p>
                    </div>
                  </div>
                </Tilt>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-6 flex justify-center flex-wrap gap-2">
          {movies.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/30 text-[#3D52A0] font-bold shadow-md transition-all hover:bg-white/50">{i + 1}</button>
          ))}
        </div>
      </div>

      {/* Pagination Controls using react-paginate */}
      <div className="mt-8 flex justify-center">
        <ReactPaginate
          pageCount={500}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => {setPage(selected + 1) ,localStorage.setItem('page',selected + 1)}}
          previousLabel="Prev"
          nextLabel="Next"
          breakLabel="..."
          containerClassName="flex gap-2 justify-center mt-4 items-center"
          pageLinkClassName="block w-8 h-8 flex items-center justify-center px-2 py-1 rounded hover:bg-[#ADBBDA] cursor-pointer"
          activeLinkClassName="bg-[#7091E6] text-white"
          previousLinkClassName="block px-3 py-1 rounded hover:bg-[#ADBBDA] cursor-pointer"
          nextLinkClassName="block px-3 py-1 rounded hover:bg-[#ADBBDA] cursor-pointer"
          breakLinkClassName="block w-8 h-8 flex items-center justify-center text-gray-500 cursor-default"
        />
      </div>
    </div>
  );
};

export default MoviesOnDesktop;
