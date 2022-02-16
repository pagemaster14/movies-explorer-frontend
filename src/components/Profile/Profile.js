import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

function Profile(props) {
    return (
        <>
            <Header />
            <main className="profile">
                <h2 className="profile__title">
                    Привет, Сергей!
                </h2>
                <form className="profile__form" id="profile">
                    <div className="profile__input-container">
                        <p className="profile__formname">
                            Имя
                        </p>
                        <input className="profile__input" placeholder="Сергей"></input>
                        <span className="form__input-error" id="fullname-error"></span>
                    </div>
                    <div className="profile__input-container">
                        <p className="profile__formname">
                            E-mail
                        </p>
                        <input className="profile__input" placeholder="pochta@yandex.ru"></input>
                        <span className="form__input-error" id="email-error"></span>
                    </div>
                    <button className="profile__button">
                        Редактировать
                    </button>
                </form>
                <Link
                    to="/signin"
                    className="profile__exit">
                    Выйти из аккаунта
                </Link>
            </main>
        </>
    );
}

export default Profile;