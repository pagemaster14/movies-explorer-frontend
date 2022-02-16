import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import "../Form/Form.css"
import logo from "../../images/logo.svg";

function Login(props) {
    return (
        <>
            <section className="login">
                <Link to="/" className="login__link">
                    <img src={logo} alt="Логотип Movies-explorer" className="form__logo" />
                </Link>
                <h2 className="form__title">
                    Рады видеть!
                </h2>
                <form className="form" id="login">
                    <div className="form__input-container">
                        <p className="form__name">
                            E-mail
                        </p>
                        <input className="form__input" placeholder="pochta@yandex.ru"></input>
                        <span className="form__input-error" id="email-error"></span>
                    </div>
                    <div className="form__input-container">
                        <p className="form__name">
                            Пароль
                        </p>
                        <input className="form__input"></input>
                        <span className="form__input-error" id="fullname-error"></span>
                    </div>
                    <button className="form__button">
                        Войти
                    </button>
                </form>
                <div className="form__container">
                    <p className="form__text">
                        Ещё не зарегистрированы?
                    </p>
                    <Link
                        to="/signup"
                        className="form__link">
                        Регистрация
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Login;