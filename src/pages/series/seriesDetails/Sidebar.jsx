import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaXTwitter, FaGlobe } from "react-icons/fa6";
import { motion } from "framer-motion";

const Sidebar = () => {
  const { details, externalIds } = useSelector(
    (state) => state.seriesDetailsReducer
  );
  const { seriesKeywords } = useSelector((state) => state.keywordsReducer);

  const SocialLink = ({ platform, id, url }) => {
    const platforms = {
      facebook: {
        name: "Facebook",
        icon: <FaFacebook className="text-lg" />,
        baseUrl: "https://facebook.com/",
      },
      instagram: {
        name: "Instagram",
        icon: <FaInstagram className="text-lg" />,
        baseUrl: "https://instagram.com/",
      },
      twitter: {
        name: "X (Twitter)",
        icon: <FaXTwitter className="text-lg" />,
        baseUrl: "https://twitter.com/",
      },
      website: { name: "Official Site", icon: <FaGlobe className="text-lg" /> },
    };

    const link = url || `${platforms[platform].baseUrl}${id}`;

    return (
      <Link
        to={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#3D52A0] hover:text-[#7091E6] transition-colors"
        title={`Visit ${platforms[platform].name}`}
      >
        {platforms[platform].icon}
      </Link>
    );
  };

  return (
    <motion.div
      className="hidden lg:block lg:w-1/4 bg-gradient-to-br from-[#8697C4]/60 via-[#ADBBDA]/60 to-[#8697C4]/60 backdrop-blur-md rounded-lg p-4 border-l border-l-[#3D52A0]/20 z-10"
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        height: "fit-content",
        maxHeight: "900px",
      }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {externalIds?.facebook_id && (
          <SocialLink platform="facebook" id={externalIds.facebook_id} />
        )}
        {externalIds?.instagram_id && (
          <SocialLink platform="instagram" id={externalIds.instagram_id} />
        )}
        {externalIds?.twitter_id && (
          <SocialLink platform="twitter" id={externalIds.twitter_id} />
        )}
        {details?.homepage && (
          <SocialLink platform="website" url={details.homepage} />
        )}
      </div>
      <div className="flex gap-4 mb-4 text-[#3D52A0]">Facts</div>
      <div className="space-y-3">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-[#3D52A0]/80 font-medium">
            Network:
          </span>
          <Link
            to={`/network/${details?.networks?.[0]?.id}`}
            className="flex items-center gap-2 text-sm text-[#3D52A0] font-semibold"
          >
            {details?.networks?.[0]?.logo_path && (
              <img
                src={`https://image.tmdb.org/t/p/h30${details.networks[0].logo_path}`}
                alt={details.networks[0].name}
                className="h-8"
              />
            )}
          </Link>
        </div>
        <div className="flex flex-col gap-3 justify-between">
          <span className="text-sm text-[#3D52A0]/80 font-medium">Type:</span>
          <span className="text-sm text-[#3D52A0] font-semibold">
            {details?.type || "N/A"}
          </span>
        </div>
        <div className="flex flex-col gap-3 justify-between">
          <span className="text-sm text-[#3D52A0]/80 font-medium">
            Original Language:
          </span>
          <span className="flex flex-col gap-3 text-sm text-[#3D52A0] font-semibold">
            {details?.spoken_languages?.[0]?.english_name || "N/A"}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-sm text-[#3D52A0]/80 font-medium">Status:</span>
          <span className="text-sm text-[#3D52A0] font-semibold">
            {details?.status || "N/A"}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-sm text-[#3D52A0]/80 font-medium">
            First Air Date:
          </span>
          <span className="text-sm text-[#3D52A0] font-semibold">
            {details?.first_air_date || "N/A"}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-sm text-[#3D52A0]/80 font-medium">
            Keywords:
          </span>
          <div className="flex flex-wrap gap-2">
            {seriesKeywords?.length > 0 ? (
              seriesKeywords.map((keyword) => (
                <Link
                  key={keyword.id}
                  to={`/keyword/${keyword.id}/${encodeURIComponent(
                    keyword.name
                  )}`}
                  className="text-sm text-[#3D52A0] font-semibold bg-[#ADBBDA]/30 hover:bg-[#7091E6]/30 px-2 py-1 rounded-md transition-colors"
                >
                  {keyword.name}
                </Link>
              ))
            ) : (
              <span className="text-sm text-[#3D52A0]/80">
                No keywords available
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
