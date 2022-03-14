import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { SHORT_MOVIE_DURATION } from "../../ulits/constants";

function SavedMovies(props) {
  const [isSearchDone, setIsSearchDone] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [findedMovie, setFindedMovie] = React.useState('');
  const [shortMovies, setShortMovies] = React.useState(false);

  function filterMovies(movies, findedMovie) {
    let moviesToFilter = movies;
    let result;

    result = moviesToFilter.filter((movie) => {
      return movie.nameRU.toLowerCase().indexOf(findedMovie.toLowerCase().trim()) !== -1;
    })
    return result;
  }

  function handleSearch(findedMovie) {
    setFindedMovie(findedMovie);
    const searchResult = filterMovies(props.savedMovies, findedMovie);
    setFilteredMovies(searchResult);
    setIsSearchDone(true);
  }

  React.useEffect(() => {
    if (filteredMovies.length > 0) {
      const searchResult = filterMovies(props.savedMovies, findedMovie);
      setFilteredMovies(searchResult);
    }
  }, [props.savedMovies]);

  function handleCheckBox() {
    setShortMovies(!shortMovies);
  }

  function filterShortMovies(arr) {
    if (arr.length !== 0 || arr !== "undefind") {
      return arr.filter((movie) =>
        shortMovies ? movie.duration <= SHORT_MOVIE_DURATION : true
      );
    }
  }

  return (
    <>
      <Header />
      <main className="savedmovies">
      <SearchForm onSearch={handleSearch} onFilter={handleCheckBox}
      findedMovie={findedMovie} setFindedMovie={setFindedMovie}/>
      {isSearchDone
      ? filteredMovies.length > 0
      ? <MoviesCardList
      movies={filterShortMovies(filteredMovies)}
      onMovieDelete={props.onMovieDelete}/>
      : (
        <span className="savedmovies__not-found">
        Ничего не найдено
      </span>
      )
      : <MoviesCardList
      movies={props.savedMovies}
      onMovieDelete={props.onMovieDelete}
    />
}
      <div className="savedmovies__devider">
      </div>
      <span className="form__api-response"
        >{props.deleteMovieRequestStatus}{props.getDataRequestStatus}</span>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;