import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { API_KEY } from "../App";
import "./MovieInfo.css";

//import styled from "styled-components";

// const container = styled.div`
//   display: flex;
//   flex-direction: row;
//   padding: 20px 30px;
//   justify-content: center;
//   border-bottom: 1px solid lightgrey;
// `;
const CoverImage = styled.img`
  object-fit: cover;
  height: 352px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-transform: capitalize;
  overflow: hidden;
`;
const MovieInfom = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgrey;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.5;
`;
const MovieInfo = (props) => {
  const [movInfo, setMovInfo] = useState();
  const { selectedMovie } = props;
  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
      .then((response) => setMovInfo(response.data));
  }, [selectedMovie]);
  return (
    <div className="container">
      <CoverImage src={movInfo?.Poster} />
      <InfoColumn>
        <MovieName>
          {movInfo?.Type}: {movInfo?.Title}
        </MovieName>
        <MovieInfom>
          IMDB Rating: <span>{movInfo?.imdbRating}</span>
        </MovieInfom>
        <MovieInfom>
          Director: <span>{movInfo?.Director}</span>
        </MovieInfom>
        <MovieInfom>
          Genre: <span>{movInfo?.Genre}</span>
        </MovieInfom>
        <MovieInfom>
          RunTime: <span>{movInfo?.Runtime}</span>
        </MovieInfom>
        <MovieInfom>
          Release Date: <span>{movInfo?.Released}</span>
        </MovieInfom>
        <MovieInfom>
          Plot: <span>{movInfo?.Plot}</span>
        </MovieInfom>
        <MovieInfom>
          BoxOffice: <span>{movInfo?.BoxOffice}</span>
        </MovieInfom>
      </InfoColumn>
      <Close onClick={() => props.onMovieSelect()}>X</Close>
    </div>
  );
};

export default MovieInfo;
