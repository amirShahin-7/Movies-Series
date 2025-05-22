import {
  fetchPersonDetails,
  fetchPersonCombinedCredits,
  fetchPersonExternalIds,
} from "./../../../redux/slices/series/cast/personSlice";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import { FaFacebook, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";

const PersonPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { details, combined_credits, external_ids, loading, error } =
    useSelector((state) => state.personReducer);
  const [showFullBio, setShowFullBio] = useState(false);

  useEffect(() => {
    dispatch(fetchPersonDetails(id));
    dispatch(fetchPersonCombinedCredits(id));
    dispatch(fetchPersonExternalIds(id));
  }, [id, dispatch]);

  const SocialLink = ({ platform, url }) => {
    const platforms = {
      facebook: { icon: <FaFacebook className="text-lg" />, name: "Facebook" },
      twitter: { icon: <FaTwitter className="text-lg" />, name: "Twitter" },
      instagram: {
        icon: <FaInstagram className="text-lg" />,
        name: "Instagram",
      },
      homepage: { icon: <FaGlobe className="text-lg" />, name: "Website" },
    };
    if (!url || !platforms[platform]) return null;
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#3D52A0] hover:text-[#7091E6] transition-colors flex items-center gap-2"
        title={platforms[platform].name}
      >
        {platforms[platform].icon}
      </a>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Typography variant="h6" className="text-[#3D52A0]">
          Loading person information...
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

  const bioPreview = details?.biography
    ? showFullBio
      ? details.biography
      : details.biography.slice(0, 300) +
        (details.biography.length > 300 ? "..." : "")
    : "No biography available.";

  return (
    <div className="bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4] min-h-screen py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-80 flex-shrink-0">
          {details?.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300${details.profile_path}`}
              alt={details.name || "Person"}
              loading="lazy"
              className="w-full rounded-lg shadow-lg mb-4"
            />
          )}
          <div className="flex gap-4 mb-4">
            {external_ids?.facebook_id && (
              <SocialLink
                platform="facebook"
                url={`https://www.facebook.com/${external_ids.facebook_id}`}
              />
            )}
            {external_ids?.twitter_id && (
              <SocialLink
                platform="twitter"
                url={`https://www.twitter.com/${external_ids.twitter_id}`}
              />
            )}
            {external_ids?.instagram_id && (
              <SocialLink
                platform="instagram"
                url={`https://www.instagram.com/${external_ids.instagram_id}`}
              />
            )}
            {details?.homepage && (
              <SocialLink platform="homepage" url={details.homepage} />
            )}
          </div>
          <div className="text-[#3D52A0] space-y-2">
            {details?.known_for_department && (
              <Typography variant="small">
                <span className="font-semibold">Known For:</span>
                {details.known_for_department}
              </Typography>
            )}
            {details?.birthday && (
              <Typography variant="small">
                <span className="font-semibold">Birthday:</span>
                {new Date(details.birthday).toLocaleDateString()}
              </Typography>
            )}
            {details?.place_of_birth && (
              <Typography variant="small">
                <span className="font-semibold">Place of Birth:</span>
                {details.place_of_birth}
              </Typography>
            )}
            {details?.gender && (
              <Typography variant="small">
                <span className="font-semibold">Gender:</span>
                {details.gender === 1
                  ? "Female"
                  : details.gender === 2
                  ? "Male"
                  : "Other"}
              </Typography>
            )}
            {details?.also_known_as?.length > 0 && (
              <Typography variant="small">
                <span className="font-semibold">Also Known As:</span>
                {details.also_known_as.join(", ")}
              </Typography>
            )}
          </div>
        </div>
        <div className="flex-1">
          <Typography
            variant="h1"
            className="text-4xl font-bold text-[#3D52A0] mb-6"
          >
            {details?.name || "Person"}
          </Typography>
          <button
            onClick={() => navigate(-1)}
            className="text-[#7091E6] hover:text-[#3D52A0] mb-4 inline-block"
          >
            ← Back to previous page
          </button>
          {details?.biography && (
            <div className="mt-8">
              <Typography
                variant="h2"
                className="text-2xl font-bold text-[#3D52A0] mb-4"
              >
                Biography
              </Typography>
              <Typography className="text-[#3D52A0]">{bioPreview}</Typography>
              {details.biography.length > 300 && (
                <button
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="text-[#7091E6] hover:text-[#3D52A0] mt-2"
                >
                  {showFullBio ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
          )}
          {combined_credits.cast.length > 0 && (
            <div className="mt-8">
              <Typography
                variant="h2"
                className="text-2xl font-bold text-[#3D52A0] mb-6"
              >
                Known For
              </Typography>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {combined_credits.cast.slice(0, 8).map((item) => (
                  <Link
                    key={item.id}
                    to={`/${item.media_type}/${item.id}`}
                    className="group hover:scale-105 transition-transform"
                  >
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                        }
                        alt={item.title || item.name || "Media"}
                        className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                        loading="lazy"
                      />
                    </div>
                    <Typography
                      variant="h5"
                      className="mt-2 text-[#3D52A0] font-semibold truncate"
                    >
                      {item.title || item.name || "Unknown"}
                    </Typography>
                    {item.release_date || item.first_air_date ? (
                      <Typography variant="small" className="text-[#7091E6]">
                        {new Date(
                          item.release_date || item.first_air_date
                        ).getFullYear()}
                      </Typography>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {(combined_credits.cast.length > 0 ||
            combined_credits.crew.length > 0) && (
            <div className="mt-8">
              <Typography
                variant="h2"
                className="text-2xl font-bold text-[#3D52A0] mb-6"
              >
                Credits
              </Typography>
              <div className="relative">
                {[...combined_credits.cast, ...combined_credits.crew]
                  .sort(
                    (a, b) =>
                      new Date(
                        b.release_date || b.first_air_date || "9999-12-31"
                      ) -
                      new Date(
                        a.release_date || a.first_air_date || "9999-12-31"
                      )
                  )
                  .map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="flex items-start mb-6"
                    >
                      <div className="w-24 text-[#3D52A0] font-semibold">
                        {item.release_date || item.first_air_date
                          ? new Date(
                              item.release_date || item.first_air_date
                            ).getFullYear()
                          : "TBA"}
                      </div>
                      <div className="flex-1 border-l-2 border-[#7091E6] pl-4">
                        <Link
                          to={`/${item.media_type}/${item.id}`}
                          className="text-[#3D52A0] hover:text-[#7091E6] font-semibold"
                        >
                          {item.title || item.name || "Unknown"}
                        </Link>
                        <Typography variant="small" className="text-[#3D52A0]">
                          {item.character
                            ? `as ${item.character}`
                            : item.job
                            ? item.job
                            : "Unknown Role"}
                          {item.episode_count &&
                            ` (${item.episode_count} episode${
                              item.episode_count > 1 ? "s" : ""
                            })`}
                        </Typography>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonPage;
