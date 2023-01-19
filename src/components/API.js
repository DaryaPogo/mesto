import { data } from "autoprefixer";

export class API {
  constructor(сonfig) {
    this.headers = сonfig.headers;
    this.baseUrl = сonfig.baseUrl;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  editProfile(item) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: item.name,
        about: item.job,
      }),
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  addNewCard(inputList) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: inputList.place,
        link: inputList.link,
      }),
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  cardLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  cardDeleteLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  changeAvatar(user) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: user.avatar,
      }),
    }).then((res) => {
      return this._getResponse(res);
    });
  }
}
