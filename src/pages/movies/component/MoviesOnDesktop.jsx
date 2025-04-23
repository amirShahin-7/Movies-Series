import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../../redux/slices/moviesSlices/moviesSlice";
import { FaStar, FaCalendarAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const allGenres = [
  { id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" }, { id: 80, name: "Crime" }, { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" }, { id: 10751, name: "Family" }, { id: 14, name: "Fantasy" },
  { id: 36, name: "History" }, { id: 27, name: "Horror" }, { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" }, { id: 10749, name: "Romance" }, { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" }, { id: 53, name: "Thriller" }, { id: 10752, name: "War" }, { id: 37, name: "Western" }
];

const getGenres = (ids) => {
  return ids
    .map((id) => allGenres.find((g) => g.id === id)?.name || "Unknown")
    .join(", ");
};

const MoviesOnDesktop = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movies);
  const baseUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4] px-4 py-8 text-[#3D52A0]">

      <h2 className="text-3xl font-extrabold text-center mb-8 tracking-tight">
        🎞️ Featured Movies
      </h2>

      {/* Grid Layout for Desktop */}
      <div className="hidden md:flex flex-wrap justify-center gap-8">
        {movies.map((movie, index) => (
          <div key={index} className="w-[220px] bg-white/30 backdrop-blur-xl border border-[#ADBBDA]/40 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 cursor-pointer">
            <div className="relative">
              <img src={baseUrl + movie.poster_path} alt={movie.title} className="w-full h-52 object-cover rounded-t-2xl" />
              <div className="absolute top-2 right-2 bg-gradient-to-r from-[#7091E6] to-[#3D52A0] text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow">
                <FaStar /> {movie.vote_average.toFixed(1)}
              </div>
            </div>
            <div className="p-3 text-[#3D52A0] flex flex-col h-[180px]">
              <h3 className="text-sm font-bold truncate mb-1">{movie.title}</h3>
              <p className="text-[10px] text-[#8697C4] italic mb-1 truncate">{getGenres(movie.genre_ids)}</p>
              <p className="text-[11px] text-[#3D52A0]/80 mb-2 line-clamp-3">{movie.overview}</p>
              <p className="text-[10px] text-[#7091E6] flex items-center mt-auto">
                <FaCalendarAlt className="mr-1" /> {movie.release_date}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Layout for Mobile */}
      <div className="block md:hidden">
      <Swiper
  modules={[Pagination]}
  pagination={{ clickable: true }}
  spaceBetween={16}
  slidesPerView={1.2}
  centeredSlides={true}
  grabCursor={true}
  className="pb-16"
>
          {movies.map((movie, index) => (
            <SwiperSlide key={index}>
              <div className="w-[90%] mx-auto bg-white/40 backdrop-blur-xl border border-[#ADBBDA]/40 rounded-3xl overflow-hidden shadow-lg transition-transform duration-300">
                <div className="relative">
                  <img src={baseUrl + movie.poster_path} alt={movie.title} className="w-full h-52 object-cover rounded-t-3xl" />
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-[#7091E6] to-[#3D52A0] text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow">
                    <FaStar /> {movie.vote_average.toFixed(1)}
                  </div>
                </div>
                <div className="p-4 text-[#3D52A0] flex flex-col h-[190px]">
                  <h3 className="text-base font-bold truncate mb-1">{movie.title}</h3>
                  <p className="text-[11px] text-[#8697C4] italic mb-1 truncate">{getGenres(movie.genre_ids)}</p>
                  <p className="text-[12px] text-[#3D52A0]/80 mb-2 line-clamp-3">{movie.overview}</p>
                  <p className="text-[11px] text-[#7091E6] flex items-center mt-auto">
                    <FaCalendarAlt className="mr-1" /> {movie.release_date}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

       
      </div>
    </div>
  );
};

export default MoviesOnDesktop;
