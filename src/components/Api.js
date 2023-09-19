export class Api {
  constructor(config) {
    this._config = config;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка при выполнении запроса: ${res.status}`);
  }

  getPersonalInfo() {
    return fetch(`${this._config.url}/users/me`, {
      method: "GET",
      headers: this._config.headers
    }).then(this._checkResponse);
  }

  updatePersonalInfo(name, about) {
    return fetch(`${this._config.url}/users/me`, {
      method: "PATCH",
      headers: this._config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._checkResponse);
  }

  updateAvatar(url) {
    return fetch(`${this._config.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._config.headers,
      body: JSON.stringify({
        avatar: url
      })
    }).then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._config.url}/cards`, {
      method: "GET",
      headers: this._config.headers
    }).then(this._checkResponse);
  }

  postNewCard(name, link) {
    return fetch(`${this._config.url}/cards`, {
      method: "POST",
      headers: this._config.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._config.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._config.headers
    }).then(this._checkResponse);
  }

  putLikeOnCard(cardId) {
    return fetch(`${this._config.url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._config.headers
    }).then(this._checkResponse);
  }

  deleteLikeOnCard(cardId) {
    return fetch(`${this._config.url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._config.headers
    }).then(this._checkResponse);
  }
}
