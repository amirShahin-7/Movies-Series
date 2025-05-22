import TopSection from "./TopSection";
import CastSection from "./cast/CastSection";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSeriesDetails } from "../../../redux/slices/series/seriesDetailsSlice";
import { fetchCast } from "../../../redux/slices/series/cast/castSlice";
import { ClipLoader } from "react-spinners";
import LastSeason from "./seasons/LastSeason";
import SocialReviews from "./Social/SocialReviews";
import MediaSection from "./formedia/mediaSection";
import Recommendations from "./recommendation/Recommendations";

const SeriesDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, isLoading, error } = useSelector(
    (state) => state.seriesDetailsReducer || {},
    (prev, curr) =>
      prev.details === curr.details &&
      prev.isLoading === curr.isLoading &&
      prev.error === curr.error
  );

  useEffect(() => {
    if (!id) return;
    dispatch(fetchSeriesDetails(id));
    dispatch(fetchCast(id));
  }, [dispatch, id]);

  if (!id) {
    return (
      <div className="w-full flex justify-center items-center text-white">
        Invalid Series ID
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
      <LastSeason />
      <SocialReviews />
      <MediaSection />
      <Recommendations />
    </div>
  );
};

export default SeriesDetails;
