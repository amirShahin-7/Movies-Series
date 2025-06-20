import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { fetchRecommendations } from "../../../../redux/slices/moviesSlices/recommendation/recommendationsSlice";
const Recommendations = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { recommendations, isLoading, error } = useSelector(
    (state) => state.recommendationsMovies
  );

  useEffect(() => {
    dispatch(fetchRecommendations(id));
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Typography variant="h4" className="text-[#3D52A0]">
          Loading recommendations...
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
    <motion.div
      dir="ltr"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 pb-4"
    >
      <Typography variant="h4" className="text-[#3D52A0] font-bold mb-4">
        Recommendations
      </Typography>
      <div className="overflow-x-auto pb-4 max-w-[950px]">
        <div className="flex space-x-4">
          {recommendations.slice(0, 20).map((item) => (
            <Link key={item.id} to={`/movie/${item.id}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="w-[250px] h-[180px] bg-white shadow-md overflow-hidden">
                  <CardBody className="p-0">
                    <img
                      src={
                        item.backdrop_path
                          ? `https://media.themoviedb.org/t/p/w250_and_h141_face${item.backdrop_path}`
                          : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                      }
                      alt={item.title}
                      className="w-[250px] h-[141px] rounded-t-lg"
                    />
                    <div className="p-2">
                      <Typography
                        variant="small"
                        className="text-[#3D52A0] font-bold flex flex-wrap justify-between"
                      >
                        <span>{item.title}</span>
                        {Math.round(item.vote_average * 10)}%
                      </Typography>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Recommendations;
