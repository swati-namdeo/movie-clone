import React, { useEffect, useState } from "react";
import CardBox from "./CardBox";
import "../css/Movie.css";
import PaginationBox from "./PaginationBox";
let apiKey = "f7c839883fc085f9357c84ea65a753d0";

function PageComp(props) {
  const [pageClick, setPageClick] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [data, setData] = useState([]);

  const [movieTech, setMovieTech] = useState("movie");

  const fetchMovie = (movieOrTv, movieType) => {
    return fetch(
      `https://api.themoviedb.org/3/${movieOrTv}/${movieType}?api_key=${apiKey}&page=${pageClick}`
    )
      .then((res) => res.json())
      .then((response) => {
        //  console.log(response)
        if (movieType === "upcoming") {
          const filteredData = response.results.filter(
            (item) => item.release_date >= getDateFormate()
          );
          setData(filteredData);
        } else {
          setData(response.results);
        }
        setTotalPage(response.total_pages);
        setMovieTech(movieOrTv);
      });
  };
  function getDateFormate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let fullDate = `${year}-${month > 10 ? month : "0" + month}-${
      day > 10 ? day : "0" + day
    }`;
    return fullDate;
  }
  useEffect(() => {
    if (props.type === "PopularMovie") {
      fetchMovie("movie", "popular");
    }
    if (props.type === "topRateMovie") {
      fetchMovie("movie", "top_rated");
    }
    if (props.type === "UpcomingMovie") {
      fetchMovie("movie", "upcoming");
    }
    if (props.type === "PopularTvShow") {
      fetchMovie("tv", "popular");
    }
    if (props.type === "topRateTvShow") {
      fetchMovie("tv", "top_rated");
    }
    if (props.type === "airingToday") {
      fetchMovie("tv", "airing_today");
    }
  }, [pageClick, props.type]);

  function changePages(pages) {
    setPageClick(pages);
  }
  return (
    <>
      <PaginationBox changePages={changePages} totalPages={totalPage} />
      <div id="movieBox">
        {data &&
          data.map((card) => (
            <CardBox
              key={card.id}
              id={card.id}
              poster={card.poster_path}
              title={card.title || card.name}
              original_language={card.original_language}
              date={card.first_air_date || card.release_date}
              media_type={movieTech}
              vote_average={Math.floor(card.vote_average * 10)}
            />
          ))}
      </div>
    </>
  );
}

export default PageComp;
