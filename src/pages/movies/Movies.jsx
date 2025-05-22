import { useDispatch, useSelector } from "react-redux";
import MoviesCards from "./component/MoviesCards";
import { useEffect } from "react";
import { getMovies } from "../../redux/slices/moviesSlices/moviesSlice";

const Movies = () => {
 
  return (
    <div>
      <MoviesCards/>
    </div>
  );
};

export default Movies;
