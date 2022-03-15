import options from "./config.js";

class MoviesApi {
    constructor(options) {
        this._url = options.baseMoviesUrl
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialMovies() {
        return fetch(`${this._url}`, {
            headers: this._headers,
        })
            .then(this._checkResponse)

    }
}

const api = new MoviesApi(options);
export default api;

