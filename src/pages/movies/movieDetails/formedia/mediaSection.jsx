import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import {
  fetchVideos,
  fetchImages,
  setSelectedTab,
} from "../../../../redux/slices/moviesSlices/mediaSlice/mediaSlice";
import { motion } from "framer-motion";

const MediaSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { videos, backdrops, posters, selectedTab, isLoading, error } =
    useSelector((state) => state.mediaMovie);
  const [playingVideo, setPlayingVideo] = useState(null);

  useEffect(() => {
    dispatch(fetchVideos(id));
    dispatch(fetchImages(id));
  }, [id, dispatch]);

  const handleTabChange = (tab) => {
    dispatch(setSelectedTab(tab));
    setPlayingVideo(null);
  };

  const handlePlayVideo = (videoKey) => {
    setPlayingVideo(videoKey);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Typography variant="h6" className="text-[#3D52A0]">
          Loading media...
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

  const currentItems =
    selectedTab === "videos"
      ? videos.slice(0, 4)
      : selectedTab === "backdrops"
      ? backdrops.slice(0, 6)
      : posters.slice(0, 6);

  const totalItems =
    selectedTab === "videos"
      ? videos.length
      : selectedTab === "backdrops"
      ? backdrops.length
      : posters.length;

  const viewMorePath =
    selectedTab === "videos"
      ? `/movie/${id}/videos`
      : selectedTab === "backdrops"
      ? `/movie/${id}/backdrops`
      : `/movie/${id}/posters`;

  return (
    <div className="py-8">
      <motion.div
        dir="ltr"
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex gap-6 mb-6">
          <Typography variant="h4" className="text-[#3D52A0] font-bold">
            Media
          </Typography>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleTabChange("videos")}
              className={`text-[#3D52A0] font-medium ${
                selectedTab === "videos" ? "border-b-2 border-[#7091E6]" : ""
              } hover:text-[#7091E6] transition-colors`}
            >
              Videos {videos.length}
            </button>
            <button
              onClick={() => handleTabChange("backdrops")}
              className={`text-[#3D52A0] font-medium ${
                selectedTab === "backdrops" ? "border-b-2 border-[#7091E6]" : ""
              } hover:text-[#7091E6] transition-colors`}
            >
              Backdrops {backdrops.length}
            </button>
            <button
              onClick={() => handleTabChange("posters")}
              className={`text-[#3D52A0] font-medium ${
                selectedTab === "posters" ? "border-b-2 border-[#7091E6]" : ""
              } hover:text-[#7091E6] transition-colors`}
            >
              Posters {posters.length}
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 max-w-[950px]">
            {currentItems.map((item, index) => (
              <motion.div
                key={index}
                className={`flex-shrink-0 bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4] rounded-lg p-2 shadow-md`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {selectedTab === "videos" ? (
                  <div>
                    {playingVideo === item.key ? (
                      <iframe
                        width="500"
                        height="200"
                        src={`https://www.youtube.com/embed/${item.key}?autoplay=1`}
                        title={item.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="relative cursor-pointer w-[500px] rounded"
                        onClick={() => handlePlayVideo(item.key)}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${item.key}/hqdefault.jpg`}
                          alt={item.name}
                          className="w-full h-[200px] object-cover rounded"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <Typography
                      variant="small"
                      className="text-[#3D52A0] font-semibold mt-2 flex flex-wrap"
                    >
                      {item.name}
                    </Typography>
                  </div>
                ) : (
                  <img
                    src={
                      selectedTab === "backdrops"
                        ? `https://media.themoviedb.org/t/p/w533_and_h300_bestv2${item.file_path}`
                        : `https://media.themoviedb.org/t/p/w220_and_h330_face${item.file_path}`
                    }
                    alt={selectedTab === "backdrops" ? "Backdrop" : "Poster"}
                    className={
                      selectedTab === "backdrops"
                        ? "w-full h-[300px] object-cover rounded"
                        : "w-full h-[330px] object-none rounded"
                    }
                    loading="lazy"
                  />
                )}
              </motion.div>
            ))}
          </div>
          {totalItems > 6 && (
            <div className="mt-4 flex justify-center max-w-[950px]">
              <Link
                to={viewMorePath}
                className="text-[#3D52A0] hover:text-[#7091E6] font-medium"
              >
                View More
              </Link>
            </div>
          )}
        </div>

        <hr className="border-t border-[#8697C4] max-w-[950px] mt-4" />
      </motion.div>
    </div>
  );
};

export default MediaSection;
