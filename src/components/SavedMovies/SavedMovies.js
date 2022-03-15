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
  const [findedSavedMovie, setSavedFindedMovie] = React.useState('');
  const [shortMovies, setShortMovies] = React.useState(false);

  function filterMovies(movies, findedSavedMovie) {
    let moviesToFilter = movies;
    let result;

    result = moviesToFilter.filter((movie) => {
      return movie.nameRU.toLowerCase().indexOf(findedSavedMovie.toLowerCase().trim()) !== -1;
    })
    return result;
  }

  function handleSearch(findedSavedMovie) {
    setSavedFindedMovie(findedSavedMovie);
    const searchResult = filterMovies(props.savedMovies, findedSavedMovie);
    setFilteredMovies(searchResult);
    setIsSearchDone(true);
  }

  React.useEffect(() => {
    if (filteredMovies.length > 0) {
      const searchResult = filterMovies(props.savedMovies, findedSavedMovie);
      setFilteredMovies(searchResult);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      findedSavedMovie={findedSavedMovie} setSavedFindedMovie={setSavedFindedMovie}/>
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
      movies={filterShortMovies(props.savedMovies)}
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