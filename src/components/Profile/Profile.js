import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useForm"

function Profile(props) {
    const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
    const currentUser = React.useContext(CurrentUserContext);

    const isDisabled = !isValid || props.isSending;
    const submitButtonClassName = `profile__button ${isDisabled && "profile__button_inactive"
        }`;

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser(values);
    }

    React.useEffect(() => {
        if (currentUser) {
            resetForm(currentUser, {}, false);
        }
    }, [currentUser, resetForm]);

    return (
        <>
            <Header />
            <main className="profile">
                <h2 className="profile__title" >
                    {`Привет, ${currentUser.name}`}
                </h2>
                <form className="profile__form" id="profile" onSubmit={handleSubmit} noValidate>
                    <div className="profile__input-container">
                        <p className="profile__formname">
                            Имя
                        </p>
                        <input type="text" name="name" id="name"
                            className={`profile__input ${errors.name && "profile__input_invalid"
                                }`} placeholder="Сергей" required
                            pattern="^[а-яА-ЯёЁa-zA-Z -]+$"
                            minLength="2"
                            maxLength="40"
                            value={values.name || ''} onChange={handleChange}></input>
                        <span className="profile__input-error" id="fullname-error">{errors.name || ''}</span>
                    </div>
                    <div className="profile__input-container">
                        <p className="profile__formname">
                            E-mail
                        </p>
                        <input type="text"
                            name="email"
                            id="email" className={`profile__input ${errors.email && "profile__input_invalid"
                                }`}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            placeholder="pochta@yandex.ru" required minLength="2"
                            maxLength="200"
                            value={values.email || ''} onChange={handleChange}></input>
                        <span className="profile__input-error" id="email-error">{errors.email || ''}</span>
                    </div>
                    <span
                        className="form__api-response"
                    >{props.requestStatus}{props.getDataRequestStatus}</span>
                    <button className={submitButtonClassName} disabled={isDisabled}>
                        Редактировать
                    </button>
                </form>
                <Link
                    to="/"
                    className="profile__exit" onClick={props.signOut}>
                    Выйти из аккаунта
                </Link>
            </main>
        </>
    );
}

export default Profile;