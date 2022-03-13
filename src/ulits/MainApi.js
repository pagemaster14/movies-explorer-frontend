import options from "./config.js";

class MainApi {
    constructor(options) {
        this._url = options.baseApiUrl;
        this._imgUrl = options.baseImgUrl;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo(jwt) {
        return fetch(`${this._url}/users/me`, {
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`,
            },
        })
            .then(this._checkResponse)
    }

    updateUserInfo({ newUserInfo, jwt }) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                name: newUserInfo.name,
                email: newUserInfo.email
            })
        })
            .then(this._checkResponse)
    }

    register(name, email, password) {
        return fetch(`${this._url}/signup`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name, email, password
            })
        })
            .then(this._checkResponse)
    }

    authorize(email, password) {
        return fetch(`${this._url}/signin`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({ email, password }),
        })
            .then(this._checkResponse)
            .then((data) => {
                localStorage.setItem("jwt", data.token);
                return data;
            })
    }

    getSavedMovies(jwt) {
        return fetch(`${this._url}/movies`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${jwt}`,
            },
        })
            .then(this._checkResponse)
    }

    saveMovie({movie, jwt}) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${jwt}`,
              },
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `${this._imgUrl}${movie.image.url}`,
                trailer: movie.trailerLink,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                thumbnail: `${this._imgUrl}${movie.image.formats.thumbnail.url}`,
                movieId: movie.id,
            })
        })
            .then(this._checkResponse)
    }

    deleteMovie({movie, jwt}) {
        return fetch(`${this._url}/movies/${movie._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${jwt}`,
              },
        })
            .then(this._checkResponse)
    }
}

const mainApi = new MainApi(options);
export default mainApi;