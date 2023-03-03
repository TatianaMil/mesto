export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //проверка ответа с сервера
  _handleResponse(res) {
    if (res.ok) {
      return Promise.resolve(res.json());
    }

    //  отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //редактирование профиля
  async editProfileUserApi(data) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return this._handleResponse(response);
  }

  // загрузка информации о пользователе с сервера
  async getRealUserInfo() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return this._handleResponse(response);
  }

  //загрузка карточек с сервера
  async getInitialCards() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
    return this._handleResponse(response);
  }

  //добавление новой карточки с сервера
  async createNewCardApi(data) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return this._handleResponse(response);
  }

  //удаление карточки
  async removeCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._handleResponse(response);
  }

  //ставим лайк
  async addLike(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    return this._handleResponse(response);
  }

  // постановка и снятие лайка с карточки
  async removeLike(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._handleResponse(response);
  }

  //обновление аватара
  async updateProfileUserAvatar(data) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
    return this._handleResponse(response);
  }
};
