import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTopContent } from "../../../redux/slices/homeSlice/topContentSlice";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { FaCalendarAlt, FaStar } from "react-icons/fa";

const TopContentSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { topMovies, topSeries } = useSelector((state) => state.topContent);

  useEffect(() => {
    dispatch(fetchTopContent());
  }, [dispatch]);

  const sortTopMovies = [...topMovies]
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 10);

  const sortTopSeries = [...topSeries]
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 10);

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl ml-4 font-bold mb-6 text-[#3D52A0]">
        Top Movies
      </h1>
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {sortTopMovies.map((item) => (
          <div
            key={item.id}
            className="w-[220px] bg-white/30 backdrop-blur-xl border border-[#ADBBDA]/40 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => {
              dispatch(fetchTopContent());
              navigate(`/movies/${item.id}`);
            }}
          >
            <div className="relative">
              {item.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                  className="w-full h-60 object-cover rounded-t-2xl"
                />
              ) : (
                <div className="w-full h-60 bg-gray-200 flex items-center justify-center rounded-t-2xl">
                  <Typography className="text-[#3D52A0]">No Image</Typography>
                </div>
              )}
              <div className="absolute top-2 right-2 bg-gradient-to-r from-[#7091E6] to-[#3D52A0] text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow">
                <FaStar /> {item.vote_average?.toFixed(1) || "N/A"}
              </div>
            </div>
            <div className="p-3 flex flex-col h-[120px]">
              <h1 className="text-sm font-bold truncate mb-1">{item.title}</h1>
              <p className="text-[11px] text-[#3D52A0]/80 line-clamp-2">
                {item.overview || "No overview available"}
              </p>
              <p className="text-[10px] text-[#7091E6] flex items-center mt-auto">
                <FaCalendarAlt className="mr-1" />
                {item.release_date || "Unknown date"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h1 className="text-2xl ml-4 font-bold mb-6 text-[#3D52A0]">
        Top Series
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {sortTopSeries.map((item) => (
          <div
            key={item.id}
            className="w-[220px] bg-white/30 backdrop-blur-xl border border-[#ADBBDA]/40 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => {
              dispatch(fetchTopContent());
              navigate(`/series/${item.id}`);
            }}
          >
            <div className="relative">
              {item.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.name}
                  className="w-full h-60 object-cover rounded-t-2xl"
                />
              ) : (
                <div className="w-full h-60 bg-gray-200 flex items-center justify-center rounded-t-2xl">
                  <Typography className="text-[#3D52A0]">No Image</Typography>
                </div>
              )}
              <div className="absolute top-2 right-2 bg-gradient-to-r from-[#7091E6] to-[#3D52A0] text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow">
                <FaStar /> {item.vote_average?.toFixed(1) || "N/A"}
              </div>
            </div>
            <div className="p-3 flex flex-col h-[120px]">
              <h1 className="text-sm font-bold truncate mb-1">{item.name}</h1>
              <p className="text-[11px] text-[#3D52A0]/80 line-clamp-2">
                {item.overview || "No overview available"}
              </p>
              <p className="text-[10px] text-[#7091E6] flex items-center mt-auto">
                <FaCalendarAlt className="mr-1" />
                {item.first_air_date || "Unknown date"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContentSection;
