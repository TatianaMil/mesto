const profileButton = document.querySelector('.profile__button');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_form-name');
let aboutInput = document.querySelector('.popup__input_form-about');
let profileTitle = document.querySelector('.profile__title');
let profileInfo = document.querySelector('.profile__info');

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


//открытие попапа для имени и about
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
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileInfo.textContent = aboutInput.value;
  popup.classList.remove('popup_opened');
};

formElement.addEventListener('submit', handleFormSubmit);

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
buttonOpeneFormCard.addEventListener('click', () => {
  popupAddCard.classList.add('popup_opened');
});

popupButtonCloseAddCard.addEventListener('click', () => {
  popupAddCard.classList.remove('popup_opened');
});

//закрытие попапа большой картинки
popupButtonClosePlaceImg.addEventListener('click', () => {
  popupCardImage.classList.remove('popup_opened');
});

//добавление и удаление лайка
const handleLikeClick = (evt) => {
  evt.target.classList.toggle('gallery__heart_active');
};

//функция открытия большой картинки
const openBigImg = (img, title) => {
  popupCardImage.classList.add('popup_opened');
  popupImage.src = img;
  popupImage.alt = title;
  popupTitleImage.textContent = title;
};

// создание новой карточки
const galleryContainer = document.querySelector('.gallery');
const template = document.querySelector('#template-new-img');

//для открытия картинки
const createNewCard = (name, link) => {
  const newCard = template.content.querySelector('.gallery__item').cloneNode(true);

  newCard.querySelector('.gallery__title').textContent = name;
  newCard.querySelector('.gallery__img').src = link;
  newCard.querySelector('.gallery__img').alt = name;

  //для добавления лайка
  newCard.querySelector('.gallery__heart').addEventListener('click', handleLikeClick);

  //для удаления карточки по нажатию на корзину
  const deleteCardButton = newCard.querySelector('.gallery__del');
  deleteCardButton.addEventListener('click', () => {
    newCard.remove();
  });

  //большая картинка
  newCard.querySelector('.gallery__img').addEventListener('click', () => {
    openBigImg(link, name);
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
  renderCard(popupImageName.value, popupImageLink.value);
  popupAddCard.classList.remove('popup__form_card-add');
  popupAddCard.classList.remove('popup_opened');
  popupFormPlacePluse.reset();
}

popupFormPlacePluse.addEventListener('submit', addCardSubmit);



