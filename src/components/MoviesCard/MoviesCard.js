import "./MoviesCard.css";
import image from "../../images/pic__COLOR_pic.svg";

function MoviesCard(props) {
    return (
        <article className="moviescard">
            <h2 className="moviescard__name" >В погоне за Бенкси</h2>
            <p className="moviescard__duration">27 минут</p>
            <img src={image} alt="Постер кинофильма" className="moviescard__image"/>
            <button type="button"
                arialabel="Save"
                className="moviescard__button">
                    Сохранить
            </button>
        </article>
    )
}

export default MoviesCard;