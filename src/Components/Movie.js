import React, { useEffect, useState } from "react";
import CardBox from "./CardBox";
import "../css/Movie.css";
import PaginationBox from "./PaginationBox";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

let apiKey = "f7c839883fc085f9357c84ea65a753d0";

function Movie() {
  const [pageClick, setPageClick] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [data, setData] = useState([]);
  const [bollyOrHolly, setbollyOrHolly] = useState("hi");
  const [comboData, setComboData] = useState([]);
  const fetchMovie = () => {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=${bollyOrHolly}&page=${pageClick}`
    )
      .then((res) => res.json())
      .then((response) => {
        setData(response.results);
        setTotalPage(response.total_pages);
      });
  };

  useEffect(() => {
    fetchMovie();
  }, [pageClick, bollyOrHolly]);

  function changePages(pages) {
    setPageClick(pages);
  }
  const handleChangeLang = (event, nextView) => {
    if (event.target.innerText === "BOLLYWOOD") {
      setbollyOrHolly("hi");
    }
    if (event.target.innerText === "HOLLYWOOD") {
      setbollyOrHolly("en");
    }
    if (event.target.innerText === "KOREAN") {
      setbollyOrHolly("ko");
    }
    if (event.target.innerText === "PANJABI") {
      setbollyOrHolly("pa");
    }
  };

  function fetchOtherLanguage() {
    return fetch(
      `https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`
    )
      .then((res) => res.json())
      .then((response) => {
        //console.log(response)
        setComboData(response);
      });
  }
  // const handleNdeble = (dt)=>{
  //   if(dt.english_name != "Ndebele"){
  //      return dt.english_name
  //   }else{
  //    // alert(dt.english_name)
  //    dt.iso_639_1="hi";
  //    dt.english_name=`Hindi${name++}`
  //   }
  //  // console.log(dt.english_name)
  // }
  useEffect(() => {
    fetchOtherLanguage();
  }, []);
  // {/* https://api.themoviedb.org/3/configuration/languages?api_key=f7c839883fc085f9357c84ea65a753d0&page=1 */}
  function setComboBox() {
    return (
      <Autocomplete
        id="comboBox"
        sx={{ width: 300, marginLeft: 5 }}
        options={comboData}
        autoHighlight
        getOptionLabel={(option) => option.english_name}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose Other Language"
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
        onChange={(event, value) => handleComboBox(event, value)}
      />
    );
  }

  const handleComboBox = (event, value) => {
    //console.log(value)
    setbollyOrHolly(value.iso_639_1);
  };
  return (
    <>
      <PaginationBox changePages={changePages} totalPages={totalPage} />
      <div className="boxForLang">
        <div id="BollyHolly">
          <ToggleButtonGroup
            className="toggleBox"
            value={bollyOrHolly}
            exclusive
            onChange={handleChangeLang}
            aria-label="text alignment"
          >
            <ToggleButton
              value={bollyOrHolly}
              className="toggleBoxButton"
              id="bollyButton"
            >
              Bollywood
            </ToggleButton>
            <ToggleButton value={bollyOrHolly} className="toggleBoxButton">
              Hollywood
            </ToggleButton>
            <ToggleButton
              value={bollyOrHolly}
              className="toggleBoxButton"
              id="koreanButton"
            >
              Korean
            </ToggleButton>
            <ToggleButton
              value={bollyOrHolly}
              className="toggleBoxButton"
              id="panjButton"
            >
              PANJABI
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div id="comboBoxSelector">{setComboBox()}</div>
      </div>
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
              media_type="movie"
              vote_average={Math.floor(card.vote_average * 10)}
            />
          ))}
      </div>
    </>
  );
}

export default Movie;
