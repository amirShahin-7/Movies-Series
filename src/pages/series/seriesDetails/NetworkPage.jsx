import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import {
  fetchNetworkDetails,
  fetchNetworkSeries,
} from "./../../../redux/slices/series/network/networkSlice";
import { FaGlobe } from "react-icons/fa";

const NetworkPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, series, loading, error } = useSelector(
    (state) => state.networkReducer
  );

  const OfficialLink = ({ platform, url }) => {
    const platforms = {
      website: {
        name: "Official Site",
        icon: <FaGlobe className="text-lg" />,
      },
    };

    if (!url || !platforms[platform]) return null;

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#3D52A0] hover:text-[#7091E6] transition-colors flex items-center gap-2"
        title={`Visit ${platforms[platform].name}`}
      >
        {platforms[platform].icon}
        <span className="text-sm">Visit Website</span>
      </a>
    );
  };

  useEffect(() => {
    dispatch(fetchNetworkDetails(id));
    dispatch(fetchNetworkSeries(id));
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Typography variant="h6" className="text-[#3D52A0]">
          Loading network information...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-8">
        <Typography variant="h6" className="text-red-500">
          Error: {error}
        </Typography>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4] min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8 ml-4 bg-gradient-to-br from-[#EDE8F5]/80 via-[#ADBBDA]/80 to-[#8697C4]/80 rounded-lg p-4">
          {details?.logo_path && (
            <img
              src={`https://media.themoviedb.org/t/p/h50${details.logo_path}`}
              alt={details.name || "Network logo"}
              loading="lazy"
              className="h-24 object-contain bg-white/50 p-2 rounded-lg"
            />
          )}
          <div>
            <Typography
              variant="h1"
              className="text-3xl font-bold text-[#3D52A0]"
            >
              {details?.name || "Network"}
            </Typography>
            {details?.headquarters && (
              <Typography variant="lead" className="text-[#7091E6] mt-2">
                {details.headquarters}
              </Typography>
            )}
            {details?.homepage && (
              <div className="mt-2">
                <OfficialLink platform="website" url={details.homepage} />
              </div>
            )}
          </div>
        </div>
        <div className="mt-8">
          <Typography
            variant="h2"
            className="text-2xl font-bold text-[#3D52A0] mb-6"
          >
            Popular Series
          </Typography>
          {series.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {series.map((show) => (
                <Link
                  key={show.id}
                  to={`/series/${show.id}`}
                  className="group hover:scale-105 transition-transform"
                >
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={
                        show.poster_path
                          ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                          : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                      }
                      alt={show.name || "Series poster"}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                      loading="lazy"
                    />
                  </div>
                  <Typography
                    variant="h5"
                    className="mt-2 text-[#3D52A0] font-semibold truncate"
                  >
                    {show.name || "Unknown Series"}
                  </Typography>
                  {show.first_air_date && (
                    <Typography variant="small" className="text-[#7091E6]">
                      {new Date(show.first_air_date).getFullYear()}
                    </Typography>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <Typography variant="h6" className="text-[#3D52A0] text-center">
              No series found for this network.
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;
