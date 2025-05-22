import { useEffect } from "react";
import { Typography, IconButton, Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import { FaAnglesRight, FaAnglesLeft, FaStar } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectCards } from "swiper/modules";
import {
  fetchSeries,
  setPage,
  setLastViewedPage,
} from "../../redux/slices/series/seriesSlice";

const Series = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, page, loading } = useSelector((state) => state.seriesReducer);

  useEffect(() => {
    dispatch(fetchSeries(page));
  }, [page]);

  const handleNext = () => {
    if (page < 500) dispatch(setPage(page + 1));
  };

  const handlePrev = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };

  return (
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
                  {seriesItem.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${seriesItem.poster_path}`}
                      alt={seriesItem.name}
                      className="w-full h-full object-cover rounded-t-2xl"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-t-2xl">
                      <Typography className="text-[#3D52A0]">
                        No Image
                      </Typography>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-[#7091E6] to-[#3D52A0] text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow">
                    <FaStar /> {seriesItem.vote_average?.toFixed(1) || "N/A"}
                  </div>
                </div>
                <div className="p-3 flex flex-col h-[140px]">
                  <h3 className="text-sm font-bold truncate mb-1">
                    {seriesItem.name}
                  </h3>
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
                  <div className="w-full h-52 bg-gray-200 flex items-center justify-center rounded-t-2xl">
                    <Typography className="text-[#3D52A0]">No Image</Typography>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-gradient-to-r from-[#7091E6] to-[#3D52A0] text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow">
                  <FaStar /> {seriesItem.vote_average?.toFixed(1) || "N/A"}
                </div>
              </div>
              <div className="p-3 flex flex-col h-[180px]">
                <h3 className="text-sm font-bold truncate mb-1">
                  {seriesItem.name}
                </h3>
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

      <div className="flex justify-center items-center gap-4 mt-8">
        <IconButton
          onClick={() => dispatch(setPage(1))}
          disabled={page === 1}
          variant="text"
          className="text-[#3D52A0] hover:bg-[#3D52A0]/10"
        >
          <FaAnglesLeft size={20} />
        </IconButton>
        <IconButton
          onClick={handlePrev}
          disabled={page === 1}
          variant="text"
          className="text-[#3D52A0] hover:bg-[#3D52A0]/10"
        >
          <BsArrowLeftSquare size={20} />
        </IconButton>
        <Typography className="mx-2 font-bold">{page}</Typography>
        <IconButton
          onClick={handleNext}
          disabled={page === 500}
          variant="text"
          className="text-[#3D52A0] hover:bg-[#3D52A0]/10"
        >
          <BsArrowRightSquare size={20} />
        </IconButton>
        <IconButton
          onClick={() => dispatch(setPage(500))}
          disabled={page === 500}
          variant="text"
          className="text-[#3D52A0] hover:bg-[#3D52A0]/10"
        >
          <FaAnglesRight size={20} />
        </IconButton>
      </div>
    </div>
  );
};

export default Series;
