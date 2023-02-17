import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import './index.css';
import {
  initialCards,
  validationConfig
} from '../utils/constants.js'
import {Section} from '../components/Section.js'

const profileButton = document.querySelector('.profile__button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupButtonCloseProfile = document.querySelector('.popup__button-close_profile');
const popupFormProfile = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__input_form-name');
const aboutInput = document.querySelector('.popup__input_form-about');
const profileTitle = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__info');

//5sprint объявили переменные для добавления в кнопку плюс
const buttonOpeneFormCard = document.querySelector('.profile__button-plus');
const popupImageName = document.querySelector('.popup__input_img-name');
const popupImageLink = document.querySelector('.popup__input_img-link');
const popupImage = document.querySelector('.popup__img');
const popupTitleImage = document.querySelector('.popup__title-img');
const popupCardImage = document.querySelector('.popup_type_img');
const popupAddCard = document.querySelector('.popup_type_card-add');
const popupButtonCloseAddCard = document.querySelector('.popup__button-close_add-card');
const popupFormPlacePluse = document.querySelector('.popup__form_card-add');
const popupButtonClosePlaceImg = document.querySelector('.popup__button-close_big-img');
const galleryContainer = document.querySelector('.gallery');

//закрытие формы по esc
function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
};

//общая функция для открытия всех попапов
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
};

//общая ф-я закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
};

//открытие попапа для имени и about
const openPopupAbout = () => {
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileInfo.textContent;
  formValidatorProfile.resetValidation()
  openPopup(popupProfile)
}
profileButton.addEventListener('click', openPopupAbout);

//открытие попапа для ссылки и названия
buttonOpeneFormCard.addEventListener('click', () => {
  openPopup(popupAddCard)
});

//функция открытия большой картинки
const openBigPopup = (title, link) => {
  popupImage.alt = title;
  popupImage.src = link;
  popupTitleImage.textContent = title;
  openPopup(popupCardImage)
};

//закрытие попапа при клике на крестик для имени и о себе
popupButtonCloseProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});

//закрытия попапа добавления карточки
popupButtonCloseAddCard.addEventListener('click', () => {
  closePopup(popupAddCard);
});

//закрытие попапа большой картинки
popupButtonClosePlaceImg.addEventListener('click', () => {
  closePopup(popupCardImage);
});

//закрытие формы по нажатию на фон
const popups = Array.from(document.querySelectorAll('.popup'));

popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target)
    closePopup(popup);
  });
});

//обработчик отправки формы
const handleFormSubmitProfile = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileInfo.textContent = aboutInput.value;
  closePopup(popupProfile);
};

popupFormProfile.addEventListener('submit', handleFormSubmitProfile);

//создание карточки
const createCard = (element) => {
  const card = new Card(element, '#template-new-img', openBigPopup)
return card.getView()
};

//подключаем класс section, отрисовка всех элементов
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    },
  },
  galleryContainer
);
cardSection.renderItems();

//добавление карточки
const renderCard = (element) => {
  galleryContainer.prepend(createCard(element))
};

// вставляем карточки из массива
// initialCards.forEach ((element) => {
//   renderCard(element);
// });



//добавление своей карточки в галерею
const handleCardSubmit = (evt) => {
  evt.preventDefault();
  renderCard({name: popupImageName.value, link: popupImageLink.value});
  closePopup(popupAddCard);
  popupFormPlacePluse.reset();
  formValidatorAddImage.disableSubmitButton()
};

popupFormPlacePluse.addEventListener('submit', handleCardSubmit);

const formValidatorProfile = new FormValidator(validationConfig, popupProfile); //для вызова валидации профиля
const formValidatorAddImage = new FormValidator(validationConfig, popupAddCard); //для вызова валидации картинки

// вызываем валидацию попапа профиля
formValidatorProfile.enableValidation();
//вызываем валидацию попапа добавления картинки
formValidatorAddImage.enableValidation();
