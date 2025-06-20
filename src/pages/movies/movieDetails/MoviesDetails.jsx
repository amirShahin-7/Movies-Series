import {
  moviesDetails,
  fetchMovieCredits,
} from "./../../../redux/slices/moviesSlices/movieDetailsSlice";
import { fetchCollection } from "../../../redux/slices/moviesSlices/collectionSlice/collection";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import TopSection from "./TopSection";
import CastSection from "./cast/CastSection";
import SocialReviews from "./Social/SocialReviews";
import MediaSection from "./formedia/mediaSection";
import Recommendations from "./recommendation/Recommendations";
import CollectionSection from "./collection/CollectionSection";

const MoviesDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, isLoading, error } = useSelector(
    (state) => state.movieDetails || {},
    (prev, curr) =>
      prev.details === curr.details &&
      prev.isLoading === curr.isLoading &&
      prev.error === curr.error
  );

  useEffect(() => {
    if (!id) return;
    dispatch(moviesDetails(id));
    dispatch(fetchMovieCredits(id));
    if (details?.belongs_to_collection?.id) {
      dispatch(fetchCollection(details.belongs_to_collection.id));
    }
  }, [dispatch, id, details?.belongs_to_collection?.id]);

  if (!id) {
    return (
      <div className="w-full flex justify-center items-center text-white">
        Invalid Movie ID
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <ClipLoader color="#1A1A2E" size={50} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!details) {
    return <div>No data found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4]">
      <TopSection />
      <CastSection />
      <SocialReviews />
      <MediaSection />
      <CollectionSection />
      <Recommendations />
    </div>
  );
};

export default MoviesDetails;
