import React from "react";
import "./Register.css";
import "../Form/Form.css"
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Register(props) {
    return (
        <>
            <main className="register">
                <Link to="/" className="register__link">
                    <img src={logo} alt="Логотип Movies-explorer" className="form__logo" />
                </Link>
                <h2 className="form__title">
                    Добро пожаловать!
                </h2>
                <form className="form" id="register">
                    <div className="form__input-container">
                        <p className="form__name">
                            Имя
                        </p>
                        <input className="form__input" placeholder="Сергей"></input>
                        <span className="form__input-error" id="fullname-error"></span>
                    </div>
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
                        <input className="form__input" placeholder="••••••••••••••"></input>
                        <span className="form__input-error" id="password-error">Что-то пошло не так...</span>
                    </div>
                    <button className="form__button">
                        Зарегистрироваться
                    </button>
                </form>
                <div className="form__container">
                    <p className="form__text">
                        Уже зарегистрированы?
                    </p>
                    <Link
                        to="/signin"
                        className="form__link">
                        Войти
                    </Link>
                </div>
            </main>
        </>
    );
}

export default Register;