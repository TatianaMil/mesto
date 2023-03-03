import { Popup } from './Popup';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector); //наследуем класс попапа
    this._callbackSubmit = callbackSubmit; //колбэк сабмита формы

    this._form = this._popup.querySelector('.popup__form'); //находим форму
    this._inputElements = this._form.querySelectorAll('.popup__input'); //находим поля импутов
    this._button = this._form.querySelector('.popup__button-submit'); //находим кномку сохранения попапа
  }

  setEventListeners() {
    super.setEventListeners()  // <=== вот это запускает родительские обработчики
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      const replacementText = event.submitter.textContent;
      // Смена текста кнопки при сохранение данных
      event.submitter.textContent = "Сохранение...";
      this._callbackSubmit(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          event.submitter.textContent = replacementText;
        });
    });
  }

  //_getInputValues собирает данные всех полей формы
  _getInputValues() {
    const values = {}; //создаем пустой объект
    //добавляем значение всех полей
    this._inputElements.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setInputValue(data) {
    this._inputElements.forEach((input) => {
      input.value = data[input.name];
    });
  }

  //перезаписываем родительский метод close для сброса формы
  close() {
    super.close();
    this._form.reset();
  }
}
