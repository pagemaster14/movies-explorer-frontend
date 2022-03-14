import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {

  function handleSearchMovie(e) {
    const input = document.getElementById('name');
    input.setCustomValidity('');
    props.setFindedMovie(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSearch(props.findedMovie);
    localStorage.setItem('lastSearchName', JSON.stringify(props.findedMovie));
  }

  React.useEffect(() => {
    if (!props.findedMovie) {
      const input = document.getElementById('name');
      input.setCustomValidity('Нужно ввести ключевое слово');
    }
  }, [props.findedMovie]);

  return (
    <section className="searchform">
      <form className="searchform__form" onSubmit={handleSubmit}>
        <input type="text" name="name" id="name"
          placeholder="Фильм"
          className="searchform__text"
          required
          value={props.findedMovie}
          onChange={handleSearchMovie}
        />
        <button type="submit" className="searchform__formbutton">
          Поиск
        </button>
      </form>
      <FilterCheckbox
        onFilter={props.onFilter}
        isShortMovie={props.isShortMovie} />
    </section>
  );
}

export default SearchForm;