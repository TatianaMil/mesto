import { Popup } from '../components/Popup.js'

//попап подтверждения удаления карточек
export class PopupWithConfirmation extends Popup {
  constructor(popup, handleSubmit) {
    super(popup);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners()  // <=== вот это запускает родительские обработчики
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._card);
    });
  }
};
