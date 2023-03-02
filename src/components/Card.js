export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    userId,
    like,
    likeDelete,
    deleteCard
  ) {
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId; //my id
    this._like = like;
    this._likeDelete = likeDelete;
    this._deleteCard = deleteCard;
    this._likes = data.likes;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id; //card id
    this._ownerId = data.owner._id; ////id of the card creator
  };

  //add like
  like() {
    this._likeButton.classList.add('gallery__like_active');
  };

  //delete like
  likeDelete() {
    this._likeButton.classList.remove('gallery__like_active');
  };

  //like's counter
  likesCount(res) {
    this._likesCount.textContent = `${res.likes.length}`;
  };

  remove() {
    this._cardElement.remove();
  };

  _userLiked() {
    this._likes.forEach((element) => {
      if (element._id === this._userId) {
        this.like();
      } else {
        this.likeDelete();
      }
    });
  };

  _setEventListeners() {
    this._deleteButtonTrash.addEventListener("click", () => {
      this._deleteCard(this._id);
    });
    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("gallery__like_active")) {
        this._likeDelete();
      } else {
        this._like();
      }
    });
    //big image
    this._imageElementMask.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  };

  getView = () => {
    //getting a card
    const template = document.querySelector(this._templateSelector);
    if (template) {
      const element = template.content.querySelector(".gallery__item");
      if (element) {
        this._cardElement = element.cloneNode(true);
      } else console.log("В классе Card не найден .gallery__item!");
    } else
      console.log("В классе Card не найден " + this._templateSelector + "!");

    this._likeButton = this._cardElement.querySelector(".gallery__like");

    // //counting likes
    this._likesCount = this._cardElement.querySelector(".gallery__count-like");
    this._likesCount.textContent = this._likes.length;
    this._deleteButtonTrash = this._cardElement.querySelector(".gallery__del");
    if (this._ownerId !== this._userId) {
      this._deleteButtonTrash.remove();
    }

    this._imageElementMask = this._cardElement.querySelector(".gallery__img");
    this._imageElementMask.src = this._link;
    this._imageElementMask.alt = this._name;
    this._cardElement.querySelector(".gallery__title").textContent = this._name;

    this._setEventListeners();
    this._userLiked();

    return this._cardElement;
  };


};
