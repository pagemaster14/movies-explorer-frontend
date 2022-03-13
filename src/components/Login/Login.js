import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import "../Form/Form.css"
import logo from "../../images/logo.svg";
import { useFormWithValidation } from "../../hooks/useForm"

function Login({ handleLogin, isSending, requestStatus}) {
    const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
    const isDisabled = !isValid || isSending;
    const submitButtonClassName = `form__button ${
        isDisabled && "form__button_inactive"
      }`;

    function handleSubmit(evt) {
        evt.preventDefault();
        handleLogin(values);
    }

    React.useEffect(() => {
        resetForm({}, {}, false);
      }, [resetForm]);

    return (
        <>
            <main className="login">
                <Link to="/" className="login__link">
                    <img src={logo} alt="Логотип Movies-explorer" className="form__logo" />
                </Link>
                <h2 className="form__title">
                    Рады видеть!
                </h2>
                <form className="form" id="login" onSubmit={handleSubmit}
                noValidate>
                    <div className="form__input-container">
                        <p className="form__name">
                            E-mail
                        </p>
                        <input id="email"
                            value={values.email || ''}
                            name="email"
                            type="email" className={`form__input ${
                                errors.email && "form__input_invalid"
                              }`} placeholder="pochta@yandex.ru"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            required
                            onChange={handleChange}></input>
                        <span className="form__input-error" id="email-error">{errors.email || ''}</span>
                    </div>
                    <div className="form__input-container">
                        <p className="form__name">
                            Пароль
                        </p>
                        <input id="password"
                            value={values.password || ''}
                            name="password"
                            minLength="8"
                            type="password" className={`form__input ${
                                errors.password && "form__input_invalid"
                              }`}
                            required
                            onChange={handleChange}></input>
                        <span className="form__input-error" id="fullname-error">{errors.password || ''}</span>
                    </div>
                    <span
            className="form__api-response"
          >{requestStatus}</span>
                    <button type="submit" className={submitButtonClassName} disabled={isDisabled}>
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
            </main>
        </>
    );
}

export default Login;