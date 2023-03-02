import { Popup } from './Popup';

//вставляем в попап картинку
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector); //селектор попапа
    this._popupImage = this._popup.querySelector('.popup__img') //находим форму
    this._popupImageTitle = this._popup.querySelector('.popup__title-img')
  };

//перезаписываем родительский метод
  open(name, link) {
    this._popupImageTitle.textContent = name; //вставляем название картинки
    this._popupImage.src = link; //вставляем ссылку на картинку
    this._popupImage.alt = name; // вставляем текст, если картинка не загрузилась
    super.open();
  };
};
