import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { fetchImages } from "../../../../redux/slices/moviesSlices/mediaSlice/mediaSlice";
import { moviesDetails } from "../../../../redux/slices/moviesSlices/movieDetailsSlice";

const PostersPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.movieDetails);
  const { posters, isLoading, error } = useSelector(
    (state) => state.mediaMovie
  );
  const [filter, setFilter] = useState("en");

  useEffect(() => {
    dispatch(fetchImages(id));
    dispatch(moviesDetails(id));
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Typography variant="h6" className="text-[#3D52A0]">
          Loading posters...
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

  const filteredPosters =
    filter === "none"
      ? posters.filter((p) => !p.iso_639_1)
      : posters.filter((p) => p.iso_639_1 === filter);

  const options = [
    {
      type: "en",
      label: "English",
      count: posters.filter((p) => p.iso_639_1 === "en").length,
    },
    {
      type: "none",
      label: "No Language",
      count: posters.filter((p) => !p.iso_639_1).length,
    },
    {
      type: "bg",
      label: "Bulgarian",
      count: posters.filter((p) => p.iso_639_1 === "bg").length,
    },
    {
      type: "zh",
      label: "Chinese",
      count: posters.filter((p) => p.iso_639_1 === "zh").length,
    },
    {
      type: "co",
      label: "Corsican",
      count: posters.filter((p) => p.iso_639_1 === "co").length,
    },
    {
      type: "fr",
      label: "French",
      count: posters.filter((p) => p.iso_639_1 === "fr").length,
    },
    {
      type: "he",
      label: "Hebrew",
      count: posters.filter((p) => p.iso_639_1 === "he").length,
    },
    {
      type: "hu",
      label: "Hungarian",
      count: posters.filter((p) => p.iso_639_1 === "hu").length,
    },
    {
      type: "pt",
      label: "Portuguese",
      count: posters.filter((p) => p.iso_639_1 === "pt").length,
    },
    {
      type: "ru",
      label: "Russian",
      count: posters.filter((p) => p.iso_639_1 === "ru").length,
    },
    {
      type: "uk",
      label: "Ukrainian",
      count: posters.filter((p) => p.iso_639_1 === "uk").length,
    },
  ].filter((option) => option.count > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4]">
      <header className="p-4 max-w-[1200px] mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 bg-gradient-to-br from-[#EDE8F5]/80 via-[#ADBBDA]/80 to-[#8697C4]/80 rounded-lg p-4">
          <img
            src={
              details?.poster_path
                ? `https://image.tmdb.org/t/p/w185${details?.poster_path}`
                : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
            }
            alt={details?.title}
            loading="lazy"
            className="w-28 h-auto rounded shadow"
          />
          <div className="flex flex-col items-center sm:items-start">
            <div className="text-2xl font-bold text-[#3D52A0]">
              {details?.title}
            </div>
            <Link to={`/movie/${id}`}>
              <div className="text-[#7091E6] underline hover:text-[#3D52A0]">
                ← Back to main
              </div>
            </Link>
            <div className="flex flex-col items-center sm:items-start gap-2 mt-2">
              <Typography variant="h4" className="text-[#3D52A0] font-bold">
                Posters
              </Typography>
              <div className="flex flex-wrap justify-center gap-4">
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
                    {option.label} {option.count}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-[1000px] mx-auto bg-gradient-to-br from-[#EDE8F5]/80 via-[#ADBBDA]/80 to-[#8697C4]/80 rounded-lg p-4 shadow-md">
        <main className="flex-1 p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            {filteredPosters.map((poster) => (
              <Card
                key={poster.file_path}
                className="w-full lg:w-[300px] bg-[#ADBBDA] shadow-md"
              >
                <CardBody className="p-4">
                  <img
                    src={`https://media.themoviedb.org/t/p/w220_and_h330_face${poster.file_path}`}
                    alt="Poster"
                    className="w-full lg:h-[400px] object-cover rounded-lg mb-2"
                  />
                  <div className="flex flex-col text-center gap-2">
                    <Typography
                      variant="small"
                      className="text-[#7091E6] font-bold"
                    >
                      Size: {poster.width}x{poster.height}
                    </Typography>
                    <Typography
                      variant="small"
                      className="text-[#7091E6] font-bold"
                    >
                      Language: {poster.iso_639_1 || "No Language"}
                    </Typography>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PostersPage;
