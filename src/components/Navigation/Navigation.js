import React from "react";
import logo from "../../images/logo.svg";
import { Route, Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import MenuPopup from "../MenuPopup/MenuPopup";

function Navigation(props) {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  function handlePopupOpen() {
    setIsPopupOpen(true);
  }

  function handlePopupClose() {
    setIsPopupOpen(false);
  }

  const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget && isPopupOpen) {
      handlePopupClose();
    }
  };

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        handlePopupClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  const jwt = localStorage.getItem('jwt');

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
          onClick={handlePopupOpen}
        ></button>
        <div className="navigation-nav__info">
          <NavLink to="/movies" className="navigation-nav__link" activeClassName="navigation-nav__link_active">
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className="navigation-nav__link">
            Сохранённые фильмы
          </NavLink>
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
          onClick={handlePopupOpen}
        ></button>
        <div className="navigation-nav__info">
          <NavLink to="/movies" className="navigation-nav__link">
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className="navigation-nav__link" activeClassName="navigation-nav__link_active">
            Сохранённые фильмы
          </NavLink>
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
          onClick={handlePopupOpen}
        ></button>
        <div className="navigation-nav__info">
          <NavLink to="/movies" className="navigation-nav__link">
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className="navigation-nav__link">
            Сохранённые фильмы
          </NavLink>
          <Link to="/profile" className="navigation-nav__link">
          </Link>
        </div>
      </Route>
      <Route exact path="/">
        <img src={logo} alt="Логотип Movies-explorer" className="navigation__logo" />
        {jwt ? (
          <>
            <button
              type="button"
              arialabel="Open"
              className="navigation__button"
              onClick={handlePopupOpen}
            ></button>
            <div className="navigation-nav__info">
              <NavLink to="/movies" className="navigation-nav__link">
                Фильмы
              </NavLink>
              <NavLink to="/saved-movies" className="navigation-nav__link">
                Сохранённые фильмы
              </NavLink>
              <Link to="/profile" className="navigation-nav__link">
              </Link>
            </div>
          </>
        ) : (
          <div className="navigation__info">
            <Link to="/signup" className="navigation__link">
              Регистрация
            </Link>
            <Link to="/signin" className="navigation__link">
              Войти
            </Link>
          </div>
        )}
      </Route>
      <MenuPopup isPopupOpen={isPopupOpen} handlePopupClose={handlePopupClose}
        handleOverlayClose={handleOverlayClose} />
    </section>

  );
}

export default Navigation;