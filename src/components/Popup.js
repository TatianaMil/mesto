export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector); //селектор попапа, находит попап
    this._popupCloseButton = this._popup.querySelector('.popup__button-close') //находим кнопку закрытия попапа
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //открытие попапа
  open() {
    this.setEventListeners()
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
    //проверяем нажатие esc
    if (evt.key === 'Escape') {
      this.close(); //закрываем по нажатию на esc
    }
  };

  setEventListeners() {
    //добавляет слушатель клика иконке закрытия попапа
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });
    //закрытие при клике на затемнённую область вокруг формы
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      };
    });
  };
};
