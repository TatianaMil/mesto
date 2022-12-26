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

//5sprint объявили переменные для добавления в кнопку плюс
const buttonPlus = document.querySelector('.profile__button-plus');
const popupImgName = document.querySelector('.popup__input_form_img-name');
const popupImgLink = document.querySelector('.popup__input_form_img-link');
const popupImg = document.querySelector('.popup__img');
const popupTitleImg = document.querySelector('.popup__title-img');
const popupCardImg = document.querySelector('.popup_type_img');
const popupPlacePluse = document.querySelector('.popup_place_pluse');
const popupBtnClosePlacePluse = document.querySelector('.popup__button-close_place_pluse');
const popupBtnSubmitPlacePluse  = document.querySelector('.popup__button-submit_place_pluse');
const galleryTitle = document.querySelector('.gallery__title');

const popupFormPlacePluse = document.querySelector('.popup__form_place_pluse');

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
  popupPlacePluse.classList.add('popup_opened');
});
popupBtnClosePlacePluse.addEventListener('click', () => {
  popupPlacePluse.classList.remove('popup_opened');
});

//добавление и удаление лайка
const handleLikeClick = (evt) => {
  evt.target.classList.toggle('gallery__heart_active');
};

// //открытие большой картинки по клику на изображение
// const openBigImg = galleryImg.addEventListener('click', () => {
//   popupCardImg.classList.add('popup_opened');
//   popupImg.value = galleryImg.src;
//   // popupImg.value = galleryImg.alt;
//   popupTitleImg.value = galleryTitle.textContent;
// });
//большая картинка
const openBigImg = (img, title) => {
    popupCardImg.classList.add('popup_opened');
    popupImg.src = img;
    popupImg.alt = title;
    popupTitleImg.textContent = title;
};

// создание новой карточки
const galleryContainer = document.querySelector('.gallery');
const template = document.querySelector('#template-new-img');
//для открытия картинки

const createNewCard = (name, link) => {
  const newCard = template.content.querySelector('.gallery__item').cloneNode(true);
  const galleryImg = document.querySelector('.gallery__img');

  newCard.querySelector('.gallery__title').textContent = name;
  newCard.querySelector('.gallery__img').src = link;
  newCard.querySelector('.gallery__img').alt = name;

  //для добавления лайка
  newCard.querySelector('.gallery__heart').addEventListener('click', handleLikeClick);

  //для удаления карточки по нажатию на корзину
  const deleteCard = newCard.querySelector(".gallery__del")
  deleteCard.addEventListener("click", () => {
  newCard.remove();
  });

  //большая картинка
  newCard.querySelector('.gallery__img').addEventListener('click', () => {
    openBigImg(name, link);
  });

  return newCard;
};

//добавление карточки
const renderCard = (name, link) => {
  galleryContainer.prepend(createNewCard(name, link));
};

// вставляем карточки из массива
initialCards.forEach ((element) => {
  renderCard(element.name, element.link);
});

//добавление своей карточки в галерею
const addCardSubmit = (evt) => {
  evt.preventDefault();
  renderCard(popupImgName.value, popupImgLink.value);
  popupPlacePluse.classList.remove('.popup__form_place_pluse');
  popupPlacePluse.classList.remove('popup_opened');
  popupFormPlacePluse.reset();
}
popupFormPlacePluse.addEventListener('submit', addCardSubmit);
