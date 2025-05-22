import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { fetchSeriesReviews } from "../../../../redux/slices/series/Social/SocialReviewsSlice";

const SocialReviews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { reviews, totalReviews, isLoading, error } = useSelector(
    (state) => state.seriesReviewsReducer
  );
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchSeriesReviews(id));
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Typography variant="h6" className="text-[#3D52A0]">
          Loading reviews...
        </Typography>
      </div>
    );
  }

  const showStaticContent = error || reviews.length === 0;

  const handleReviewsClick = () => {
    if (reviews.length > 0) {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex + 1 < reviews.length ? prevIndex + 1 : 0
      );
    }
  };

  const handleReviewTitleClick = (reviewUrl) => {
    window.location.href = reviewUrl;
  };

  const currentReview = reviews[currentReviewIndex];

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 mb-4">
        <div className="flex gap-4">
          <Typography variant="h4" className="text-[#3D52A0]">
            Social
          </Typography>
          <Typography
            variant="h6"
            className="text-[#3D52A0] cursor-pointer font-medium flex items-center  hover:text-[#7091E6]"
            onClick={handleReviewsClick}
          >
            Reviews {totalReviews}
          </Typography>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4] rounded-lg p-4 max-w-[950px] shadow-md">
          {showStaticContent ? (
            <Typography
              variant="paragraph"
              className="text-gray-800 text-center"
            >
              There are no reviews available for this series.
            </Typography>
          ) : (
            <div style={{ display: showStaticContent ? "none" : "block" }}>
              <div className="flex items-center gap-3 mb-2">
                {currentReview.author_details.avatar_path ? (
                  <img
                    src={`https://media.themoviedb.org/t/p/w45_and_h45_face${currentReview.author_details.avatar_path}`}
                    alt="Author Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#3D52A0] flex items-center justify-center text-white font-bold">
                    {currentReview.author_details.name?.charAt(0) ||
                      currentReview.author.charAt(0)}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Typography
                    variant="h6"
                    className="text-[#3D52A0] font-semibold text-base cursor-pointer hover:text-[#7091E6]"
                    onClick={() => handleReviewTitleClick(currentReview.url)}
                  >
                    A review by{" "}
                    {currentReview.author_details.name || currentReview.author}
                  </Typography>
                  {currentReview.author_details.rating && (
                    <Typography
                      variant="small"
                      className="text-[#3D52A0] font-bold"
                    >
                      {currentReview.author_details.rating * 10}%
                    </Typography>
                  )}
                </div>
              </div>
              <Typography variant="small" className="text-[#7091E6] mb-2">
                Written by
                {currentReview.author_details.name || currentReview.author} on
                {new Date(currentReview.created_at).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </Typography>
              <Typography variant="paragraph" className="text-gray-800">
                {currentReview.content.length > 390
                  ? `${currentReview.content.slice(0, 390)}...`
                  : currentReview.content}
              </Typography>
            </div>
          )}
        </div>
        {!showStaticContent && (
          <div className="mt-4">
            <Link
              to={`/series/${id}/reviews`}
              className="text-[#3D52A0] hover:text-[#7091E6] font-medium"
            >
              Read All Reviews
            </Link>
          </div>
        )}
        <hr className="border-t border-[#8697C4] max-w-[950px] mt-4" />
      </div>
    </div>
  );
};

export default SocialReviews;
