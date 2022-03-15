import "./MoviesCard.css";
import options from "../../ulits/config"
import { Route, Switch } from 'react-router-dom';

function MoviesCard(props) {
  const isSaved = props.movie.id && props.savedMovies.some((m) => m.movieId === props.movie.id);

  function handleSaveClick() {
    if (isSaved) {
      props.onMovieDelete(props.savedMovies.filter((m) => m.movieId === props.movie.id)[0]);
    } else if (!isSaved) {
      props.onMovieSave(props.movie);
    }
  }

  function handleDeleteClick() {
    props.onMovieDelete(props.movie);
  }

  return (
    <article className="moviescard">
      <h2 className="moviescard__name" >{props.movie.nameRU}</h2>
      <p className="moviescard__duration">{`${Math.floor(
        (props.movie.duration) / 60
      )}ч ${(props.movie.duration) % 60}м`}</p>
      <a href={props.movie.trailerLink || props.movie.trailer} target="blank" className="moviescard__trailer">
      </a>
      <Switch>
        <Route path="/movies">
          <img src={
            `${options.baseImgUrl}${props.movie.image.url}`
          } alt={props.movie.nameRU} className="moviescard__image" />
          <button type="button"
            arialabel="Save"
            className={`moviescard__button ${isSaved && "moviescard__button_active"}`}
            onClick={handleSaveClick}>
            Сохранить
          </button>
        </Route>
        <Route path="/saved-movies">
          <img src={props.movie.image}
            alt={props.movie.nameRU} className="moviescard__image" />
          <button type="button"
            arialabel="delete"
            className="moviescard__button moviescard__button-delete"
            onClick={handleDeleteClick}>
            Сохранить
          </button>
        </Route>
      </Switch>
    </article>
  )
}

export default MoviesCard;