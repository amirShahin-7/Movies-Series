import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCast } from "../../../../redux/slices/series/cast/castSlice";
import { fetchSeriesDetails } from "../../../../redux/slices/series/seriesDetailsSlice";
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

const FullCastPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cast, loading } = useSelector((state) => state.castReducer);
  const { details } = useSelector((state) => state.seriesDetailsReducer);
  const [visibleCount, setVisibleCount] = useState(30);

  useEffect(() => {
    if (!cast || cast.length === 0) {
      dispatch(fetchCast(id));
    }
    dispatch(fetchSeriesDetails(id));
  }, [id, cast, dispatch]);

  const castByDepartment = useMemo(() => {
    return cast?.reduce((acc, person) => {
      const department = person.known_for_department || "Other";
      if (!acc[department]) {
        acc[department] = [];
      }
      acc[department].push(person);
      return acc;
    }, {});
  }, [cast]);

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
            alt={details?.name}
            loading="lazy"
            className="w-24 h-auto rounded shadow"
          />
          <div>
            <div className="text-2xl font-bold text-[#3D52A0]">
              {details?.name}
            </div>
            <Link to={`/series/${id}`}>
              <div className="text-[#7091E6] underline hover:text-[#3D52A0]">
                ← Back to main
              </div>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            {castByDepartment["Acting"] && (
              <div>
                <div className="bg-[#ADBBDA] backdrop-blur-sm rounded-lg p-4">
                  <Typography
                    variant="h3"
                    className="text-xl font-bold text-[#3D52A0] mb-4"
                  >
                    Series Cast ({castByDepartment["Acting"].length})
                  </Typography>
                  <div className="col-span-1 lg:order-2 gap-4">
                    {castByDepartment["Acting"]
                      .sort((a, b) => b.popularity - a.popularity)
                      .slice(0, visibleCount)
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
                              {person.roles
                                ?.map((r) => r.character)
                                .join(", ") || "N/A"}
                            </Typography>
                            {person.total_episode_count > 0 && (
                              <Typography
                                variant="small"
                                className="text-[#3D52A0]/80"
                              >
                                {person.total_episode_count} Episodes
                              </Typography>
                            )}
                          </div>
                        </div>
                      ))}
                    {castByDepartment["Acting"].length > visibleCount && (
                      <Button
                        className="mt-4 w-full bg-[#3D52A0] hover:bg-[#7091E6] text-white"
                        onClick={() => setVisibleCount(visibleCount + 30)}
                      >
                        Load More
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            {orderedDepartments
              .filter((dept) => dept !== "Acting")
              .map((department) => (
                <div key={department} className="mb-10">
                  <div className="bg-[#ADBBDA] backdrop-blur-sm rounded-lg p-4">
                    <Typography
                      variant="h3"
                      className="text-xl font-bold text-[#3D52A0] mb-4"
                    >
                      {department} ({castByDepartment[department].length})
                    </Typography>
                    <div className="col-span-1 lg:order-1 gap-4">
                      {castByDepartment[department]
                        .sort((a, b) => b.popularity - a.popularity)
                        .slice(0, visibleCount)
                        .map((person) => (
                          <div
                            key={person.id}
                            className="flex items-start gap-3 p-2 hover:bg-white/20 rounded transition-colors"
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
                                {person.jobs?.map((j) => j.job).join(", ") ||
                                  person.roles
                                    ?.map((r) => r.character)
                                    .join(", ") ||
                                  "N/A"}
                              </Typography>
                              {person.total_episode_count > 0 && (
                                <Typography
                                  variant="small"
                                  className="text-[#3D52A0]/80"
                                >
                                  {person.total_episode_count} Episodes
                                </Typography>
                              )}
                            </div>
                          </div>
                        ))}
                      {castByDepartment[department].length > visibleCount && (
                        <Button
                          className="mt-4 w-full bg-[#3D52A0] hover:bg-[#7091E6] text-white"
                          onClick={() => setVisibleCount(visibleCount + 30)}
                        >
                          Load More
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullCastPage;
