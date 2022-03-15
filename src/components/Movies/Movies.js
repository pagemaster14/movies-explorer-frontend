import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import api from "../../ulits/MoviesApi";
import { SHORT_MOVIE_DURATION } from "../../ulits/constants";

function Movies(props) {
  const [movies, setMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [moviesToRender, setMoviesToRender] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isSearchDone, setIsSearchDone] = React.useState(false);
  const [firstResultsNumber, setFirstResultsNumber] = React.useState(0);
  const [moreResultsNumber, setMoreResultsNumber] = React.useState(0);
  const currentViewport = document.documentElement.clientWidth;
  const [findedMovie, setFindedMovie] = React.useState('');
  const [shortMovies, setShortMovies] = React.useState(false);
  const [isMoreButtonVisible, setIsMoreButtonVisible] = React.useState(false);

  function filterMovies(movies, findedMovie) {
    let moviesToFilter = movies;
    let result;

    result = moviesToFilter.filter((movie) => {
      return movie.nameRU.toLowerCase().indexOf(findedMovie.toLowerCase().trim()) !== -1;
    })
    return result;
  }

  const [moviesRequestStatus, setMoviesRequestStatus] = React.useState([]);
  function handleSearch(findedMovie) {
    setMoviesToRender([]);
    setFindedMovie(findedMovie);

    const initialMoviesInLocalStorage = JSON.parse(localStorage.getItem('initialMovies'));

    if (!initialMoviesInLocalStorage) {
      setIsSearching(true);
      setMoviesRequestStatus([]);
      api.getInitialMovies()
        .then((allMovies) => {
          setMovies(allMovies);
          localStorage.setItem('initialMovies', JSON.stringify(allMovies));
        })
        .catch(err => {
          if (err) {
            setMoviesRequestStatus(['Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз']);
          }
        })
        .finally(() => {
          setIsSearching(false);
        })
    } else {
      setMovies(initialMoviesInLocalStorage);
    }
  }

  React.useEffect(() => {
    if (movies.length > 0) {
      const searchResults = filterMovies(movies, findedMovie);
      setFilteredMovies(searchResults);
      setIsSearchDone(true);
    }
  }, [movies, findedMovie]);

  React.useEffect(() => {
    if (currentViewport <= 767) {
      setFirstResultsNumber(5);
      setMoreResultsNumber(2);
    } else if (currentViewport <= 1279) {
      setFirstResultsNumber(8);
      setMoreResultsNumber(2);
    } else if (currentViewport >= 1280) {
      setFirstResultsNumber(12);
      setMoreResultsNumber(3);
    }
  }, [currentViewport]);

  window.addEventListener('resize', function (event) {
    if (currentViewport <= 768) {
      setFirstResultsNumber(5);
    } else if (currentViewport <= 1280) {
      setFirstResultsNumber(8);
    } else if (currentViewport > 1280) {
      setFirstResultsNumber(12);
    }
  }, true);

  React.useEffect(() => {
    if (filteredMovies.length > 0) {
      if (filteredMovies.length > firstResultsNumber) {
        setMoviesToRender(filteredMovies.slice(0, firstResultsNumber));
        setIsMoreButtonVisible(true);
      } else {
        setMoviesToRender(filteredMovies);
      }
      localStorage.setItem('lastSearch', JSON.stringify(filteredMovies));
    }
  }, [filteredMovies, firstResultsNumber]);

  function handleMoreButtonClick() {
    setMoviesToRender((state) => filteredMovies.slice(0, state.length + moreResultsNumber));
  }

  React.useEffect(() => {
    if (moviesToRender.length === filteredMovies.length) {
      setIsMoreButtonVisible(false);
    }
  }, [moviesToRender, filteredMovies]);

  function handleCheckBox() {
    setShortMovies(!shortMovies);
    localStorage.setItem('lastCheckBoxState', JSON.stringify(!shortMovies));
  }

  React.useEffect(() => {
    const lastCheckBoxState = JSON.parse(localStorage.getItem('lastCheckBoxState'));
    if (lastCheckBoxState) {
      setShortMovies(lastCheckBoxState);
    }
  }, []);

  const lastSearchArr = JSON.parse(localStorage.getItem('lastSearch'));

  function filterShortMovies(arr) {
    if (arr.length !== 0 || arr !== "undefind") {
      return arr.filter((movie) =>
        shortMovies ? movie.duration <= SHORT_MOVIE_DURATION : true
      );
    }
  }

  React.useEffect(() => {
    const lastSearchNameValue = JSON.parse(localStorage.getItem('lastSearchName'));
    if (lastSearchNameValue) {
      setFindedMovie(lastSearchNameValue)
    }
  }, []);

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm onSearch={handleSearch} onFilter={handleCheckBox}
          findedMovie={findedMovie} setFindedMovie={setFindedMovie}
          isShortMovie={shortMovies} />
        {isSearching
          ? <Preloader />
          : isSearchDone
            ?
            moviesToRender.length > 0
              ? <MoviesCardList
                movies={filterShortMovies(moviesToRender)}
                onMoreButtonClick={handleMoreButtonClick}
                isMoreButtonVisible={isMoreButtonVisible}
                savedMovies={props.savedMovies}
                onMovieSave={props.onMovieSave}
                onMovieDelete={props.onMovieDelete}
              />
              : (
                <span className="movies__not-found">
                  Ничего не найдено
                </span>
              )
            : lastSearchArr
              ? <MoviesCardList
                movies={filterShortMovies(lastSearchArr)}
                onMoreButtonClick={handleMoreButtonClick}
                isMoreButtonVisible={isMoreButtonVisible}
                savedMovies={props.savedMovies}
                onMovieSave={props.onMovieSave}
                onMovieDelete={props.onMovieDelete}
              />
              : ('')
        }
        <span className="form__api-response"
        >{moviesRequestStatus}{props.saveMovieRequestStatus}
          {props.deleteMovieRequestStatus}{props.getDataRequestStatus}</span>
      </main>
      <Footer />
    </>
  );
}

export default Movies;