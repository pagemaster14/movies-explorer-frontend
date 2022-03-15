import React from "react";
import { Route, Switch, withRouter, useHistory, Redirect } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import mainApi from "../../ulits/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setState] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [isRegisterDataSending, setIsRegisterDataSending] = React.useState(false);
  const [isLoginDataSending, setIsLoginDataSending] = React.useState(false);
  const [isProfileDataSending, setIsProfileDataSending] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const history = useHistory();

  const [getDataRequestStatus, setGetDataRequestStatus] = React.useState([]);
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getUserInfo(jwt)
        .then((res) => {
          if (res) {
            setState(true);
          }
        })
        .catch(err => {
          if (err === 'Ошибка: 404') {
            setGetDataRequestStatus(['Нет пользователя с таким id']
            );
          } else {
            setGetDataRequestStatus(['При загрузке данных пользователя произошла ошибка']
            );
          }
        })
    }
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      const jwt = localStorage.getItem('jwt');
      mainApi.getUserInfo(jwt)
        .then((currentUser) => {
          setCurrentUser(currentUser);
        })
        .catch(err => {
          if (err === 'Ошибка: 404') {
            setGetDataRequestStatus(['Нет пользователя с таким id']
            );
          } else {
            setGetDataRequestStatus(['При загрузке данных пользователя произошла ошибка']
            );
          }
        })
    }
  }, [loggedIn])

  const [profileRequestStatus, setProfileRequestStatus] = React.useState([]);
  function handleUpdateUser(newUserInfo) {
    setProfileRequestStatus([]);
    setIsProfileDataSending(true);
    const jwt = localStorage.getItem('jwt');
    mainApi
      .updateUserInfo({ newUserInfo, jwt })
      .then((res) => {
        setCurrentUser(res);
        setProfileRequestStatus(['Профиль обновлён']
        );
      })
      .catch(err => {
        if (err === 'Ошибка: 409') {
          setProfileRequestStatus(['Пользователь с данной почтой уже зарегистрирован']
          );
        } else {
          setProfileRequestStatus(['При обновлении профиля произошла ошибка']
          );
        }
      })
      .finally(() => {
        setIsProfileDataSending(false);
      })
  }

  const [registerRequestStatus, setRegisterRequestStatus] = React.useState([]);
  function handleRegister({ name, email, password }) {
    setRegisterRequestStatus([]);
    setIsRegisterDataSending(true);
    mainApi.register(name, email, password)
      .then(() => {
        handleLogin({
          email: email,
          password: password,
        });
      })
      .catch(err => {
        if (err === 'Ошибка: 409') {
          setRegisterRequestStatus(['Пользователь с данной почтой уже зарегистрирован']);
        } else {
          setRegisterRequestStatus(['При регистрации пользователя произошла ошибка']);
        }
      })
      .finally(() => {
        setIsRegisterDataSending(false);
      })
  }

  const [loginRequestStatus, setLoginRequestStatus] = React.useState([]);
  function handleLogin({ email, password }) {
    setLoginRequestStatus([]);
    setIsLoginDataSending(true);
    mainApi.authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setState({
          loggedIn: true,
        })
        setUserName(userName)
        history.push('/movies');
      })
      .catch(err => {
        if (err === 'Ошибка: 401') {
          setLoginRequestStatus(['Вы ввели неправильный логин, или пароль']);
        } else if (err === 'Ошибка: 400') {
          setLoginRequestStatus(['При авторизации произошла ошибка. Переданный токен некорректен']);
        } else {
          setLoginRequestStatus(['При авторизации произошла ошибка']);
        }
      })
      .finally(() => {
        setIsLoginDataSending(false);
      })
  }

  function signOut() {
    setState(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("initialMovies");
    localStorage.removeItem("lastSearch");
    localStorage.removeItem("lastSearchName");
    localStorage.removeItem("lastCheckBoxState");
    history.push('/');
  }

  const [saveMovieRequestStatus, setSaveMovieRequestStatus] = React.useState([]);
  function handleSaveMovie(movie) {
    setSaveMovieRequestStatus([]);
    const jwt = localStorage.getItem('jwt');
    mainApi.saveMovie({ movie, jwt })
      .then((addSavedMovie) => {
        setSavedMovies((movies) => [
          addSavedMovie,
          ...movies
        ]);
      })
      .catch(err => {
        if (err === 'Ошибка: 400') {
          setSaveMovieRequestStatus(['Карточка с фильмом содержит невалидные данные']);
        } else {
          setSaveMovieRequestStatus(['Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз']);
        }
      })
  }

  const [deleteMovieRequestStatus, setDeleteMovieRequestStatus] = React.useState([]);
  function handleDeleteMovie(movie) {
    const jwt = localStorage.getItem('jwt');
    mainApi.deleteMovie({ movie, jwt })
      .then(() => {
        setSavedMovies((movies) => movies.filter((m) => m._id !== movie._id));
      })
      .catch(err => {
        if (err === 'Ошибка: 404') {
          setDeleteMovieRequestStatus(['Фильм с указанным _id не найден']);
        } else if (err === 'Ошибка: 403') {
          setDeleteMovieRequestStatus(['Недостаточно прав для удаления']);
        } else {
          setDeleteMovieRequestStatus(['Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз']);
        }
      })
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getSavedMovies(jwt)
        .then((data) => {
          setSavedMovies(data.filter((i) => i.owner._id === currentUser._id));
        })
        .catch(err => {
          if (err) {
            setGetDataRequestStatus(['При загрузке данных пользователя произошла ошибка']);
          }
        })
    }
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route
            exact
            path="/"
            component={Main}
            getDataRequestStatus={getDataRequestStatus}
          />
          <ProtectedRoute
            exact
            path="/movies"
            component={Movies}
            savedMovies={savedMovies}
            onMovieSave={handleSaveMovie}
            onMovieDelete={handleDeleteMovie}
            saveMovieRequestStatus={saveMovieRequestStatus}
            setSaveMovieRequestStatus={setSaveMovieRequestStatus}
            deleteMovieRequestStatus={deleteMovieRequestStatus}
            getDataRequestStatus={getDataRequestStatus}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            component={SavedMovies}
            savedMovies={savedMovies}
            onMovieDelete={handleDeleteMovie}
            deleteMovieRequestStatus={deleteMovieRequestStatus}
            getDataRequestStatus={getDataRequestStatus}
          />
          <ProtectedRoute exact path="/profile"
            component={Profile} signOut={signOut}
            onUpdateUser={handleUpdateUser}
            requestStatus={profileRequestStatus}
            setProfileRequestStatus={setProfileRequestStatus}
            isSending={isProfileDataSending} getDataRequestStatus={getDataRequestStatus} />
          <Route path="/signup">
            {loggedIn ? <Redirect to="/" /> :
              <Register handleRegister={handleRegister} requestStatus={registerRequestStatus} isSending={isRegisterDataSending} />
            }
          </Route>
          <Route path="/signin">
            {loggedIn ? <Redirect to="/" /> :
              <Login handleLogin={handleLogin} requestStatus={loginRequestStatus} isSending={isLoginDataSending} />
            }
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);