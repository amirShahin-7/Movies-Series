import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";

const CollectionSection = () => {
  const { details } = useSelector((state) => state.movieDetails);
  const { collection, loading } = useSelector((state) => state.collection);

  if (!details?.belongs_to_collection || loading) return null;

  const collections = details.belongs_to_collection;
  const parts = collection?.parts || [];

  return (
    <motion.div
      dir="ltr"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-4 "
    >
      <Card className="relative max-w-[950px] rounded-lg overflow-hidden shadow-lg ">
        <CardBody className="p-0">
          <img
            src={`https://media.themoviedb.org/t/p/w1440_and_h320_multi_faces${collections.backdrop_path}`}
            alt={details.title}
            className="w-full h-64 rounded-t-lg "
          />
          <div className="absolute inset-0 bg-blue-900 bg-opacity-50 flex flex-col justify-center p-4">
            <Typography variant="h4" className="text-white font-bold">
              Part of the {collections.name}
            </Typography>
            <Typography variant="paragraph" className="text-white text-sm mt-1">
              Includes
              {parts.length > 0
                ? parts.map((part) => part.title).join(",__ ")
                : " Loading parts..."}
            </Typography>
            <Link
              to={`/collection/${collections.id}`}
              className="mt-2 w-fit bg-black text-white font-bold hover:bg-gray-800 px-4 py-2 rounded-2xl"
            >
              VIEW THE COLLECTION
            </Link>
          </div>
        </CardBody>
      </Card>
      <hr className="border-t border-[#8697C4] max-w-[950px] mt-10" />
    </motion.div>
  );
};

export default CollectionSection;
