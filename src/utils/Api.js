export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // //проверка ответа с сервера
  _handleResponse(res) {
    if (res.ok) {
      return Promise.resolve(res.json());
    }

    // Если есть ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
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
  async addNewCard(data) {
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

  //редактирование профиля
  async editProfileUserInfo(data) {
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
}



// export default class Api {
//   constructor(config) {
//     this._baseUrl = config.baseUrl;
//     this._headers = config.headers
//   }


//   //Cards//

//   //загрузка массива карточек с сервера
//   async getCardList() {
//     return fetch(`${this._baseUrl}/cards`, {
//       method: 'GET',
//       headers: this._headers,
//     })
//     .then(res => this._handleResponse(res));
//   }

//   //Добавление новой карточки на сервер
//   async addNewCardApi({name, link}) {
//     return fetch(`${this._baseUrl}/cards`, {
//       method: 'POST',
//       headers: this._headers,
//       body: JSON.stringify({
//         name,
//         link
//       })
//     })
//     .then(res => this._handleResponse(res));
//   }

//   //Удаление карточки c сервера
//   async deleteCardApi(cardId) {
//     return fetch(`${this._baseUrl}/cards/${cardId}`, {
//       method: 'DELETE',
//       headers: this._headers
//     })
//     .then(res => this._handleResponse(res));
//   }

// //profile//

//   //загрузка информации о пользователе с сервера
//   async getUserInfoApi() {
//     return fetch(`${this._baseUrl}/users/me`, {
//       method: 'GET',
//       headers: this._headers,
//     })
//     .then(res => this._handleResponse(res));
//   }

//   //Редактирование профиля
//   async setUserInfoApi({name, info}) {
//     return fetch(`${this._baseUrl}/users/me`, {
//       method: 'PATCH',
//       headers: this._headers,
//       body: JSON.stringify({
//         name,
//         about: info
//       })
//     })
//     .then(res => this._handleResponse(res));
//   }

//   //Редактирование аватара пользователя
//   changedAvatarApi(data) {
//     return fetch(`${this._baseUrl}/users/me/avatar`, {
//       method: 'PATCH',
//       headers: this._headers,
//       body: JSON.stringify({
//         avatar: data
//       })
//     })
//     .then(res => this._handleResponse(res));
//   }

//   //likes//

//   //Постановка лайков
//   async putLike(cardId) {
//     return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
//       method: 'PUT',
//       headers: this._headers
//     })
//     .then(res => this._handleResponse(res))
//   }

//   //снять лайк
//   deleteLike(cardId) {
//     return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
//       method: 'DELETE',
//       headers: this._headers
//     })
//     .then(res => this._handleResponse(res))
//   }
// }
