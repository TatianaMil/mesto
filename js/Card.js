class Card {
  constructor(data, templateSelector, openBigImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openBigImage = openBigImage;
  }

//объявили метод, получения карточки
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.gallery__item')
    .cloneNode(true);

    return cardElement;
  }

  // передаем данные карточки
  _setData() {
    this._newCard.querySelector('.gallery__title').textContent = this._name;
    this._newCard.querySelector('.gallery__img').src = this._link;
    this._newCard.querySelector('.gallery__img').alt = this._name;
  }

  //удаляем карточку
  _deleteCardButton() {
    this._newCard.remove();
    this._newCard = null;
  }

  //ставим лайк
  _handleLikeClick(evt) {
    evt.target.classList.toggle('gallery__heart_active');
  }

  _setEventListeners() {
    // вешаем обработчик на кнопку корзины
    const deleteCardButton = this._newCard.querySelector('.gallery__del');
    deleteCardButton.addEventListener('click', () => {
      this._deleteCardButton();
    });

    //вешаем обработчик на лайк
    const likeButton = this._newCard.querySelector('.gallery__heart')
    likeButton.addEventListener('click', (evt) => {
      this._handleLikeClick(evt);
    });

    //большая картинка
    this._cardImage.addEventListener('click', () => {
      this._openBigImage(this._name, this._link)
    });
  };

  getView() { //описываем метод
    this._newCard = this._getTemplate();  //получаем из шаблона карточку , используем метод getTemplate

    //like
    this._likeButton = this._newCard.querySelector('.gallery__heart');

         //big img
    this._cardImage = this._newCard.querySelector('.gallery__img');

    this._deleteButton = this._newCard.querySelector('.gallery__del');

    this._setData(); //объявляем заголовок
    this._setEventListeners(); //обработчики событий




     return this._newCard;
  }
}
export default Card;
