import { Popup } from './Popup';

//вставляем в попап картинку
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector); //селектор попапа
    this._popupImage = this._popup.querySelector('.popup__img') //находим форму
    this._popupImageTitle = this._popup.querySelector('.popup__title-img')
  };

//перезаписываем родительский метод
  open(title, link) {
    this._popupImageTitle.textContent = title; //вставляем название картинки
    this._popupImage.src = link; //вставляем ссылку на картинку
    this._popupImage.alt = title; // вставляем текст, если картинка не загрузилась
    super.open();
  };
};
