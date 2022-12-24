// .profile__button = profileButton
// .popup
// .popup__button-close

const profileButton = document.querySelector('.profile__button');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__button-close');

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_form_name');
let aboutInput = document.querySelector('.popup__input_form_about');
let profileTitle = document.querySelector('.profile__title');
let profileInfo = document.querySelector('.profile__info');
let submitButton = document.querySelector('.popup__button-submit');

//открытие попапа по крестику
profileButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileInfo.textContent;
});
//закрытие попапа при клике на крестик (для всех попапов)
popupClose.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

//обработчик отправки формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileInfo.textContent = aboutInput.value;
  popup.classList.remove('popup_opened');
};

formElement.addEventListener('submit', handleFormSubmit);

//5 спринт

//5sprint объявили переменные для добавления в кнопку плюс
const buttonPlus = document.querySelector('.profile__button-plus');
const popupImgName = document.querySelector('.popup__input_form_img-name');
const popupImgLink = document.querySelector('.popup__input_form_img-link');
const popupImg = document.querySelector('.popup__img');
const popupTitleImg = document.querySelector('.popup__title-img');
const popupCardImg = document.querySelector('.popup_type_img');
const popupPlasePluse = document.querySelector('.popup_plase_pluse');
const popupBtnClosePlasePluse = document.querySelector('.popup__button-close_plase_pluse');
const popupBtnSubmitPlasePluse  = document.querySelector('.popup__button-submit_plase_pluse');
const galleryTitle = document.querySelector('.gallery__title');
const galleryImg = document.querySelector('.gallery__imggallery__img');



const popupFormPlasePluse = document.querySelector('.popup__form_plase_pluse');

const initialCards = [
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

//открытие и закрытие попапа по нажатию на плюс
buttonPlus.addEventListener('click', () => {
  popupPlasePluse.classList.add('popup_opened');
});
popupBtnClosePlasePluse.addEventListener('click', () => {
  popupPlasePluse.classList.remove('popup_opened');
});
// создание новой карточки
const galleryContainer = document.querySelector('.gallery');
const template = document.querySelector('#template-new-img');

const createNewCard = (name, link) => {
  console.log(name, link);
  const newCard = template.content.querySelector('.gallery__item').cloneNode(true);
  newCard.querySelector('.gallery__title').textContent = name;
  newCard.querySelector('.gallery__img').src = link;
  newCard.querySelector('.gallery__img').alt = name;


  return newCard;

};

//добавление карточки
const renderCart = (name, link) => {
  galleryContainer.prepend(createNewCard(name, link));
};

// вставляем карточки из массива
initialCards.forEach ((element) => {
  renderCart(element.name, element.link);
});

const addCartSubmit = (evt) => {
  evt.prevenrDefault();
  // galleryTitle.textContent = popupTitleImg.value;
  // galleryImg.classList.src = popupImg.value;
  renderCart(popupTitleImg.value, popupImg.value);
  popupPlasePluse.classList.remove('.popup__form_plase_pluse');
}

popupBtnSubmitPlasePluse.addEventListener('submit', addCartSubmit);









//добавление своих картинок
//лайки
//открытие и закрытие плюса
//открытие большой картинки по клику на изображение
//удалениепо нажатию на урну
