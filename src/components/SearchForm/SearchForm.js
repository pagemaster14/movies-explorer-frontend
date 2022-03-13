import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
  const [findedMovie, setFindedMovie] = React.useState('');

  function handleSearchMovie(e) {
    const input = document.getElementById('name');
    input.setCustomValidity('');
    setFindedMovie(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSearch(findedMovie);
  }

  React.useEffect(() => {
    if (!findedMovie) {
      const input = document.getElementById('name');
      input.setCustomValidity('Нужно ввести ключевое слово');
    }
  }, [findedMovie]);

  return (
    <section className="searchform">
      <form className="searchform__form" onSubmit={handleSubmit}>
        <input type="text" name="name" id="name"
          placeholder="Фильм"
          className="searchform__text"
          required minLength="2"
          maxLength="40"
          value={findedMovie}
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