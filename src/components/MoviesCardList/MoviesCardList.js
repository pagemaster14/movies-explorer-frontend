import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    return (
<section className="moviescardlist">
    <div className="moviescardlist_container">
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
    </div>
</section>
    );
  }
  
export default MoviesCardList;