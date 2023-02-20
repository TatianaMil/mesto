export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validationConfig = {
  formSelector: '.popup__form', //форма
  inputSelector: '.popup__input', //инпут
  submitButtonSelector: '.popup__button-submit', //кнопка
  inactiveButtonClass: 'popup__button-submit_invalid', //неактивная кнопка
  inputErrorClass: 'popup__input_type_error', //подчеркивание красным при ошибке
  errorClass: 'popup__input-error_visible' //показать ошибку при неверно заполненом поле
};

export const popupConfig = {
  popupEditSelector: ".popup_type_profile",
  popupAddCardSelector: ".popup_type_card-add",
  popupImageSelector: ".popup_type_img"
};

export const galleryContainer = document.querySelector('.gallery');

export const profileButton = document.querySelector('.profile__button');
export const profileTitle = document.querySelector('.profile__title');
export const profileInfo = document.querySelector('.profile__info');
export const buttonOpeneFormCard = document.querySelector('.profile__button-plus');

export const popupTypeProfile = document.querySelector('.popup_type_profile');
export const popupCardImage = document.querySelector('.popup_type_img');
export const popupAddCard = document.querySelector('.popup_type_card-add');

export const popupImage = document.querySelector('.popup__img');
export const popupTitleImage = document.querySelector('.popup__title-img');

export const popupFormProfile = document.querySelector('.popup__form_profile');
export const popupFormPlacePluse = document.querySelector('.popup__form_card-add');

export const nameInput = document.querySelector('.popup__input_form-name');
export const aboutInput = document.querySelector('.popup__input_form-about');
export const popupImageName = document.querySelector('.popup__input_img-name');
export const popupImageLink = document.querySelector('.popup__input_img-link');

export const popupButtonCloseProfile = document.querySelector('.popup__button-close_profile');
export const popupButtonCloseAddCard = document.querySelector('.popup__button-close_add-card');
export const popupButtonClosePlaceImg = document.querySelector('.popup__button-close_big-img');
