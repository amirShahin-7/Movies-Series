import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";
import {
  fetchSeasonEpisodes,
  fetchEpisodeCredits,
} from "./../../../../redux/slices/series/seasonEpisodes/seasonEpisodesSlice";
import { fetchSeriesDetails } from "./../../../../redux/slices/series/seriesDetailsSlice";

const SeasonEpisodes = () => {
  const { id, season_number } = useParams();
  const dispatch = useDispatch();
  const { episodes, isLoading, error } = useSelector(
    (state) => state.seasonEpisodesReducer
  );
  const { details } = useSelector((state) => state.seriesDetailsReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const episodesPerPage = 20;

  useEffect(() => {
    dispatch(fetchSeriesDetails(id));
    dispatch(
      fetchSeasonEpisodes({ seriesId: id, seasonNumber: season_number })
    );
  }, [dispatch, id, season_number]);

  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const currentEpisodes = episodes.slice(
    indexOfFirstEpisode,
    indexOfLastEpisode
  );
  const totalPages = Math.ceil(episodes.length / episodesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <div className="text-gray-600">Loading episodes...</div>;
  }

  if (error) {
    return <div className="text-gray-600">Error: {error}</div>;
  }

  if (!episodes.length) {
    return <div className="text-gray-600">No episodes data available</div>;
  }

  return (
    <div className=" min-h-screen bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4] px-4 py-8">
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
              {details?.name} - Season {season_number}
            </div>
            <Link to={`/series/${id}/seasons`}>
              <div className="text-[#7091E6] underline hover:text-[#3D52A0]">
                ← Back to Seasons
              </div>
            </Link>
          </div>
        </div>
        <Typography variant="h3" className="text-gray-800 font-bold mb-6">
          Episodes ({episodes.length})
        </Typography>
        <div className="flex flex-col gap-6 max-w-full md:max-w-[1000px] mx-auto">
          {currentEpisodes.map((episode) => (
            <div
              key={episode.id}
              className="bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4] rounded-lg shadow-md p-3 flex items-center gap-3"
            >
              <img
                src={
                  episode.still_path
                    ? `https://media.themoviedb.org/t/p/w130_and_h195_bestv2/${episode.still_path}`
                    : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                }
                alt={`${episode.name} Still`}
                className="w-[100px] h-[150px] object-cover rounded"
              />
              <div className="flex-1">
                <Typography
                  variant="h4"
                  className="text-gray-800 font-bold text-sm mb-1"
                >
                  Episode {episode.episode_number}: {episode.name}
                </Typography>
                <Typography
                  variant="small"
                  className="text-blue-700 text-xs mb-1"
                >
                  {episode.air_date || "N/A"} • {episode.runtime} mins
                </Typography>
                <Typography
                  variant="small"
                  className="text-gray-600 text-xs mb-1"
                >
                  {episode.overview || "No overview available"}
                </Typography>
                <Typography
                  variant="small"
                  className="text-blue-700 text-xs flex items-center mb-2"
                >
                  <FaStar className="text-blue-500 text-xs mr-1" />
                  {episode.vote_average.toFixed(1)}
                </Typography>
                <div>
                  <Link
                    to={`/series/${id}/season/${season_number}/episode/${episode.episode_number}/cast-crew`}
                    onClick={(e) => {
                      if (!episodeCredits[episode.id]) {
                        dispatch(
                          fetchEpisodeCredits({
                            seriesId: id,
                            seasonNumber: season_number,
                            episodeNumber: episode.episode_number,
                            episodeId: episode.id,
                          })
                        );
                      }
                    }}
                    className="text-blue-600 hover:text-blue-800 font-medium text-xs"
                  >
                    View Cast & Crew
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center flex-wrap gap-3 mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`mx-1 px-3 py-1 rounded  ${
                    currentPage === number
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {number}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonEpisodes;
