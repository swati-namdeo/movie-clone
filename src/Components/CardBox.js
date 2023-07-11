import React from "react";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
function CardBox(props) {
  const navigate = useNavigate();
  const handleClickOnCard = (e) => {
    //   let cardId = e.currentTarget.id;
    // console.log(props)
    navigate("/newPageComp", { state: props });
  };
  return (
    <>
      <div className="cardFlex" id={props.id} onClick={handleClickOnCard}>
        <Badge
          badgeContent={props.vote_average}
          color={props.vote_average > 6 ? "primary" : "secondary"}
          size={60}
          // anchorOrigin={{
          //   horizontal: 'left',
          //   vertical: 'bottom',

          // }}
        />
        <img
          className="poster"
          src={
            props.poster
              ? `https://image.tmdb.org/t/p/w300${props.poster}`
              : "https://www.movienewz.com/img/films/poster-holder.jpg"
          }
          alt={props.title}
        />
        <b className="title">{props.title}</b>
        <span className="subTitle">
          {props.media_type === "undefined"
            ? (props.media_type = "movie")
            : props.media_type === "tv"
            ? "TV Series"
            : "Movie"}{" "}
          <br />
          <span>Language : {props.original_language}</span> <br />
          <span className="subTitle">{props.date}</span>
        </span>
      </div>
    </>
  );
}

export default CardBox;
