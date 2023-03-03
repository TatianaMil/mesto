export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector); //селектор попапа, находит попап
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //открытие попапа
  open() {
    // this.setEventListeners()
    this._popup.classList.add('popup_opened'); //добавляем открытие попапа
    document.addEventListener('keydown', this._handleEscClose);
  };

  //закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened'); //удаляем открытие попапа
    document.removeEventListener('keydown', this._handleEscClose);
  };

  //логика закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const isNotCombinedKey = !(evt.ctrlKey || evt.altKey || evt.shiftKey);
      if (isNotCombinedKey && this._popup.classList.contains("popup_opened")) {
        this.close();
      }
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("popup__button-close")) {
        this.close();
      }
      // Модальное окно также закрывается при клике
      // на затемнённую область вокруг формы.
      if (e.target.classList.contains("popup_opened")) {
        this.close();
      }
    });
  }
};
