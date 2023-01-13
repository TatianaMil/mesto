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
profileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileInfo.textContent;
  openPopup(popupProfile)
});

//открытие попапа для ссылки и названия
buttonOpeneFormCard.addEventListener('click', () => {
  openPopup(popupAddCard)
});

//функция открытия большой картинки
const openBigImg = (img, title) => {
  popupImage.src = img;
  popupImage.alt = title;
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
  // popupProfile.classList.remove('popup_opened');
  closePopup(popupProfile);
};

popupFormProfile.addEventListener('submit', handleFormSubmitProfile);

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

//добавление и удаление лайка
const handleLikeClick = (evt) => {
  evt.target.classList.toggle('gallery__heart_active');
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
const handleCardSubmit = (evt) => {
  evt.preventDefault();
  renderCard(popupImageName.value, popupImageLink.value);
  closePopup(popupAddCard);
  popupFormPlacePluse.reset();
}

popupFormPlacePluse.addEventListener('submit', handleCardSubmit);
