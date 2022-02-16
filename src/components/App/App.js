import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import MenuPopup from "../MenuPopup/MenuPopup";

function App() {

  return (
    <div className="page">
      <Switch>
        <Route
          exact
          path="/"
          component={Main}
        />
        <Route
          exact
          path="/movies"
          component={Movies}
        />
        <Route
          exact
          path="/saved-movies"
          component={SavedMovies}
        />
        <Route
          exact
          path="/profile"
          component={Profile}
        />
        <Route
          exact
          path="/signup"
          component={Register}
        />
        <Route
          exact
          path="/signin"
          component={Login}
        />
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
      <MenuPopup/>
    </div>

  );
}

export default withRouter(App);