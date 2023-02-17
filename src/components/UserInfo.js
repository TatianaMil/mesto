export class UserInfo {
  constructor({nameElement, infoElement}) {
  this._nameElement = document.querySelector(nameElement); //элемент имени пользователя
  this._infoElement = document.querySelector(infoElement); //элемент информации о себе
  };

  //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
      nameElement: this._nameElement.textContent,
      infoElement: this._infoElement.textContent
    };
  };

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(nameElement, infoElement) {
    this._nameElement.textContent = nameElement; //добавляет имя
    this._infoElement.textContent = infoElement; // добавляет информацию о себе
  };
};
