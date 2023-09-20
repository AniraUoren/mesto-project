import {Popup} from "./Popup";

export class PopupWithImage extends Popup{
  _imageElement;
  _descriptionElement;
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(src, description) {
    this._imageElement = this._popupElement.querySelector(".popup__image");
    this._descriptionElement = this._popupElement.querySelector(".popup__image-description");

    this._imageElement.src = src;
    this._imageElement.alt = description;
    this._descriptionElement.textContent = description;

    this._popupElement.classList.add("popup_opened");

    this.setEventListeners();
  }
}
