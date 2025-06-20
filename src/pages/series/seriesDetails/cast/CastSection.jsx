import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { fetchCast } from "./../../../../redux/slices/series/cast/castSlice";
import { fetchSeriesKeywords } from "./../../../../redux/slices/series/keywords/keywordsSlice";
import {
  fetchSeriesDetails,
  fetchExternalIds,
} from "./../../../../redux/slices/series/seriesDetailsSlice";
import Sidebar from "./../Sidebar";
import MobileSidebar from "./../MobileSidebar";
import { motion } from "framer-motion";

const CastSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { cast, loading: castLoading } = useSelector(
    (state) => state.castReducer
  );
  const { loading: detailsLoading } = useSelector(
    (state) => state.seriesDetailsReducer
  );
  const { loading: keywordsLoading } = useSelector(
    (state) => state.keywordsReducer
  );

  useEffect(() => {
    dispatch(fetchCast(id));
    dispatch(fetchSeriesDetails(id));
    dispatch(fetchExternalIds(id));
    dispatch(fetchSeriesKeywords(id));
  }, [id, dispatch]);

  if (castLoading || detailsLoading || keywordsLoading) {
    return (
      <div className="flex justify-center py-8">
        <Typography variant="h6" className="text-[#3D52A0]">
          Loading...
        </Typography>
      </div>
    );
  }

  return (
    <motion.div
      dir="ltr"
      className="container mx-auto px-4 py-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-3/4">
          <div className="flex items-center mb-4">
            <Typography
              variant="h3"
              className="text-2xl font-bold text-[#3D52A0]"
            >
              Series Cast
            </Typography>
          </div>

          <div className="relative">
            <div className="flex overflow-auto pb-4 gap-4">
              {cast?.slice(0, 10).map((actor) => (
                <motion.div
                  key={actor.id}
                  className="flex-shrink-0 w-[160px]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link to={`/person/${actor.id}`} className="block">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                      <img
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w276_and_h350_face${actor.profile_path}`
                            : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                        }
                        alt={actor.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-2 px-1">
                      <Typography
                        variant="h6"
                        className="font-semibold text-sm text-[#3D52A0]"
                      >
                        {actor.name}
                      </Typography>
                      <Typography variant="small" className="text-[#7091E6]">
                        {actor.roles?.[0]?.character || "Unknown Character"}
                      </Typography>
                      <Typography variant="small" className="text-[#3D52A0]/80">
                        {actor.total_episode_count || 0} Episodes
                      </Typography>
                    </div>
                  </Link>
                </motion.div>
              ))}
              <div className="flex-shrink-0 w-[160px] flex items-center justify-center">
                {cast?.length > 0 && (
                  <Link
                    to={`/series/${id}/FullCastPage`}
                    className="text-[#3D52A0] hover:text-[#7091E6] font-medium text-center w-full"
                  >
                    View More
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4">
            {cast?.length > 0 && (
              <Link
                to={`/series/${id}/FullCastPage`}
                className="text-[#3D52A0] hover:text-[#7091E6] font-medium"
              >
                Full Cast & Crew
              </Link>
            )}
          </div>
        </div>

        <Sidebar />
        <MobileSidebar />
      </div>
      <hr className="border-t border-[#8697C4] w-full max-w-[900px] mt-4" />
    </motion.div>
  );
};

export default CastSection;
