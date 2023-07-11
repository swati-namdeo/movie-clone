import React from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";
import LogoMovie from "../images/MoviesLogo.png";
import {
  MdLocalFireDepartment,
  MdMovie,
  MdSlideshow,
  MdSearch,
  MdOutlineVpnLock,
} from "react-icons/md";
function Header() {
  return (
    <div className="headers">
      <Link to="/" id="imgLogos">
        <div>
          <img src={LogoMovie} />
        </div>{" "}
      </Link>
      <ul>
        <Link to="/" className="linkComp">
          {" "}
          <MdLocalFireDepartment /> Trending{" "}
        </Link>
        <li></li>
      </ul>
      <ul className="menuMovieBox">
        <Link to="/Movie" className="linkComp">
          {" "}
          <MdMovie /> Movie{" "}
        </Link>
        <ul className="submenuMovieBox">
          <li>
            <Link to="/PopularMovie" className="linkMovies">
              Popular Movies
            </Link>
          </li>
          <li>
            <Link to="/topRateMovie" className="linkMovies">
              To Rated Movies
            </Link>
          </li>
          <li>
            <Link to="/UpcomingMovie" className="linkMovies">
              Upcoming Movies
            </Link>
          </li>
        </ul>
      </ul>
      <ul className="menuMovieBox">
        <Link to="/Tv Shows" className="linkComp">
          {" "}
          <MdSlideshow />
          TV Shows{" "}
        </Link>
        <ul className="submenuMovieBox">
          <li>
            <Link to="/PopularTvShow" className="linkMovies">
              Popular TV Shows
            </Link>
          </li>
          <li>
            <Link to="/topRateTvShow" className="linkMovies">
              To Rated TV Shows
            </Link>
          </li>
          <li>
            <Link to="/airingToday" className="linkMovies">
              Airing Today
            </Link>
          </li>
        </ul>
      </ul>

      <Link to="/Search" id="searchIcon">
        {" "}
        <MdSearch /> Search
      </Link>
    </div>
  );
}

export default Header;
