import React, { useEffect, useState } from "react";
import CardBox from "./CardBox";
import "../css/TvShows.css";
import PaginationBox from "./PaginationBox";
let apiKey = "f7c839883fc085f9357c84ea65a753d0";

function TvShows() {
  const [pageClick, setPageClick] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [data, setData] = useState([]);
  const fetchTvShows = () => {
    return fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&page=${pageClick}&with_original_language=hi`
    )
      .then((res) => res.json())
      .then((response) => {
        setData(response.results);
        setTotalPage(response.total_pages);
      });
  };

  useEffect(() => {
    fetchTvShows();
  }, [pageClick]);

  function changePages(pages) {
    setPageClick(pages);
  }
  return (
    <>
      <PaginationBox changePages={changePages} totalPages={totalPage} />
      <div id="tvShowBox">
        {data &&
          data.map((card) => (
            <CardBox
              key={card.id}
              id={card.id}
              poster={card.poster_path}
              title={card.title || card.name}
              original_language={card.original_language}
              date={card.first_air_date || card.release_date}
              media_type="tv"
              vote_average={Math.floor(card.vote_average * 10)}
            />
          ))}
      </div>
    </>
  );
}

export default TvShows;
