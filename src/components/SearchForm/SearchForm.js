import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { Route } from "react-router-dom";

function SearchForm(props) {
  const [findedMovie, setFindedMovie] = React.useState('');
  const [findedSavedMovie, setSavedFindedMovie] = React.useState('');

  function handleSearchMovie(e) {
    const input = document.getElementById('name');
    input.setCustomValidity('');
    setFindedMovie(e.target.value);
    setSavedFindedMovie(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSearch(findedMovie);
    localStorage.setItem('lastSearchName', JSON.stringify(findedMovie));
  }

  function handleSaveSubmit(evt) {
    evt.preventDefault();
    props.onSearch(findedSavedMovie);
  }

  React.useEffect(() => {
    const lastSearchNameValue = JSON.parse(localStorage.getItem('lastSearchName'));
    if (lastSearchNameValue) {
      setFindedMovie(lastSearchNameValue);
    }
  }, []);

  React.useEffect(() => {
    if (!findedMovie) {
      const input = document.getElementById('name');
      input.setCustomValidity('Нужно ввести ключевое слово');
    }
  }, [findedMovie]);

  return (
    <section className="searchform">
      <Route exact path="/movies">
        <form className="searchform__form" onSubmit={handleSubmit}>
          <input type="text" name="name" id="name"
            placeholder="Фильм"
            className="searchform__text"
            required
            value={findedMovie}
            onChange={handleSearchMovie}
          />
          <button type="submit" className="searchform__formbutton">
            Поиск
          </button>
        </form>
      </Route>
      <Route exact path="/saved-movies">
        <form className="searchform__form" onSubmit={handleSaveSubmit}>
          <input type="text" name="name" id="name"
            placeholder="Фильм"
            className="searchform__text"
            required
            value={findedSavedMovie}
            onChange={handleSearchMovie}
          />
          <button type="submit" className="searchform__formbutton">
            Поиск
          </button>
        </form>
      </Route>
      <FilterCheckbox
        onFilter={props.onFilter}
        isShortMovie={props.isShortMovie} />
    </section >
  );
}

export default SearchForm;