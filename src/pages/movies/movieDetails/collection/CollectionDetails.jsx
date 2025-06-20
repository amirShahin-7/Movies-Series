import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { fetchCollection } from "./../../../../redux/slices/moviesSlices/collectionSlice/collection";

const CollectionDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { collection, loading, error } = useSelector(
    (state) => state.collection
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCollection(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="h6" className="text-[#3D52A0]">
          Loading...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="h6" className="text-red-500">
          Error: {error}
        </Typography>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="h6" className="text-[#3D52A0]">
          No data available
        </Typography>
      </div>
    );
  }

  const imageBase = "https://image.tmdb.org/t/p/original";

  const {
    name,
    parts,
    poster_path = "",
    backdrop_path = "",
    overview = "No overview available.",
  } = collection;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mx-auto px-4 py-6 min-h-screen bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4]"
    >
      {/* Navbar Section */}
      <Card className="relative overflow-hidden rounded-lg shadow-lg">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              backdrop_path
                ? `${imageBase}${backdrop_path}`
                : "https://st3.depositphotos.com/7107694/13093/v/450/depositphotos_130939700-stock-illustration-not-available-rubber-stamp.jpg"
            })`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <CardBody className="relative z-10 p-6 flex items-center h-[500px]">
          <img
            src={`${imageBase}${poster_path}`}
            alt={name}
            className="w-72 h-[350px] mr-8 rounded-lg shadow-lg object-cover"
          />
          <div className="space-y-4">
            <Typography variant="h2" className="text-white font-bold text-4xl">
              {name}
            </Typography>
            <Typography
              variant="h4"
              className="text-white font-semibold text-xl"
            >
              Overview
            </Typography>
            <Typography variant="paragraph" className="text-white text-lg">
              {overview}
            </Typography>
            <Typography variant="small" className="text-white text-base">
              Number of Movies: {parts.length}
            </Typography>
            <Link to={-1}>
              <Typography
                variant="h4"
                className="text-[#7091E6] hover:text-[#3D52A0] underline transition-colors"
              >
                ← Back to main
              </Typography>
            </Link>
          </div>
        </CardBody>
      </Card>

      {/* Seasons Section */}
      <div className="container mx-auto py-8 px-4">
        {parts.map((part) => (
          <Link to={`/movie/${part.id}`} key={part.id} className="block mb-6">
            <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow mx-auto max-w-7xl border border-gray-200">
              <CardBody className="p-0 flex items-center">
                <img
                  src={
                    part.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500${part.backdrop_path}`
                      : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                  }
                  alt={part.title}
                  className="w-1/3 h-48 object-cover"
                />
                <div className="p-6 w-2/3">
                  <Typography
                    variant="h6"
                    className="text-[#3D52A0] font-semibold text-xl truncate"
                  >
                    {part.title}
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-[#7091E6] text-base"
                  >
                    {part.release_date || "N/A"}
                  </Typography>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default CollectionDetails;
