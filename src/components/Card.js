export class Card {
  _data;
  _templateSelector;
  _handlerLikeCart;
  _handlerDeleteCard;
  _handlerOpenImageViewer
  _isLikedByMe;
  _countOfLikes;
  _card;
  _image;
  _description;
  _likeBtn;
  _deleteBtn;
  _isOwner;
  _cardId;

  constructor({data, handlerLikeCart, handlerDeleteCard, handlerOpenImageViewer}, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handlerLikeCart = handlerLikeCart;
    this._handlerDeleteCard = handlerDeleteCard;
    this._handlerOpenImageViewer = handlerOpenImageViewer;
  }

  _getTemplate() {
    const element = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".card")
      .cloneNode(true);

    return element;
  }

  _toggleLike(cardData) {
    if (!this._isLikedByMe) {
      this._likeBtn.classList.add("card__like-btn_active");
      this._countOfLikes.textContent = cardData.likes.length;
      this._isLikedByMe = true;
    } else {
      this._likeBtn.classList.remove("card__like-btn_active");
      this._countOfLikes.textContent = cardData.likes.length;
      this._isLikedByMe = false;
    }
  }

  _deleteCard() {
    this._card.remove();
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      this._handlerLikeCart();
    });

    this._image.addEventListener("click", evt => {
      _handlerOpenImageViewer(this._image.src, this._description.textContent);
    });

    this._deleteBtn.addEventListener("click", () => {
      this._handlerDeleteCard(this._cardId, this._card);
    });
  }

  createCard(userId) {
    this._card = this._getTemplate();
    this._image = this._card.querySelector(".card__image");
    this._description = this._card.querySelector(".card__description");
    this._likeBtn = this._card.querySelector(".card__like-btn");
    this._countOfLikes = this._card.querySelector(".card__like-counter");
    this._deleteBtn = this._card.querySelector(".card__delete-btn");
    this._isLikedByMe = this._data.likes.some(like => {
      return like._id === userId;
    });
    this._isOwner = this._data.owner._id === userId;

    this._cardId = this._data._id;
    this._image.src = this._data.link;
    this._image.alt = this._data.name;
    this._description.textContent = this._data.name;
    this._countOfLikes.textContent = this._data.likes.length;

    if (!this._isOwner) {
      this._deleteBtn.remove();
    }

    if (this._isLikedByMe) {
      this._likeBtn.classList.add("card__like-btn_active");
    }

    this._setEventListeners();
    return this._card;
  }
}
