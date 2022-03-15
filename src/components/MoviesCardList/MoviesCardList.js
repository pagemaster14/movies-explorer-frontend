import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
function MoviesCardList(props) {

  const moreButtonClassName = `more_button ${
    props.isMoreButtonVisible && "more_button_active"
  }`;


  return (
    <section className="moviescardlist">
      <div className="moviescardlist_container">
        {props.movies
          .map((movie) => (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              savedMovies={props.savedMovies}
              onMovieSave={props.onMovieSave}
              onMovieDelete={props.onMovieDelete}
            />
          ))}
      </div>
      <button className={moreButtonClassName}
type="button"
onClick={props.onMoreButtonClick}>
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;