import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";
import { fetchSeriesDetails } from "../../../../redux/slices/series/seriesDetailsSlice";

const Seasons = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.seriesDetailsReducer);

  useEffect(() => {
    if (!details && id) {
      dispatch(fetchSeriesDetails(id));
    }
  }, [id, dispatch, details]);

  const seasons = details?.seasons || [];

  if (!seasons.length) {
    return <div className="text-gray-600">No seasons data available</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4] px-4 py-8">
      <div className="container mx-auto overflow-x-hidden max-w-full md:max-w-[1000px]">
        <div className="flex items-center gap-4 mb-8 ml-4 bg-gradient-to-br from-[#EDE8F5]/80 via-[#ADBBDA]/80 to-[#8697C4]/80 rounded-lg p-4">
          <img
            src={
              details?.poster_path
                ? `https://image.tmdb.org/t/p/w185${details?.poster_path}`
                : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
            }
            alt={details?.name}
            loading="lazy"
            className="w-24 h-auto rounded shadow"
          />
          <div>
            <div className="text-2xl font-bold text-[#3D52A0]">
              {details?.name}
            </div>
            <Link to={`/series/${id}`}>
              <div className="text-[#7091E6] underline hover:text-[#3D52A0]">
                ← Back to Series
              </div>
            </Link>
          </div>
        </div>
        <Typography variant="h3" className="text-gray-800 font-bold mb-6">
          Seasons
        </Typography>
        <div className="flex flex-col gap-6 max-w-full md:max-w-[1000px] mx-auto">
          {seasons.map((season) => (
            <div
              key={season.id}
              className="bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4] rounded-lg shadow-md p-3 flex items-center gap-3"
            >
              <img
                src={
                  season.poster_path
                    ? `https://media.themoviedb.org/t/p/w130_and_h195_bestv2/${season.poster_path}`
                    : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                }
                alt={`${season.name} Poster`}
                className="w-[100px] h-[150px] object-cover rounded"
              />
              <div className="flex-1">
                <Typography
                  variant="h4"
                  className="text-gray-800 font-bold text-sm mb-1"
                >
                  Season {season.season_number}
                </Typography>
                <Typography
                  variant="small"
                  className="text-blue-700 text-xs mb-1"
                >
                  {season.air_date?.split("-")[0] || "N/A"} •{" "}
                  {season.episode_count} Episodes
                </Typography>
                <Typography
                  variant="small"
                  className="text-gray-600 text-xs mb-1"
                >
                  {season.overview || "No overview available"}
                </Typography>
                <Typography
                  variant="small"
                  className="text-blue-700 text-xs flex items-center"
                >
                  <FaStar className="text-blue-500 text-xs mr-1" />{" "}
                  {season.vote_average.toFixed(1)}
                </Typography>
                {season.episode_count > 0 && (
                  <div className="mt-2">
                    <Link
                      to={`/series/${id}/season/${season.season_number}/episodes`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-xs"
                    >
                      View Season
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Seasons;
