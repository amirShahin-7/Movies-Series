import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import {
  moviesDetails,
  fetchMovieCredits,
} from "./../../../../redux/slices/moviesSlices/movieDetailsSlice";

const FullCastMovie = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, cast, crew, loading } = useSelector(
    (state) => state.movieDetails
  );
  const [visibleCounts, setVisibleCounts] = useState({});

  useEffect(() => {
    if (!cast || cast.length === 0 || !crew || crew.length === 0) {
      dispatch(moviesDetails(id));
      dispatch(fetchMovieCredits(id));
    }
  }, [id, cast, crew, dispatch]);

  const castByDepartment = useMemo(() => {
    const allPeople = [...(cast || []), ...(crew || [])];
    const uniquePeople = [];
    const seenIds = new Set();
    allPeople.forEach((person) => {
      if (!seenIds.has(person.id)) {
        seenIds.add(person.id);
        uniquePeople.push(person);
      }
    });
    return uniquePeople.reduce((acc, person) => {
      const department = person.known_for_department || "Other";
      if (!acc[department]) {
        acc[department] = [];
      }
      acc[department].push(person);
      return acc;
    }, {});
  }, [cast, crew]);

  const orderedDepartments = [
    "Acting",
    "Directing",
    "Writing",
    "Production",
    "Sound",
    "Camera",
    "Art",
    "Editing",
    "Costume & Make-Up",
    "Crew",
    "Visual Effects",
    "Lighting",
    "Other",
  ].filter((dept) => castByDepartment?.[dept]);

  const handleLoadMore = (department) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [department]: (prev[department] || 30) + 30,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Typography variant="h6" className="text-[#3D52A0]">
          Loading cast information...
        </Typography>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#8697C4] via-[#ADBBDA] to-[#8697C4]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-8 ml-4 bg-gradient-to-br from-[#EDE8F5]/80 via-[#ADBBDA]/80 to-[#8697C4]/80 rounded-lg p-4">
          <img
            src={
              details?.poster_path
                ? `https://image.tmdb.org/t/p/w185${details?.poster_path}`
                : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
            }
            alt={details?.title || details?.name}
            loading="lazy"
            className="w-24 h-auto rounded shadow"
          />
          <div>
            <div className="text-2xl font-bold text-[#3D52A0]">
              {details?.title || details?.name}
            </div>
            <Link to={`/movie/${id}`}>
              <div className="text-[#7091E6] underline hover:text-[#3D52A0]">
                ← Back to main
              </div>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {/* Cast Section (Acting) */}
          {castByDepartment["Acting"] && (
            <div>
              <div className="bg-[#ADBBDA] backdrop-blur-sm rounded-lg p-4 mb-6">
                <Typography
                  variant="h3"
                  className="text-xl font-bold text-[#3D52A0] mb-4"
                >
                  Acting ({castByDepartment["Acting"].length})
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {castByDepartment["Acting"]
                    .sort((a, b) => b.popularity - a.popularity)
                    .slice(0, visibleCounts["Acting"] || 30)
                    .map((person) => (
                      <div
                        key={person.id}
                        className="flex items-center gap-3 p-2 hover:bg-white/20 rounded transition-colors"
                      >
                        <Link
                          to={`/person/${person.id}`}
                          className="flex-shrink-0"
                        >
                          <img
                            src={
                              person.profile_path
                                ? `https://image.tmdb.org/t/p/w138_and_h175_face${person.profile_path}`
                                : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                            }
                            alt={person.name}
                            className="w-16 h-20 object-cover rounded shadow-md"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link to={`/person/${person.id}`}>
                            <Typography
                              variant="h6"
                              className="font-semibold text-[#3D52A0] truncate"
                            >
                              {person.name}
                            </Typography>
                          </Link>
                          <Typography
                            variant="small"
                            className="text-[#7091E6] truncate"
                          >
                            {person.character || "N/A"}
                          </Typography>
                          <Typography
                            variant="small"
                            className="text-[#7091E6] truncate"
                          >
                            popularity {person.popularity || "0"}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  {castByDepartment["Acting"].length >
                    (visibleCounts["Acting"] || 30) && (
                    <button
                      className="mt-4 w-full bg-[#3D52A0] hover:bg-[#7091E6] text-white py-2 rounded"
                      onClick={() => handleLoadMore("Acting")}
                    >
                      Load More
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* Crew Sections */}
          <div>
            <div className="bg-[#ADBBDA] backdrop-blur-sm rounded-lg p-4 mb-6">
              <Typography
                variant="h3"
                className="text-xl font-bold text-[#3D52A0] mb-4"
              >
                Crew
              </Typography>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {orderedDepartments
                  .filter((dept) => dept !== "Acting")
                  .map((department) => (
                    <div key={department}>
                      <Typography
                        variant="h4"
                        className="text-lg font-semibold text-[#3D52A0] mb-2"
                      >
                        {department} ({castByDepartment[department].length})
                      </Typography>
                      {castByDepartment[department]
                        .sort((a, b) => b.popularity - a.popularity)
                        .slice(0, visibleCounts[department] || 30)
                        .map((person) => (
                          <div
                            key={person.id}
                            className="flex items-center gap-3 p-2 hover:bg-white/20 rounded transition-colors"
                          >
                            <Link
                              to={`/person/${person.id}`}
                              className="flex-shrink-0"
                            >
                              <img
                                src={
                                  person.profile_path
                                    ? `https://image.tmdb.org/t/p/w138_and_h175_face${person.profile_path}`
                                    : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                                }
                                alt={person.name}
                                className="w-16 h-20 object-cover rounded shadow-md"
                              />
                            </Link>
                            <div className="flex-1 min-w-0">
                              <Link to={`/person/${person.id}`}>
                                <Typography
                                  variant="h6"
                                  className="font-semibold text-[#3D52A0] truncate"
                                >
                                  {person.name}
                                </Typography>
                              </Link>
                              <Typography
                                variant="small"
                                className="text-[#7091E6] truncate"
                              >
                                {person.jobs
                                  ? person.jobs.map((j) => j.job).join(", ")
                                  : "N/A"}
                              </Typography>
                              <Typography
                                variant="small"
                                className="text-[#7091E6] truncate"
                              >
                                popularity {person.popularity || "0"}
                              </Typography>
                            </div>
                          </div>
                        ))}
                      {castByDepartment[department].length >
                        (visibleCounts[department] || 30) && (
                        <button
                          className="mt-4 w-full bg-[#3D52A0] hover:bg-[#7091E6] text-white py-2 rounded"
                          onClick={() => handleLoadMore(department)}
                        >
                          Load More
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullCastMovie;
