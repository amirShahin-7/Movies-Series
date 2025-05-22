import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { fetchSeries } from "../../../redux/slices/series/seriesSlice";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-[#3D52A0] text-white p-2 rounded-full shadow hover:bg-[#7091E6] transition"
  >
    <FaArrowRight size={16} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-[#3D52A0] text-white p-2 rounded-full shadow hover:bg-[#7091E6] transition"
  >
    <FaArrowLeft size={16} />
  </div>
);

const SeriesSection = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.seriesReducer);

  useEffect(() => {
    dispatch(fetchSeries(1));
  }, [dispatch]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "40px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl ml-4 font-bold mb-6 text-[#3D52A0]">Series</h2>
      <div className="relative max-w-6xl mx-auto">
        <Slider {...settings}>
          {list?.slice(0, 20).map((series) => (
            <div
              key={series.id}
              className="px-5 cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <Link to={`/series/${series.id}`}>
                {series.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                    alt={series.title}
                    className="w-full h-[330px] rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-full h-[330px] bg-white flex items-center justify-center rounded-lg">
                    <Typography className="text-[#3D52A0]">No Image</Typography>
                  </div>
                )}
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SeriesSection;
