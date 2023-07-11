import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Youtube from "react-youtube";
import "../css/NewPageComp.css";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FaStar } from "react-icons/fa";
import MyLoader from "./MyLoader";

let apiKey = "f7c839883fc085f9357c84ea65a753d0";

function NewPageComp() {
  const [video, setVideo] = useState();
  const [content, setContent] = useState();
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [mediaTypes, setMediaTypes] = useState("tv");
  const location = useLocation();
  const [condition, setConditon] = useState(false);
  const [contentLoader, setContentLoader] = useState(true);

  //let videoElement: YouTubePlayer = null;
  let from = location.state;

  if (!condition) {
    if (from.media_type) {
      setMediaTypes(from.media_type);
      setConditon(true);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setContentLoader(false);
    }, 2000);
  });

  function fetchData() {
    return fetch(
      `https://api.themoviedb.org/3/${mediaTypes}/${from.id}?api_key=${apiKey}`
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log(res);
          //  setMediaTypes("tv");
        }
      })
      .then((data) => {
        setContent(data);
        //  console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function fetchVideo() {
    return fetch(
      `https://api.themoviedb.org/3/${mediaTypes}/${from.id}/videos?api_key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setVideo(data.results[0]?.key);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchDirector() {
    return fetch(
      `https://api.themoviedb.org/3/${mediaTypes}/${from.id}/credits?api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(jsonData);
        setCast(jsonData.cast);
        setCrew(jsonData.crew);
      });
  }
  // jsonData.crew.filter(({job})=> (job ==='Director') ? console.log(job) : "")
  useEffect(() => {
    fetchVideo();
    fetchData();
    fetchDirector();
    // eslint-disable-next-line
  }, []);

  const options = {
    control: 0,
    showinfo: 0,
    height: "390",
    width: "640",
    playerVars: {
      enablejsapi: 1,
      origin: "http://localhost:3000",
      loop: 0,
      autoplay: 0,
    },
  };

  //   const myStyle={
  //     backgroundImage: `url(https://image.tmdb.org/t/p/w300${  content.backdrop_path
  //     ? `https://image.tmdb.org/t/p/w500/${content.backdrop_path}`
  //     :  "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg"})`,
  //     backgroundPosition: "center",
  //     backgroundRepeat: "no-repeat",
  //     backgroundSize: "cover"

  // };

  function setCastBox(cast) {
    return (
      <div className="castBoxDetails" key={cast.id}>
        <img
          className="castPoster"
          src={
            cast.profile_path
              ? `https://image.tmdb.org/t/p/w300${cast.profile_path}`
              : "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg"
          }
          alt="Movie Poster"
        />{" "}
        <br />
        <b className="name">{cast.name}</b> <br />
        <span>Character : {cast.character}</span> <br />
        <span>{cast.known_for_department}</span>
      </div>
    );
  }
  function setCrewBox(crew) {
    return (
      <div className="castBoxDetails" key={crew.id}>
        <img
          className="castPoster"
          src={
            crew.profile_path
              ? `https://image.tmdb.org/t/p/w300${crew.profile_path}`
              : "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg"
          }
          alt="Movie Poster"
        />{" "}
        <br />
        <b className="name">{crew.name}</b> <br />
        <span>{crew.job}</span>
      </div>
    );
  }
  function convertRupees(number) {
    var crore = Math.floor(number / 10000000);
    var lakh = Math.floor((number % 10000000) / 100000);
    var rupee = (number % 100000) / 100;

    var amountInWords = "";

    if (crore > 0) {
      amountInWords += crore + " crore ";
    }

    if (lakh > 0) {
      amountInWords += lakh + " lakh ";
    }

    if (rupee > 0) {
      amountInWords += rupee.toFixed(2) + " rupees";
    }

    return amountInWords.trim();
  }

  return (
    <>
      {contentLoader ? (
        <MyLoader />
      ) : (
        <>
          {content && (
            <div className="pageBox">
              <img
                id="imagesPoster"
                src={
                  from.poster
                    ? `https://image.tmdb.org/t/p/w300${from.poster}`
                    : ""
                }
                alt="Cast Poster"
              />
              <div className="cardOfBox">
                <h1>
                  {" "}
                  {from.title}{" "}
                  <span>
                    (
                    {content.release_date
                      ? content.release_date.split("-")[0]
                      : content.first_air_date.split("-")[0]}
                    )
                  </span>
                </h1>
                {/* <Link to={content.homepage} ></Link> */}
                <div>
                  <Box
                    id="circularTxtBox"
                    sx={{ position: "relative", display: "inline-flex" }}
                  >
                    <CircularProgress
                      variant="determinate"
                      color="secondary"
                      id="idBoxVoteAvg"
                      value={from.vote_average}
                      size={60}
                      thickness={4}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                        id="boldTxtForVote"
                      >
                        {`${from.vote_average}%`}
                      </Typography>
                    </Box>
                  </Box>
                  <div id="usrScoreTxt">
                    User <br /> Score
                  </div>
                </div>
                <div className="genresBox">
                  {content.genres
                    ? content.genres.map((genre) => {
                        return (
                          <div key={genre.id}>
                            <FaStar className="faStarGenre" />{" "}
                            <h3> {genre.name}</h3>{" "}
                          </div>
                        );
                      })
                    : ""}
                </div>
                <div>
                  {content.budget ? (
                    <h3 className="budgetRevenue">
                      {" "}
                      Budget : {convertRupees(content.budget)}
                    </h3>
                  ) : (
                    ""
                  )}
                  {content.budget ? (
                    <h3 className="budgetRevenue">
                      {" "}
                      Revenue : {convertRupees(content.revenue)}
                    </h3>
                  ) : (
                    ""
                  )}
                </div>
                <div id="tagLineTxt">{content.tagline}</div>
                <div className="titleOfPage">
                  {" "}
                  <span>Overview</span> <br />
                  {content.overview}
                </div>
              </div>
              <div>
                {" "}
                <Youtube videoId={video} opts={options} id="youtubSize" />
              </div>
            </div>
          )}
          <div className="otherBox">
            <h1>Cast</h1>
            <div className="gridOfCast">
              {cast &&
                cast.map((cst) => {
                  return setCastBox(cst);
                })}
            </div>
          </div>

          <div className="otherBox">
            <h1>Crew</h1>
            <div className="gridOfCast">
              {crew &&
                crew.map((cst) => {
                  return setCrewBox(cst);
                })}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default NewPageComp;
