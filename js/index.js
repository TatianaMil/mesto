// .profile__button = profileButton
// .popup
// .popup__button-close

const profileButton = document.querySelector('.profile__button');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__button-close');

profileButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileInfo.textContent;
});

popupClose.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

//находим форму в дом
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_form_name');
let aboutInput = document.querySelector('.popup__input_form_about');
let profileTitle = document.querySelector('.profile__title');
let profileInfo = document.querySelector('.profile__info');
let submitButton = document.querySelector('.popup__button-submit');

//обработчик отправки формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileInfo.textContent = aboutInput.value;
  popup.classList.remove('popup_opened');
};

formElement.addEventListener('submit', handleFormSubmit);
