import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../../redux/slices/moviesSlices/moviesSlice";
import { FaStar, FaCalendarAlt } from "react-icons/fa";
import { Player } from '@lottiefiles/react-lottie-player';
import ironman from "../../../assets/ironman.json";

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

  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    dispatch(getMovies());

    // تأخير بسيط للـ Loading
    const timer = setTimeout(() => setShowLoading(false), 2000);
    return () => clearTimeout(timer);

  }, [dispatch]);

  // Tilt effect
  useEffect(() => {
    const cards = document.querySelectorAll(".tilt-card");
    cards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.transform = `rotateX(${-(y - rect.height / 2) / 15}deg) rotateY(${(x - rect.width / 2) / 15}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = `rotateX(0deg) rotateY(0deg)`;
      });
    });
  }, [movies]);

  // لو لسه في حالة تحميل
  if (showLoading) {
    return (
      <div className="fixed inset-0 bg-[#0e0f1a] flex flex-col items-center justify-center text-white z-50">
        <Player
          autoplay
          loop
          src={ironman}
          style={{ height: '300px', width: '300px' }}
          speed={1.5}
        />
        <h2 className="mt-4 text-lg text-[#ADBBDA] animate-pulse">Loading...</h2>
      </div>
    );
  }

  // بعد التحميل
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4] px-8 py-12 overflow-hidden text-[#3D52A0]">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0"></div>

      <h2 className="text-5xl font-extrabold text-center mb-16 tracking-tight relative z-10">
        🎞️ Featured Movies
      </h2>

      <div className="flex flex-wrap justify-center gap-8 relative z-10">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="tilt-card w-[230px] sm:w-[240px] md:w-[220px] bg-white/30 backdrop-blur-xl border border-[#ADBBDA]/40 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 cursor-pointer"
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
    </div>
  );
};

export default MoviesOnDesktop;
