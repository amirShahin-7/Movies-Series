import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { fetchMovieReviews } from "./../../../../redux/slices/moviesSlices/Social/SocialReviewsSlice";

const MoviesReviews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { reviews, totalReviews, isLoading } = useSelector(
    (state) => state.movieReviews
  );

  useEffect(() => {
    dispatch(fetchMovieReviews(id));
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

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <div className="py-8 min-h-screen bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4]">
      <div className="container mx-auto px-4 max-w-[950px]">
        <div className="mb-8">
          <Typography variant="h4" className="text-[#3D52A0] font-bold">
            Reviews ({totalReviews})
          </Typography>
          <Link to={`/movie/${id}`}>
            <div className="text-[#7091E6] underline hover:text-[#3D52A0] mt-3">
              ← Back to Movie
            </div>
          </Link>
        </div>
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4] rounded-lg p-4 shadow-md"
            >
              <div className="flex items-center gap-3 mb-2">
                {review.author_details.avatar_path ? (
                  <img
                    src={`https://media.themoviedb.org/t/p/w45_and_h45_face${review.author_details.avatar_path}`}
                    alt="Author Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#3D52A0] flex items-center justify-center text-white font-bold">
                    {review.author_details.name?.charAt(0) ||
                      review.author.charAt(0)}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Typography
                    variant="h6"
                    className="text-[#3D52A0] font-semibold text-base cursor-pointer hover:text-[#7091E6]"
                    onClick={() => review.url}
                  >
                    A review by {review.author_details.name || review.author}
                  </Typography>
                  {review.author_details.rating && (
                    <Typography
                      variant="small"
                      className="text-[#3D52A0] font-bold"
                    >
                      {review.author_details.rating * 10}%
                    </Typography>
                  )}
                </div>
              </div>
              <Typography variant="small" className="text-[#7091E6] mb-2">
                Written by {review.author_details.name || review.author} on
                {new Date(review.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </Typography>
              <Typography variant="paragraph" className="text-gray-800">
                {review.content}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesReviews;
