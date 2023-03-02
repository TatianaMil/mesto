export class FormValidator {
  constructor(validationConfig, form) {
    this._form = form;
    //классы
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;

    this._inputElement = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._submitButtonSelector);
  };

  // show an error
  _showInputError = (input, textError) => {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = textError;
    errorElement.classList.add(this._errorClass);
  };

  //hide an error
  _hideInputError = (input) => {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  };

  //проверяем валидность
  _checkInputValidity = (input) => {
    if(!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    };
  };

  //проходимся по всем инпутам и проверяем их валидность
  _hasInvalidInput() {
    return this._inputElement.some((input) => {
      return !input.validity.valid
    });
  };

  disableSubmitButton() {
    this._button.classList.add(this._inactiveButtonClass)
    this._button.disabled = true
  };

  _enableSubmitButton() {
    this._button.classList.remove(this._inactiveButtonClass)
    this._button.disabled = false;
  };

  //функция для кнопки сохранения
  _toggleButtonState = () => {
    if(this._hasInvalidInput()) {
      this.disableSubmitButton()
    } else {
      this._enableSubmitButton()
    };
  };

  //добавляем слушателя
  _setEventListeners = () => {
    this._toggleButtonState();

    this._inputElement.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._setEventListeners()
  };
};
