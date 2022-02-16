import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
    return (
<section className="searchform">
<form className="searchform__form">
    <input type="text" name="name" id="name"
        placeholder="Фильм"
        className="searchform__text"
        required minLength="2"
        maxLength="40"/>
    <button type="submit" className="searchform__formbutton">
        Поиск
    </button>
</form>
<FilterCheckbox/>
</section>
    );
  }
  
export default SearchForm;