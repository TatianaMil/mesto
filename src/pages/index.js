import './index.css';

//импорт констант
import {
  initialCards,
  validationConfig,
  galleryContainer,
  aboutInput,
  nameInput,
  profileButton,
  popupConfig,
  buttonOpeneFormCard,
  popupFormProfile,
  popupFormPlacePluse,
} from '../utils/constants.js';

//импорт классов
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

//создание карточки
function createCard(element) {
  const card = new Card(element, '#template-new-img', (name, link) => {
    openBigCard.open(name, link)
  });
  return card.getView();
};

//редактирование полей профиля
function formValues(value) {
  userInfo.setUserInfo(value.name, value.about);
  classEditPopup.close();
};

//открытие попапа профиля
function openEditProfile() {
  const {title, info} = userInfo.getUserInfo();
  nameInput.value = title;
  aboutInput.value = info;
  formEditValidator.disableSubmitButton();
  classEditPopup.open();
};

//открытие попапа добавления карточки
function openAddCardProfile() {
  formCardValidator.disableSubmitButton();
  classAddCardPopup.open();
};

//подключаем класс section, отрисовка элементов на странице
const cardSection = new Section({
  items: initialCards,
  renderer: (element) => {
    cardSection.addItem(createCard(element));
  },
}, galleryContainer);
cardSection.renderItems(initialCards.reverse());

// отображение информации о пользователе на странице
const userInfo = new UserInfo({
  titleElement: '.profile__title',
  infoElement: '.profile__info'
});

//класс редактирования профиля
const classEditPopup = new PopupWithForm(
  popupConfig.popupEditSelector,
  formValues);
classEditPopup.setEventListeners();

//класс редактирования добавления картинок
const classAddCardPopup = new PopupWithForm(
  popupConfig.popupAddCardSelector, (element) => {
      cardSection.addItem(createCard(element))
      classAddCardPopup.close()
  });
classAddCardPopup.setEventListeners();

const formEditValidator = new FormValidator(validationConfig, popupFormProfile); //для вызова валидации профиля
const formCardValidator = new FormValidator(validationConfig, popupFormPlacePluse); //для вызова валидации картинки
const openBigCard = new PopupWithImage(popupConfig.popupImageSelector); //подключаем класс PopupWithImage

formEditValidator.enableValidation(); // вызываем валидацию попапа профиля
formCardValidator.enableValidation(); //вызываем валидацию попапа добавления картинки
openBigCard.setEventListeners(); //вызываем открытие картинки

//кнопки для открытия попапов
profileButton.addEventListener('click', () => openEditProfile());
buttonOpeneFormCard.addEventListener('click', () => openAddCardProfile());
