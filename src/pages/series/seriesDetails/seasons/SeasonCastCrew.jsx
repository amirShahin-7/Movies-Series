import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSeasonEpisodes,
  fetchEpisodeCredits,
} from "./../../../../redux/slices/series/seasonEpisodes/seasonEpisodesSlice";
import { fetchSeriesDetails } from "../../../../redux/slices/series/seriesDetailsSlice";
import { Typography, Button } from "@material-tailwind/react";

const SeasonCastCrew = () => {
  const { id, season_number, episode_number } = useParams();
  const dispatch = useDispatch();
  const { episodes, episodeCredits, isLoading, error } = useSelector(
    (state) => state.seasonEpisodesReducer
  );
  const { details } = useSelector((state) => state.seriesDetailsReducer);
  const [visibleCount, setVisibleCount] = useState(30);

  useEffect(() => {
    dispatch(fetchSeriesDetails(id));
    dispatch(
      fetchSeasonEpisodes({ seriesId: id, seasonNumber: season_number })
    );
  }, [dispatch, id, season_number]);

  useEffect(() => {
    const episode = episodes.find(
      (ep) => ep.episode_number === parseInt(episode_number)
    );
    if (episode && !episodeCredits[episode.id]) {
      dispatch(
        fetchEpisodeCredits({
          seriesId: id,
          seasonNumber: season_number,
          episodeNumber: episode_number,
          episodeId: episode.id,
        })
      );
    }
  }, [episodes, dispatch, id, season_number, episode_number, episodeCredits]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Typography variant="h6" className="text-[#3D52A0]">
          Loading cast & crew...
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

  const episode = episodes.find(
    (ep) => ep.episode_number === parseInt(episode_number)
  );
  if (!episode)
    return (
      <div className="flex justify-center py-8">
        <Typography variant="h6" className="text-[#3D52A0]">
          Episode not found
        </Typography>
      </div>
    );

  const episodeGuestStars = [
    ...new Map(
      (episode.guest_stars || []).map((star) => [star.id, star])
    ).values(),
  ];
  const episodeCredit = episodeCredits[episode.id] || {};
  const episodeCast = [
    ...new Map(
      (episodeCredit.cast || []).map((actor) => [actor.id, actor])
    ).values(),
  ];
  const episodeCrew = [
    ...new Map(
      (episodeCredit.crew || []).map((member) => [member.id, member])
    ).values(),
  ];

  const crewByDepartment = episodeCrew.reduce((acc, person) => {
    const department = person.department || "Other";
    if (!acc[department]) {
      acc[department] = [];
    }
    acc[department].push(person);
    return acc;
  }, {});

  const orderedDepartments = [
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
  ].filter((dept) => crewByDepartment[dept]);

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
              {details?.name} - Episode {episode_number}
            </div>
            <Link to={`/series/${id}/season/${season_number}/episodes`}>
              <div className="text-[#7091E6] underline hover:text-[#3D52A0]">
                ← Back to Episodes
              </div>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-[#ADBBDA] backdrop-blur-sm rounded-lg p-4">
              <Typography
                variant="h3"
                className="text-xl font-bold text-[#3D52A0] mb-4"
              >
                Episode Cast ({episodeCast.length})
              </Typography>
              <div className="col-span-1 lg:order-2 gap-4">
                {episodeCast
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
                          {person.character || "N/A"}
                        </Typography>
                      </div>
                    </div>
                  ))}
                {episodeCast.length > visibleCount && (
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
          <div>
            {episodeGuestStars.length > 0 && (
              <div className="mb-10">
                <div className="bg-[#ADBBDA] backdrop-blur-sm rounded-lg p-4">
                  <Typography
                    variant="h3"
                    className="text-xl font-bold text-[#3D52A0] mb-4"
                  >
                    Guest Stars ({episodeGuestStars.length})
                  </Typography>
                  <div className="col-span-1 lg:order-1 gap-4">
                    {episodeGuestStars
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
                              {person.character || "N/A"}
                            </Typography>
                          </div>
                        </div>
                      ))}
                    {episodeGuestStars.length > visibleCount && (
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
            {orderedDepartments.map((department) => (
              <div key={department} className="mb-10">
                <div className="bg-[#ADBBDA] backdrop-blur-sm rounded-lg p-4">
                  <Typography
                    variant="h3"
                    className="text-xl font-bold text-[#3D52A0] mb-4"
                  >
                    {department} ({crewByDepartment[department].length})
                  </Typography>
                  <div className="col-span-1 lg:order-1 gap-4">
                    {crewByDepartment[department]
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
                              {person.job || "N/A"}
                            </Typography>
                          </div>
                        </div>
                      ))}
                    {crewByDepartment[department].length > visibleCount && (
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

export default SeasonCastCrew;
