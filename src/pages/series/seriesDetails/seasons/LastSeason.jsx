import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";

const LastSeason = () => {
  const { id } = useParams();
  const { details } = useSelector((state) => state.seriesDetailsReducer);

  const lastSeason = details?.seasons
    ? [...details.seasons].sort((a, b) => b.season_number - a.season_number)[0]
    : null;

  if (!lastSeason) {
    return (
      <div className="text-gray-600 container mx-auto text-center ">
        No season data available
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-2">
        <div className="bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4] rounded-lg shadow-md p-3 flex items-center mb-10 gap-3 max-w-[950px]">
          <img
            src={
              lastSeason.poster_path
                ? `https://media.themoviedb.org/t/p/w130_and_h195_bestv2/${lastSeason.poster_path}`
                : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
            }
            alt={`${lastSeason.name} Poster`}
            className="w-[100px] h-[150px] object-cover rounded"
          />
          <div className="flex-1">
            <Typography
              variant="h4"
              className="text-gray-800 font-bold text-sm mb-1"
            >
              Last Season
            </Typography>
            <Typography
              variant="h5"
              className="text-blue-900 font-semibold text-xs mb-1"
            >
              {lastSeason.name}
            </Typography>
            <Typography variant="small" className="text-blue-700 text-xs mb-1">
              {lastSeason.air_date?.split("-")[0] || "N/A"} •
              {lastSeason.episode_count} Episodes
            </Typography>
            <Typography variant="small" className="text-gray-600 text-xs mb-1">
              {lastSeason.overview || "No overview available"}
            </Typography>
            <Typography
              variant="small"
              className="text-blue-700 text-xs flex items-center"
            >
              <FaStar className="text-blue-500 text-xs mr-1" />
              {lastSeason.vote_average.toFixed(1)}
            </Typography>
            <div className="mt-2">
              <Link
                to={`/series/${id}/seasons`}
                className="text-blue-600 hover:text-blue-800 font-medium text-xs"
              >
                View All Seasons
              </Link>
            </div>
          </div>
        </div>
        <hr className="border-t border-[#8697C4] mt-4 max-w-[950px]" />
      </div>
    </div>
  );
};

export default LastSeason;
