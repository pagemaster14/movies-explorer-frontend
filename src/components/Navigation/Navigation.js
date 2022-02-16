import logo from "../../images/logo.svg";
import { Route, Link } from "react-router-dom";
import "./Navigation.css";

function Navigation(props) {
  return (
    <section className="navigation">
      <Route exact path="/movies">
        <Link to="/">
          <img src={logo} alt="Логотип Movies-explorer" className="navigation__logo" />
        </Link>
        <button
          type="button"
          arialabel="Open"
          className="navigation__button"
        ></button>
        <div className="navigation-nav__info">
          <Link to="/movies" className="navigation-nav__link">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="navigation-nav__link">
            Сохранённые фильмы
          </Link>
          <Link to="/profile" className="navigation-nav__link">
          </Link>
        </div>
      </Route>
      <Route exact path="/saved-movies">
        <Link to="/">
          <img src={logo} alt="Логотип Movies-explorer" className="navigation__logo" />
        </Link>
        <button
          type="button"
          arialabel="Open"
          className="navigation__button"
        ></button>
        <div className="navigation-nav__info">
          <Link to="/movies" className="navigation-nav__link">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="navigation-nav__link">
            Сохранённые фильмы
          </Link>
          <Link to="/profile" className="navigation-nav__link">
          </Link>
        </div>
      </Route>
      <Route exact path="/profile">
        <Link to="/">
          <img src={logo} alt="Логотип Movies-explorer" className="navigation__logo" />
        </Link>
        <button
          type="button"
          arialabel="Open"
          className="navigation__button"
        ></button>
        <div className="navigation-nav__info">
          <Link to="/movies" className="navigation-nav__link">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="navigation-nav__link">
            Сохранённые фильмы
          </Link>
          <Link to="/profile" className="navigation-nav__link">
          </Link>
        </div>
      </Route>
      <Route exact path="/">
        <img src={logo} alt="Логотип Movies-explorer" className="navigation__logo" />
        <div className="navigation__info">
          <Link to="/signup" className="navigation__link">
            Регистрация
          </Link>
          <Link to="/signin" className="navigation__link">
            Войти
          </Link>
        </div>
      </Route>
    </section>
  );
}

export default Navigation;