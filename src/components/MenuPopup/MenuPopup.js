import React from "react";
import { Link } from "react-router-dom";
import "./MenuPopup.css";

function MenuPopup(props) {
    return (
        <div className={`menupopup ${props.isPopupOpen ? "menupopup_opened" : ""}`} onMouseDown={props.handleOverlayClose}>
            <div className="menupopup__container">
                <button
                    type="button"
                    arialabel="Close"
                    className="menupopup__close"
                    onClick={props.handlePopupClose}
                ></button>
                <div className="menupopup__info">
                    <Link to="/" className="menupopup__link">
                        Главная
                    </Link>
                    <Link to="/movies" className="menupopup__link">
                        Фильмы
                    </Link>
                    <Link to="/saved-movies" className="menupopup__link">
                        Сохранённые фильмы
                    </Link>
                    <Link to="/profile" className="menupopup__link">
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MenuPopup;