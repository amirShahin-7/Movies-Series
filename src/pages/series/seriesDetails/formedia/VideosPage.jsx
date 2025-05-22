import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { fetchVideos } from "../../../../redux/slices/series/mediaSlice/mediaSlice";
import { fetchSeriesDetails } from "../../../../redux/slices/series/seriesDetailsSlice";

const VideosPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.seriesDetailsReducer);
  const { videos, isLoading, error } = useSelector(
    (state) => state.mediaReducer
  );
  const [filter, setFilter] = useState("Trailer");
  const [playingVideo, setPlayingVideo] = useState(null);

  useEffect(() => {
    dispatch(fetchVideos(id));
    dispatch(fetchSeriesDetails(id));
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Typography variant="h6" className="text-[#3D52A0]">
          Loading videos...
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

  const filteredVideos = videos.filter((video) => video.type === filter);

  const handlePlayVideo = (videoKey) => {
    setPlayingVideo(videoKey);
  };

  const options = [
    {
      type: "Trailer",
      count: videos.filter((v) => v.type === "Trailer").length,
    },
    { type: "Teaser", count: videos.filter((v) => v.type === "Teaser").length },
    { type: "Clip", count: videos.filter((v) => v.type === "Clip").length },
    {
      type: "Behind the Scenes",
      count: videos.filter((v) => v.type === "Behind the Scenes").length,
    },
    {
      type: "Bloopers",
      count: videos.filter((v) => v.type === "Bloopers").length,
    },
    {
      type: "Featurette",
      count: videos.filter((v) => v.type === "Featurette").length,
    },
    {
      type: "Opening Credits",
      count: videos.filter((v) => v.type === "Opening Credits").length,
    },
  ].filter((option) => option.count > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8697C4] via-[#ADBBDA] to-[#EDE8F5]">
      <header className="p-4 max-w-[1100px] mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 bg-gradient-to-br from-[#EDE8F5]/80 via-[#ADBBDA]/80 to-[#8697C4]/80 rounded-lg p-4">
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
              {details?.name || "Doctor Who (2005)"}
            </div>
            <Link to={`/series/${id}`}>
              <div className="text-[#7091E6] underline hover:text-[#3D52A0]">
                ← Back to main
              </div>
            </Link>
            <div className="flex flex-col items-center sm:items-start gap-2 mt-2">
              <Typography variant="h4" className="text-[#3D52A0] font-bold">
                Videos
              </Typography>
              <div className="flex flex-wrap justify-center gap-2">
                {options.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setFilter(option.type)}
                    className={`px-2 py-1 bg-transparent text-[#3D52A0] border-b-2 border-transparent hover:border-[#7091E6] hover:text-[#7091E6] transition-colors duration-200 ${
                      filter === option.type
                        ? "border-[#7091E6] text-[#7091E6]"
                        : ""
                    }`}
                  >
                    {option.type} {option.count}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-[950px] mx-auto bg-gradient-to-br from-[#8697C4]/80 via-[#ADBBDA]/80 to-[#EDE8F5]/80 rounded-lg p-4 shadow-md">
        <main className="flex-1 p-4">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="mb-4 bg-[#ADBBDA] shadow-md">
              <CardBody className="flex flex-col sm:flex-row items-center p-4">
                {playingVideo === video.key ? (
                  <iframe
                    width="100%"
                    height={isLoading ? "0" : "64"}
                    src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
                    title={video.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg sm:w-96 sm:h-64"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="relative cursor-pointer sm:w-96 sm:h-64"
                    onClick={() => handlePlayVideo(video.key)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                      alt={video.name}
                      className="w-full h-48 sm:h-64 object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="ml-0 sm:ml-4 mt-4 sm:mt-0">
                  <Typography variant="h6" className="text-[#3D52A0] mr-2">
                    {video.name}
                  </Typography>
                  <Typography variant="small" className="text-[#7091E6]">
                    {video.type} •
                    {new Date(video.published_at).toLocaleDateString({
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Typography>
                </div>
              </CardBody>
            </Card>
          ))}
        </main>
      </div>
    </div>
  );
};

export default VideosPage;
