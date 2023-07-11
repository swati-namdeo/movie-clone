import React, { useEffect } from "react";
import { useState } from "react";
import CardBox from "./CardBox";
import "../css/Trending.css";
import PaginationBox from "./PaginationBox";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
let apiKey = "f7c839883fc085f9357c84ea65a753d0";
function Trending() {
  const [content, setContent] = useState([]);
  const [popular, setPopular] = useState([]);
  const [pageClick, setPageClick] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [dayOrWeek, setDayOrWeek] = useState("day");

  const fetchTrading = () => {
    return fetch(
      `https://api.themoviedb.org/3/trending/all/${dayOrWeek}?api_key=${apiKey}&page=${pageClick}`
    )
      .then((res) => res.json())
      .then((response) => {
        setContent(response.results);
        setTotalPage(response.total_pages);
      });
  };
  const FetchPopularMovies = () => {
    return fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&sort_by=vote_average.desc`
    )
      .then((res) => res.json())
      .then((response) => {
        // console.log(response)
        setPopular(response.results);
        setTotalPage(response.total_pages);
      });
  };

  useEffect(() => {
    fetchTrading();
    FetchPopularMovies();
  }, [pageClick, dayOrWeek]);

  function changePages(pages) {
    setPageClick(pages);
  }

  function FetchCard(content, movieType) {
    return (
      <>
        <h1>Trending {movieType}</h1>
        <div id="cardBox">
          {movieType === "Movie" ? (
            <>
              {content &&
                content.map((card) =>
                  card.media_type === "movie" ? (
                    <CardBox
                      key={card.id}
                      id={card.id}
                      poster={card.poster_path}
                      title={card.title || card.name}
                      original_language={card.original_language}
                      date={card.first_air_date || card.release_date}
                      media_type={card.media_type}
                      vote_average={Math.floor(card.vote_average * 10)}
                    />
                  ) : (
                    ""
                  )
                )}{" "}
            </>
          ) : (
            <>
              {content &&
                content.map((card) =>
                  card.media_type === "tv" ? (
                    <CardBox
                      key={card.id}
                      id={card.id}
                      poster={card.poster_path}
                      title={card.title || card.name}
                      date={card.first_air_date || card.release_date}
                      media_type={card.media_type}
                      vote_average={Math.floor(card.vote_average * 10)}
                    />
                  ) : (
                    ""
                  )
                )}{" "}
            </>
          )}
        </div>
      </>
    );
  }
  const handleChange = (event, nextView) => {
    event.target.innerText === "DAY"
      ? setDayOrWeek("day")
      : setDayOrWeek("week");
  };

  function FetchPopular(popular, movieType) {
    return (
      <>
        <h1>{movieType}</h1>
        <div id="cardBox">
          {popular &&
            popular.map((card) => (
              <CardBox
                key={card.id}
                id={card.id}
                poster={card.poster_path}
                title={card.title || card.name}
                date={card.first_air_date || card.release_date}
                media_type={card.media_type}
                vote_average={Math.floor(card.vote_average * 10)}
              />
            ))}
        </div>
      </>
    );
  }

  return (
    <div>
      <PaginationBox changePages={changePages} totalPages={totalPage} />
      <div id="dayWeek">
        <ToggleButtonGroup
          className="toggleBox"
          value={dayOrWeek}
          exclusive
          onChange={handleChange}
          aria-label="text alignment"
        >
          <ToggleButton value={dayOrWeek} className="toggleBox" id="dayButton">
            Day
          </ToggleButton>
          <ToggleButton value={dayOrWeek} className="toggleBox" id="weekButton">
            Week
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {FetchCard(content, "Movie")}
      {FetchCard(content, "TV Shows")}
      {FetchPopular(popular, "Most Popular")}
    </div>
  );
}

export default Trending;
