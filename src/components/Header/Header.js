import logo from "../../images/logo.svg";
import { Route, Link } from "react-router-dom";
import "./Header.css";

function Header(props) {
  return (
    <header className="header">
      <Route exact path="/movies">
        <Link to="/">
          <img src={logo} alt="Логотип Movies-explorer" className="header__logo" />
        </Link>
        <button
          type="button"
          arialabel="Open"
          className="header__button"
        ></button>
        <div className="header-nav__info">
          <Link to="/movies" className="header-nav__link">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="header-nav__link">
            Сохранённые фильмы
          </Link>
          <Link to="/profile" className="header-nav__link">
          </Link>
        </div>
      </Route>
      <Route exact path="/saved-movies">
        <Link to="/">
          <img src={logo} alt="Логотип Movies-explorer" className="header__logo" />
        </Link>
        <button
          type="button"
          arialabel="Open"
          className="header__button"
        ></button>
        <div className="header-nav__info">
          <Link to="/movies" className="header-nav__link">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="header-nav__link">
            Сохранённые фильмы
          </Link>
          <Link to="/profile" className="header-nav__link">
          </Link>
        </div>
      </Route>
      <Route exact path="/profile">
        <Link to="/">
          <img src={logo} alt="Логотип Movies-explorer" className="header__logo" />
        </Link>
        <button
          type="button"
          arialabel="Open"
          className="header__button"
        ></button>
        <div className="header-nav__info">
          <Link to="/movies" className="header-nav__link">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="header-nav__link">
            Сохранённые фильмы
          </Link>
          <Link to="/profile" className="header-nav__link">
          </Link>
        </div>
      </Route>
      <Route exact path="/">
        <img src={logo} alt="Логотип Movies-explorer" className="header__logo" />
        <div className="header__info">
          <Link to="/signup" className="header__link">
            Регистрация
          </Link>
          <Link to="/signin" className="header__link">
            Войти
          </Link>
        </div>
      </Route>
    </header>
  );
}

export default Header;