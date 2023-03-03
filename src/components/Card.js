export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    userId,
    like,
    dislike,
    deleteCard
  ) {
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._id = data._id; //card id
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id; //id of the card creator
    this._userId = userId; //me id
    this._like = like;
    this._dislike = dislike;
    this._deleteCard = deleteCard;

  }

  //add like
  like() {
    this._likeButton.classList.add('gallery__like_active');
  }
//delete like
  dislike() {
    this._likeButton.classList.remove('gallery__like_active');
  }

  //counter likes
  setLikesCount(res) {
    this._setLikesCount.textContent = `${res.likes.length}`;
  }

  _checkLIikes() {
    this._likes.forEach((elementId) => {
      if (elementId._id === this._userId) {
        this.like();
      } else {
        this.dislike();
      }
    });
  }

  remove() {
    this._cardElement.remove();
  }

  //обработчики
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('gallery__like_active')) {
        this._dislike();
      } else {
        this._like();
      }
    });
    this._deleteButtonTrash.addEventListener('click', () => {
      this._deleteCard(this._id);
    });
    this._imageElementMask.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  getView = () => {
    const template = document.querySelector(this._templateSelector);
    if (template) {
      const element = template.content.querySelector('.gallery__item');
      if (element) {
        this._cardElement = element.cloneNode(true);
      } else console.log('В классе Card не найден .gallery__item!');
    } else
      console.log('В классе Card не найден ' + this._templateSelector + '!');

    this._likeButton = this._cardElement.querySelector('.gallery__like');

    // counter likes
    this._setLikesCount = this._cardElement.querySelector('.gallery__count-like');
    this._setLikesCount.textContent = this._likes.length;
    this._deleteButtonTrash = this._cardElement.querySelector('.gallery__del');
    if (this._ownerId !== this._userId) {
      this._deleteButtonTrash.remove();
    }

    this._imageElementMask = this._cardElement.querySelector('.gallery__img');
    this._imageElementMask.src = this._link;
    this._imageElementMask.alt = this._name;
    this._cardElement.querySelector('.gallery__title').textContent = this._name;

    this._setEventListeners();
    this._checkLIikes();

    return this._cardElement;
  };
}
