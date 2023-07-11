import React from "react";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Movie from "./Components/Movie";
import NewPageComp from "./Components/NewPageComp";
import Search from "./Components/Search";
import Trending from "./Components/Trending";
import TvShows from "./Components/TvShows";
import PageComp from "./Components/PageComp";
import { Hearts } from "react-loader-spinner";

function App() {
  let [loading, setLoading] = useState(true);

  const myStylesApp = {
    backgroundColor: "#a8eb12",
    //backgroundImage: " linear-gradient(to right bottom, rgb(133 239 251), rgb(153 197 217), rgb(40 227 233), rgb(217 24 186))",
    backgroundImage:
      " linear-gradient(-45deg, rgb(133 239 251), rgb(153 197 217), rgb(40 227 233), rgb(217 24 186),#ea9407)",
    backgroundSize: "400% 400%",
    animation: "gradient 15s ease infinite",
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  return (
    <>
      {loading ? (
        <Hearts
          height="220"
          width="270"
          color="#0cd1f7"
          ariaLabel="hearts-loading"
          wrapperStyle={{}}
          wrapperClass="loaderHeart"
          visible={true}
        />
      ) : (
        <div className="container" style={myStylesApp}>
          <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/Movie" element={<Movie />} />
            <Route path="/Tv Shows" element={<TvShows />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/newPageComp" element={<NewPageComp />} />
            <Route
              path="/PopularMovie"
              element={<PageComp type={"PopularMovie"} />}
            />
            <Route
              path="/topRateMovie"
              element={<PageComp type={"topRateMovie"} />}
            />
            <Route
              path="/UpcomingMovie"
              element={<PageComp type={"UpcomingMovie"} />}
            />
            <Route
              path="/PopularTvShow"
              element={<PageComp type={"PopularTvShow"} />}
            />
            <Route
              path="/topRateTvShow"
              element={<PageComp type={"topRateTvShow"} />}
            />
            <Route
              path="/airingToday"
              element={<PageComp type={"airingToday"} />}
            />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
