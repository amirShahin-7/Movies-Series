import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Typography,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  moviesDetails,
  fetchMovieVideos,
  fetchMovieCredits,
} from "../../../redux/slices/moviesSlices/movieDetailsSlice";
import { motion } from "framer-motion";
import { FaHeart, FaStar, FaPlay } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const palette = {
  primary: "#3D52A0",
  secondary: "#7091E6",
  tertiary: "#8697C4",
  light: "#ADBBDA",
  background: "#EDE8F5",
};

const TopSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, loading, videos, cast } = useSelector(
    (state) => state.movieDetails
  );
  const [openTrailer, setOpenTrailer] = useState(false);
  const trailer = videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  useEffect(() => {
    dispatch(moviesDetails(id));
    dispatch(fetchMovieVideos(id));
    dispatch(fetchMovieCredits(id));
  }, [dispatch, id]);

  if (loading || !details) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-[#3D52A0]">
        <div className="w-12 h-12 border-4 border-[#566ec4] border-t-transparent rounded-full animate-spin"></div>
        <p className="font-medium text-lg animate-pulse">
          Loading, please wait...
        </p>
      </div>
    );
  }

  const {
    title = "—",
    tagline,
    overview = "No overview available.",
    release_date = "—",
    runtime = 0,
    budget = 0,
    revenue = 0,
    origin_country = [],
    spoken_languages = [],
    status = "—",
    genres = [],
    poster_path = "",
    backdrop_path = "",
  } = details;

  const casts = Array.isArray(cast) ? cast : [];

  const imageBase = "https://image.tmdb.org/t/p/original";
  const posterBase = "https://image.tmdb.org/t/p/w500";

  return (
    <motion.div
      dir="ltr"
      className="min-h-screen bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4] py-8 px-4 md:px-12 lg:px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="relative bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden">
          <motion.img
            src={
              backdrop_path
                ? `${imageBase}${backdrop_path}`
                : "https://st3.depositphotos.com/7107694/13093/v/450/depositphotos_130939700-stock-illustration-not-available-rubber-stamp.jpg"
            }
            alt={title}
            className="w-full h-full object-cover brightness-75"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Typography
            variant="h2"
            className="absolute bottom-4 left-6 text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold"
          >
            {title}
          </Typography>
        </div>

        <CardBody className="-mt-4 bg-[#ADBBDA] rounded-t-3xl p-6 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            className="lg:col-span-1 flex justify-center lg:justify-start"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={
                poster_path
                  ? `${posterBase}${poster_path}`
                  : "https://m.media-amazon.com/images/I/3120m+SwqYL._SY466_.jpg"
              }
              alt={title}
              className="w-48 sm:w-56 md:w-full max-w-xs rounded-2xl shadow-xl border-4 border-white"
            />
          </motion.div>

          <div className="lg:col-span-2 flex flex-col justify-between text-gray-900">
            <div className="space-y-4">
              {tagline && (
                <blockquote className=" pl-4 italic text-gray-800">
                  “{tagline}”
                </blockquote>
              )}
              <Typography variant="paragraph" className="leading-relaxed">
                {overview}
              </Typography>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 text-sm">
                <div className="flex flex-wrap gap-4">
                  <span className="font-medium">Release:</span> {release_date}
                  <span className="font-medium">Runtime:</span> {runtime} min
                  <span className="font-medium">Status:</span> {status}
                </div>
                <div className="flex flex-wrap gap-4">
                  <span className="font-medium">Budget:</span> $
                  {budget.toLocaleString()}
                  <span className="font-medium">Revenue:</span> $
                  {revenue.toLocaleString()}
                  <span className="font-medium">Origin:</span>
                  {origin_country.join(", ")}
                  <span className="font-medium">Languages:</span>
                  {spoken_languages.map((l) => l.english_name).join(", ")}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {genres.map((g) => (
                  <span
                    key={g.id}
                    className="bg-[#3D52A0]/10 text-[#3D52A0] px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {g.name}
                  </span>
                ))}
              </div>

              <Typography variant="small" className="text-[#3D52A0] flex gap-3">
                <span>Casting:</span>
                {casts
                  .slice(0, 5)
                  .map((c) => c.name)
                  .join(" -||- ") || "—"}
              </Typography>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="filled"
                className="bg-[#7091E6] hover:bg-[#3D52A0] text-white py-3 w-full flex items-center justify-center gap-2 uppercase tracking-wide"
              >
                <FaHeart /> Add to Watchlist
              </Button>
              <Button
                variant="filled"
                className="bg-[#3D52A0] hover:bg-[#7091E6] text-white py-3 w-full flex items-center justify-center gap-2 uppercase tracking-wide"
              >
                <FaStar /> Rate Movie
              </Button>
              <Button
                variant="filled"
                className="bg-[#8697C4] hover:bg-[#7091E6] text-white py-3 w-full flex items-center justify-center gap-2 uppercase tracking-wide"
                onClick={() => setOpenTrailer(true)}
                disabled={!trailer}
              >
                <FaPlay /> Play Trailer
              </Button>
              <Link to={`/movie`}>
                <Button
                  variant="outlined"
                  className="border-[#3D52A0] text-[#3D52A0] py-3 w-full uppercase tracking-wide hover:bg-[#3D52A0]/10"
                >
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>

      <Dialog
        open={openTrailer}
        handler={() => setOpenTrailer(false)}
        size="md"
      >
        <DialogBody className="p-0">
          {trailer ? (
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube-nocookie.com/embed/${trailer.key}?rel=0&modestbranding=1`}
              title="Trailer"
              allowFullScreen
              className="border-0"
            />
          ) : (
            <div className="p-8 text-center">
              <Typography className="text-xl font-bold">
                No trailer available
              </Typography>
            </div>
          )}
        </DialogBody>
      </Dialog>
    </motion.div>
  );
};

export default TopSection;
