import { Popup } from './Popup';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector); //селектор попапа
    this._callbackSubmit = callbackSubmit; //колбэк сабмита формы
    this._form = this._popup.querySelector('.popup__form'); //находим форму
    this._inputElements = this._form.querySelectorAll('.popup__input');
  };

  //_getInputValues собирает данные всех полей формы
  _getInputValues() {
    const values = {};
    this._inputElements.forEach((input) => {
      values[input.name] = input.value
    });
    return values;
  };

  //Перезаписывает родительский метод. Добавляет обработчик клика иконке закрытия и обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmit(this._getInputValues());
    });
  };

  //перезаписываем родительский метод close для сброса формы
  close() {
    super.close();
    this._form.reset();
  };
};
