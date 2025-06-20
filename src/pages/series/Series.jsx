import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectCards } from "swiper/modules";
import {
  fetchSeries,
  setLastViewedPage,
} from "../../redux/slices/series/seriesSlice";
import ReactPaginate from "react-paginate";

const allGenres = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
  { id: 12, name: "Adventure" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
];
const getGenres = (ids) =>
  ids
    .map((id) => allGenres.find((g) => g.id === id)?.name || "Unknown")
    .join(", ");

const Series = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { list, loading } = useSelector((state) => state.seriesReducer);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const savedPage = localStorage.getItem("page");
    const urlParams = new URLSearchParams(location.search);
    const pageFromUrl = urlParams.get("page");

    let initialPage = 1;
    if (pageFromUrl) {
      initialPage = parseInt(pageFromUrl);
    } else if (savedPage) {
      initialPage = parseInt(savedPage);
    }
    setPage(initialPage);
    dispatch(fetchSeries(initialPage));
  }, [location.search]);

  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1;
    setPage(newPage);
    localStorage.setItem("page", newPage);
    navigate(`?page=${newPage}`);
  };

  return (
    <div className="px-6 py-12 bg-[#F4F6F9]">
      <div className="relative min-h-screen bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4] px-4 py-8 text-[#3D52A0]">
        <h2 className="text-3xl font-extrabold text-center mb-8 tracking-tight">
          📺 Featured Series Page {page} From 500
        </h2>

        {/* Mobile View */}
        {!loading && (
          <div className="md:hidden flex justify-center">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              autoplay={{
                delay: 2000,
              }}
              className="w-full max-w-[240px] h-[420px]"
            >
              {list.map((seriesItem) => (
                <SwiperSlide
                  key={seriesItem.id}
                  onClick={() => {
                    dispatch(setLastViewedPage(page));
                    navigate(`/series/${seriesItem.id}`);
                  }}
                  className="bg-white/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="relative h-64">
                    <img
                      src={
                        seriesItem.poster_path
                          ? `https://image.tmdb.org/t/p/w500${seriesItem.poster_path}`
                          : "https://m.media-amazon.com/images/I/3120m+SwqYL._SY466_.jpg"
                      }
                      alt={seriesItem.name}
                      className="w-full h-full object-cover rounded-t-2xl"
                    />
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-[#7091E6] to-[#3D52A0] text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow">
                      <FaStar /> {seriesItem.vote_average?.toFixed(1) || "N/A"}
                    </div>
                  </div>
                  <div className="p-3 flex flex-col h-[140px]">
                    <h3 className="text-sm font-bold truncate mb-1">
                      {seriesItem.name}
                    </h3>
                    <p className="text-[10px] text-[#8697C4] italic mb-1 truncate">
                      {getGenres(seriesItem.genre_ids)}
                    </p>
                    <p className="text-[11px] text-[#3D52A0]/80 mb-2 line-clamp-2">
                      {seriesItem.overview || "No overview available"}
                    </p>
                    <p className="text-[10px] text-[#7091E6] flex items-center mt-auto">
                      <FaCalendarAlt className="mr-1" />
                      {seriesItem.first_air_date || "Unknown date"}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-[#3D52A0]">
            <div className="w-12 h-12 border-4 border-[#566ec4] border-t-transparent rounded-full animate-spin"></div>
            <p className="font-medium text-lg animate-pulse">
              Loading, please wait...
            </p>
          </div>
        ) : (
          <div className="hidden md:flex flex-wrap justify-center gap-8">
            {list.map((seriesItem) => (
              <div
                key={seriesItem.id}
                className="w-[220px] bg-white/30 backdrop-blur-xl border border-[#ADBBDA]/40 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={() => {
                  dispatch(setLastViewedPage(page));
                  navigate(`/series/${seriesItem.id}`);
                }}
              >
                <div className="relative">
                  {seriesItem.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${seriesItem.poster_path}`}
                      alt={seriesItem.name}
                      className="w-full h-52 object-cover rounded-t-2xl"
                    />
                  ) : (
                    <img
                      src={`https://m.media-amazon.com/images/I/3120m+SwqYL._SY466_.jpg`}
                      alt={seriesItem.name}
                      className="w-full h-52 object-cover rounded-t-2xl"
                    />
                  )}
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-[#7091E6] to-[#3D52A0] text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow">
                    <FaStar /> {seriesItem.vote_average?.toFixed(1) || "N/A"}
                  </div>
                </div>
                <div className="p-3 flex flex-col h-[180px]">
                  <h3 className="text-sm font-bold truncate mb-1">
                    {seriesItem.name}
                  </h3>
                  <p className="text-[10px] text-[#8697C4] italic mb-1 truncate">
                    {getGenres(seriesItem.genre_ids)}
                  </p>
                  <p className="text-[11px] text-[#3D52A0]/80 mb-2 line-clamp-3">
                    {seriesItem.overview || "No overview available"}
                  </p>
                  <p className="text-[10px] text-[#7091E6] flex items-center mt-auto">
                    <FaCalendarAlt className="mr-1" />
                    {seriesItem.first_air_date || "Unknown date"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <ReactPaginate
            pageCount={500}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            forcePage={page - 1}
            onPageChange={handlePageChange}
            previousLabel="Prev"
            nextLabel="Next"
            breakLabel="..."
            containerClassName="flex flex-wrap gap-2 justify-center mt-4 items-center"
            pageLinkClassName="block w-8 h-8 flex items-center justify-center px-2 py-1 rounded hover:bg-[#ADBBDA] cursor-pointer"
            activeLinkClassName="bg-[#7091E6] text-white"
            previousLinkClassName="block px-3 py-1 rounded hover:bg-[#ADBBDA] cursor-pointer"
            nextLinkClassName="block px-3 py-1 rounded hover:bg-[#ADBBDA] cursor-pointer"
            breakLinkClassName="block w-8 h-8 flex items-center justify-center text-gray-500 cursor-default"
          />
        </div>
      </div>
    </div>
  );
};

export default Series;
