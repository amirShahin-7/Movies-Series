import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/Header";
import Movies from "./pages/movies/Movies";
import Series from "./pages/series/Series";
import ContactUs from "./pages/contactUs/ContactUs";
import SeriesDetails from "./pages/series/SeriesDetails";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/series/:id" element={<SeriesDetails />} />
      </Routes>
    </div>
  );
};

export default App;
