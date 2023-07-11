import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import "../css/Search.css";
import CardBox from "./CardBox";
import PaginationBox from "./PaginationBox";

let apiKey = "f7c839883fc085f9357c84ea65a753d0";
function Search() {
  const [res, setRes] = useState("");
  const [result, setResult] = useState([]);
  const [pageClick, setPageClick] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  function fetchAPI(searchText) {
    return fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchText}&page=${pageClick}`
    )
      .then((res) => res.json())
      .then((data) => {
        setResult(data.results);
        setTotalPage(data.total_pages);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSearch = (e) => {
    fetchAPI(res);
  };
  // useEffect(()=>{
  // fetchAPI();
  //    // eslint-disable-next-line
  // },[])
  function changePages(pages) {
    setPageClick(pages);
    fetchAPI(res);
  }
  return (
    <div className="searchPageContainer">
      <div className="input-box">
        <i>
          <FcSearch />
        </i>
        <input
          type="text"
          id="textFieldBoxes"
          placeholder="Search for a Movie, TV Shows, Person...."
          value={res}
          onChange={(e) => setRes(e.target.value)}
        />
        <button className="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div>
        <PaginationBox changePages={changePages} totalPages={totalPage} />
        <div className="gridSearchResult">
          {result &&
            result.map((card) => (
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
            ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
