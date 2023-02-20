export class UserInfo {
  constructor({titleElement, infoElement}) {
  this._titleElement = document.querySelector(titleElement); //элемент имени пользователя
  this._infoElement = document.querySelector(infoElement); //элемент информации о себе
  };

  //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
      title: this._titleElement.textContent,
      info: this._infoElement.textContent
    };
  };

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(title, info) {
    this._titleElement.textContent = title; //добавляет имя
    this._infoElement.textContent = info; // добавляет информацию о себе
  };
};
