import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import { fetchMovieKeywords } from "../../../redux/slices/moviesSlices/keywords/keywordsSlice";

const KeywordPage = () => {
  const { keyword_id, keyword_name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { keywordMovie, loading, error } = useSelector(
    (state) => state.keywordsReducer
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchMovieKeywords({ keywordId: keyword_id, page }));
  }, [keyword_id, page, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Typography variant="h6" className="text-[#3D52A0]">
          Loading Movie...
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
    <div className="bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4] min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Typography
          variant="h1"
          className="text-4xl font-bold text-[#3D52A0] mb-6"
        >
          Keyword:
          {keyword_name ? keyword_name : `Keyword #${keyword_id}`}
        </Typography>
        <button
          onClick={() => navigate(-1)}
          className="text-[#7091E6] hover:text-[#3D52A0] mb-4 inline-block"
        >
          ← Back to previous page
        </button>
        {keywordMovie.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {keywordMovie.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="group hover:scale-105 transition-transform"
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                    }
                    alt={movie.name || "Movie"}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    loading="lazy"
                  />
                </div>
                <Typography
                  variant="h5"
                  className="mt-2 text-[#3D52A0] font-semibold truncate"
                >
                  {movie.name || "Unknown"}
                </Typography>
                {movie.first_air_date && (
                  <Typography variant="small" className="text-[#7091E6]">
                    {new Date(movie.first_air_date).getFullYear()}
                  </Typography>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <Typography variant="h6" className="text-[#3D52A0]">
            No movie found for this keyword.
          </Typography>
        )}
        {keywordMovie.length > 0 && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 text-[#3D52A0] bg-[#ADBBDA]/30 hover:bg-[#7091E6]/30 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <Typography className="text-[#3D52A0] self-center">
              Page {page}
            </Typography>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={keywordMovie.length < 20}
              className="px-4 py-2 text-[#3D52A0] bg-[#ADBBDA]/30 hover:bg-[#7091E6]/30 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeywordPage;
