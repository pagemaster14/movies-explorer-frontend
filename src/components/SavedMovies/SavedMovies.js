import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies(props) {
  return (
    <>
      <Header />
      <main className="savedmovies">
      <SearchForm />
      <MoviesCardList />
      <div className="savedmovies__devider">
      </div>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;