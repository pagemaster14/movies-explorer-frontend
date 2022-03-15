import React from "react";
import "./Register.css";
import "../Form/Form.css"
import { Link, withRouter } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormWithValidation } from "../../hooks/useForm";

function Register({ handleRegister, isSending, requestStatus }) {
    const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
    const isDisabled = !isValid || isSending;

    const submitButtonClassName = `form__button ${isDisabled && "form__button_inactive"
        }`;

    function handleSubmit(e) {
        e.preventDefault();
        handleRegister(values)
    }

    React.useEffect(() => {
        resetForm({}, {}, false);
    }, [resetForm]);

    return (
        <>
            <main className="register">
                <Link to="/" className="register__link">
                    <img src={logo} alt="Логотип Movies-explorer" className="form__logo" />
                </Link>
                <h2 className="form__title">
                    Добро пожаловать!
                </h2>
                <form className="form" id="register" onSubmit={handleSubmit} noValidate>
                    <div className="form__input-container">
                        <p className="form__name">
                            Имя
                        </p>
                        <input className={`form__input ${errors.name && "form__input_invalid"
                            }`} placeholder="Сергей" name="name"
                            type="name" value={values.name || ''}
                            pattern="^[а-яА-ЯёЁa-zA-Z -]+$"
                            required
                            minLength="2"
                            maxLength="40"
                            onChange={handleChange}></input>
                        <span className="form__input-error" id="fullname-error">{errors.name || ''}</span>
                    </div>
                    <div className="form__input-container">
                        <p className="form__name">
                            E-mail
                        </p>
                        <input name="email"
                            type="email" className={`form__input ${errors.email && "form__input_invalid"
                                }`}
                            placeholder="pochta@yandex.ru" value={values.email || ''}
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            onChange={handleChange}></input>
                        <span className="form__input-error" id="email-error">{errors.email || ''}</span>
                    </div>
                    <div className="form__input-container">
                        <p className="form__name">
                            Пароль
                        </p>
                        <input name="password"
                            type="password" className={`form__input ${errors.password && "form__input_invalid"
                                }`}
                            placeholder="••••••••••••••" value={values.password || ''}
                            minLength="8"
                            required
                            onChange={handleChange}></input>
                        <span className="form__input-error" id="password-error">{errors.password || ''}</span>
                    </div>
                    <span
                        className="form__api-response"
                    >{requestStatus}</span>
                    <button type="submit" className={submitButtonClassName} disabled={isDisabled}>
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

export default withRouter(Register);