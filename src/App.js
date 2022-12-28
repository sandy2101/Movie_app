import "./App.css";
import styled from "styled-components";
import MovieComponents from "./components/MovieComponents";
import { useState } from "react";
import axios from "axios";
import MovieInfo from "./components/MovieInfo";
export const API_KEY = "930fb3e3";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
// `;
// const Header = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   background-color: red;
//   align-items: center;
//   color: black;
//   padding: 15px;
//   font-size: 25px;
//   font-weight: bold;
//   box-shadow: 0 3px 6px 0 #555;
// `;
// const AppName = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
// `;
const MovieImage = styled.img`
  width: 40px;
  height: 35px;
  margin: 15px;
`;
// const SearchBox = styled.div`
//   display: flex;
//   flex-direction: row;
//   padding: 10px 10px;
//   background-color: white;
//   border-radius: 6px;
//   margin-left: 20px;
//   width: 50%;
//   background-color: white;
//   align-items: center;
// `;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 25px;
  border: none;
  outline: none;
  margin-left: 15px;
`;
// const MovieListContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   padding: 30px;
//   justify-content: space-between;
// `;

function App() {
  const [search, updateSearch] = useState();
  const [time, updateTime] = useState();
  const [movielist, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchmovie) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchmovie}&apikey=${API_KEY}`
    );
    console.log(response);
    updateMovieList(response.data.Search);
  };
  const onTextChange = (e) => {
    clearTimeout(time);
    updateSearch(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTime(timeout);
  };

  return (
    <div className="Container">
      <div className="Header">
        <div className="AppName">
          <MovieImage src="/movie.webp" />
          MovieApp
        </div>

        <div className="SearchBox">
          <SearchIcon src="/searchicon.webp" />
          <SearchInput
            placeholder="Search Movie"
            onChange={onTextChange}
            value={search}
          />
        </div>
      </div>
      {selectedMovie && (
        <MovieInfo
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}
      <div className="MovieListContainer">
        {movielist?.length
          ? movielist.map((movie, index) => (
              <MovieComponents
                key={index}
                movie={movie}
                onMovieSelect={onMovieSelect}
              />
            ))
          : "No Movie Search"}
      </div>
    </div>
  );
}

export default App;
