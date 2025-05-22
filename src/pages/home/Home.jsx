import MoviesSection from "./components/MoviesSection";
import SeriesSection from "./components/SeriesSection";
import TopContentSection from "./components/TopContentSection";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4] px-4 py-8 text-[#3D52A0]">
      <MoviesSection />
      <SeriesSection />
      <TopContentSection />
    </div>
  );
};

export default Home;
