import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/Header";
import Movies from "./pages/movies/Movies";
import Series from "./pages/series/Series";
import ContactUs from "./pages/contactUs/ContactUs";
import SeriesDetails from "./pages/series/seriesDetails/SeriesDetails";
import MovieDetails from "./pages/movies/MovieDetails";
import Footer from "./components/Footer";
import FullCastPage from "./pages/series/seriesDetails/cast/FullCastPage";
import NetworkPage from "./pages/series/seriesDetails/NetworkPage";
import PersonPage from "./pages/series/seriesDetails/PersonPage";
import KeywordPage from "./pages/series/seriesDetails/KeywordPage";
import Seasons from "./pages/series/seriesDetails/seasons/Seasons";
import SeasonEpisodes from "./pages/series/seriesDetails/seasons/SeasonEpisodes";
import SeasonCastCrew from "./pages/series/seriesDetails/seasons/SeasonCastCrew";
import AllReviews from "./pages/series/seriesDetails/Social/AllReviews";
import VideosPage from "./pages/series/seriesDetails/formedia/VideosPage";
import BackdropsPage from "./pages/series/seriesDetails/formedia/BackdropsPage";
import PostersPage from "./pages/series/seriesDetails/formedia/PostersPage";
import NotFound from "./pages/notFound/NotFound";
const App = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-[#EDE8F5] via-[#ADBBDA] to-[#8697C4]">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/series" element={<Series />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/series/:id" element={<SeriesDetails />} />
        <Route path="/tv/:id" element={<SeriesDetails />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/series/:id/FullCastPage" element={<FullCastPage />} />
        <Route path="/network/:id" element={<NetworkPage />} />
        <Route path="/person/:id" element={<PersonPage />} />
        <Route path="/series/:id/seasons" element={<Seasons />} />
        <Route
          path="/series/:id/season/:season_number/episodes"
          element={<SeasonEpisodes />}
        />
        <Route
          path="/series/:id/season/:season_number/episode/:episode_number/cast-crew"
          element={<SeasonCastCrew />}
        />
        <Route
          path="/keyword/:keyword_id/:keyword_name"
          element={<KeywordPage />}
        />
        <Route path="/series/:id/reviews" element={<AllReviews />} />
        <Route path="/series/:id/videos" element={<VideosPage />} />
        <Route path="/series/:id/backdrops" element={<BackdropsPage />} />
        <Route path="/series/:id/posters" element={<PostersPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
