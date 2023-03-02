import "./index.css";

//импорт констант
import {
  validationConfig,
  // galleryContainer,
  // aboutInput,
  // nameInput,
  profileButton,
  popupConfig,
  buttonOpeneFormCard,
  profileEditAvatarButton,
  // popupFormProfile,
  // popupFormPlacePluse,
  // popupFormAvatar,
  profileTitle,
  profileInfo,
  profileAvatar,
  formEditProfile,
  formAddProfile,
  formUpdateAvatar,
} from "../utils/constants.js";

//импорт классов
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import Api from "../utils/Api.js";

let userId; //variable for user

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "ea996ec4-3586-49ec-99cf-46c56e637a89",
    "Content-Type": "application/json",
  },
});

//the function of creating card elements
function createCard(data) {
  const card = new Card(
    data,
    "#template-new-img",
    openPopupImage,
    userId,
    async () => {
      try {
        const response = await api.addLike(data._id);
        card.like();
        card.likesCount(response);
      } catch (error) {
        return console.log(`Ошибка: ${error}`);
      }
    },
    async () => {
      try {
        const response = await api.removeLike(data._id);
        card.dislike();
        card.likesCount(response);
      } catch (error) {
        return console.log(`Ошибка: ${error}`);
      }
    },
    () => {
      popupConfirmation.open(card);
    }
  );
  return card.getView();
}

//open big img
function openPopupImage(name, link) {
  popupImage.open(name, link);
}

// form for changed profile
async function handleSubmitFormEditProfile(data) {
  try {
    const userProfile = await api.editProfileUserApi(data);
    user.setUserInfo(userProfile);
  } catch (error) {
    console.log(`Ошибка: ${error}`);
  }
}

// form for add new card
async function handleSubmitFormAddCard(data) {
  try {
    const newCard = await api.createNewCardApi(data);
    cardList.addItem(createCard(newCard));
  } catch (error) {
    console.log(`Ошибка: ${error}`);
  }
};

// form for changing avatar
async function handleSubmitFormUpdateAvatar(data) {
  try {
    const userProfile = await api.updateProfileUserAvatar(data);
    user.setUserInfo(userProfile);
  } catch (error) {
    console.log(`Ошибка: ${error}`);
  }
};

//create an instance ot the class popupwithform for each popup
const popupImage = new PopupWithImage(popupConfig.popupImageSelector);
const popupAdd = new PopupWithForm(popupConfig.popupAddCardSelector, handleSubmitFormAddCard);
const popupEdit = new PopupWithForm(popupConfig.popupEditSelector, handleSubmitFormEditProfile);
const popupAvatar = new PopupWithForm(popupConfig.popupUpdateAvatarSelector, handleSubmitFormUpdateAvatar);
const user = new UserInfo({
  name: profileTitle,
  about: profileInfo,
  avatar: profileAvatar,
});

profileButton.addEventListener(
  "click",
  () => {
    popupEdit.open();
    popupEdit.setInputValue(user.getUserInfo());
    formEditValidator.disableSubmitButton();
  },
  false
);

profileEditAvatarButton.addEventListener(
  "click",
  () => {
    popupAvatar.open();
    formAvatarValidator.disableSubmitButton();
  },
  false
);

buttonOpeneFormCard.addEventListener(
  "click",
  () => {
    popupAdd.open();
    formCardValidator.disableSubmitButton();
  },
  false
);

const formEditValidator = new FormValidator(validationConfig, formEditProfile); //для вызова валидации профиля
const formCardValidator = new FormValidator(validationConfig, formAddProfile); //для вызова валидации картинки

const formAvatarValidator = new FormValidator(
  validationConfig,
  formUpdateAvatar
);

formEditValidator.enableValidation(); // вызываем валидацию попапа профиля
formCardValidator.enableValidation(); //вызываем валидацию попапа добавления картинки
formAvatarValidator.enableValidation();

const popupConfirmation = new PopupWithConfirmation(
  popupConfig.popupDeleteSelector,
  async (card) => {
    api
      .removeCard(card._id)
      .then(() => {
        card.remove();
        popupConfirmation.close();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }
);

// Загрузка карточек с сервера
const cardList = new Section(
  {
    renderer: (data) => {
      const card = createCard(data);

      cardList.addItem(card);
    },
  },
  ".gallery"
);

// Отрисовка карточек с сервера + отрисовка данных пользователя
Promise.all([api.getRealUserInfo(), api.getInitialCards()])
  .then(([userProfile, cards]) => {
    user.setUserInfo(userProfile);
    userId = userProfile._id;
    cardList.renderItems(cards);
  })

  .catch((error) => console.log(`Ошибка: ${error}`));
