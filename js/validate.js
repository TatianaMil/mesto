//popup__button-submit_invalid - неактивная кнопка, если валидация не пройдена
//popup__input-error_visible - класс ошибки видимый
//popup__input_type_error - подчеркивание красным при ошибки

//описание формы валидации, объекты, классы для удобства переиспользования в дальнейшем
const validationConfig = {
  formSelector: '.popup__form', //форма
  inputSelector: '.popup__input', //инпут
  submitButtonSelector: '.popup__button-submit', //кнопка
  inactiveButtonClass: 'popup__button-submit_invalid', //неактивная кнопка
  inputErrorClass: 'popup__input_type_error', //подчеркивание красным при ошибке
  errorClass: 'popup__input-error_visible' //показать ошибку при неверно заполненом поле
};

enableValidation(validationConfig);

//описание ф-и showInputError
function showInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //нашли элемент ошибки

  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage; //получаем текст браузерной ошибки
  inputElement.classList.add(config.inputErrorClass);  //инпуту добавляем класс с ошибкой
};

//ф-я hideInputError удаляет текст с ошибкой, если все заполнено верно
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //нашли спен ошибки

  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';   //передаем пустую строку если ошибки нет
  inputElement.classList.remove(config.inputErrorClass);  //удаляем класс с ошибкой у инпута
};

//описываем ф-ю checkedInputValidityюпроверяем валидность:
function checkedInputValidity(formElement, inputElement, config) {
  //проверяем есть ли у полей инпутов ошибки
  if(inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config); //если true не показываем сообщение об ошибке
  } else {
    showInputError(formElement, inputElement,config); //если есть ошибка показываем сообщение
  }
};

//проходимся по всем инпутам и проверяем их валидность, вернет true, если есть ошибка у инпута
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid); //! превращает true в false
};

//если есть хотя бы 1 невалидный инпут, отключаем кнопку:
function toggleButtonState(inputList, buttonElement, config) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

//получаем все инпуты, описываем функцию setEventListeners:
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));  //находим список инпутов формы
  const buttonElement = formElement.querySelector(config.submitButtonSelector); //находим кнопку формы

  toggleButtonState(inputList, buttonElement, config);  //деактивация для первой загрузки

  formElement.addEventListener('reset', () => {
    // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement, config);
    }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
  });

  //проходимся по инпутам:
  inputList.forEach((inputElement) => {
    //для каждого инпута добавляем обработчик и проверяем валидность инпута
    inputElement.addEventListener('input', () => {
      checkedInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config); //получаем список инпутов чтобы проверить у каждого валидность
    })
  })
};

//получаем все формы и проходимся по ним, вызывая обработчик событий
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));  //получаем все формы
    //проходимся по формам:
    formList.forEach((formElement) => {
      setEventListeners(formElement, config) //передаем форму и конфиг
    })
};
